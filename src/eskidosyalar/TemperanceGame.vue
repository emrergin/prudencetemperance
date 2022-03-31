<template>
  <div class="oyunKutusu" v-if="!oyunSonu">
    <ScoreTable
      :totalRevenue="totalRevenue"
      :totalLoss="totalLoss"
      :totalRounds="totalRounds"
      :currentRound="currentRound"
    />
    <div id="oyunAsagi">
      <img
        id="futbolTopu"
        ref="futbolTopu"
        src="../assets/soccer_ball.svg"
        oncontextmenu="return false"
        @click="hareket()"
      />
      <div id="buyukEtiketler">
        <div id="solBuyukEtiket" class="buyukEtiket etiket">
          {{ convertNumbertoString(payOffs[currentRound][0]) }}
        </div>
        <div id="sagBuyukEtiket" class="buyukEtiket etiket">
          {{ convertNumbertoString(payOffs[currentRound][1]) }}
        </div>
      </div>
      <img id="buyukBoru" src="../assets/buyukboru.svg" />
      <div class="buyukInputlar">
        <div class="droppable2" id="i0" :class="{ gorulmez: secimler[0] }">
          A
        </div>
        <div class="droppable2" id="i1" :class="{ gorulmez: secimler[1] }">
          B
        </div>
      </div>
      <div class="buyukInputlar">
        <div
          class="droppable2"
          id="i2"
          :class="{ gorulmez: !secimler[0] || secimler[2] }"
        >
          C
        </div>
        <div
          class="droppable2"
          id="i3"
          :class="{ gorulmez: !secimler[1] || secimler[3] }"
        >
          D
        </div>
      </div>
      <div id="kucukBorular" v-if="asama !== `roundsonu`">
        <div
          id="kucukBoru1"
          class="temperanceBoru"
          oncontextmenu="return false"
          @mousedown.left="boruTasi($event)"
          ondragstart="return false"
        >
          <div id="kucukEtiketler1">
            <div id="solKucukEtiket1" class="kucukEtiket etiket">
              {{ convertNumbertoString(payOffs[currentRound][2]) }}
            </div>
            <div id="sagKucukEtiket1" class="kucukEtiket etiket">
              {{ convertNumbertoString(payOffs[currentRound][3]) }}
            </div>
          </div>
          <img
            src="../assets/kucukboru2.svg"
            class="draggable"
            oncontextmenu="return false"
          />
        </div>
        <div
          id="kucukBoru2"
          class="temperanceBoru"
          oncontextmenu="return false"
          @mousedown.left="boruTasi($event)"
          ondragstart="return false"
        >
          <div id="kucukEtiketler2">
            <div id="solKucukEtiket2" class="kucukEtiket etiket">
              {{ convertNumbertoString(payOffs[currentRound][4]) }}
            </div>
            <div id="sagKucukEtiket2" class="kucukEtiket etiket">
              {{ convertNumbertoString(payOffs[currentRound][5]) }}
            </div>
          </div>
          <img
            src="../assets/kucukboru2.svg"
            class="draggable"
            oncontextmenu="return false"
          />
        </div>
      </div>
      <div v-if="asama === `roundsonu`">
        <button class="stepButton" id="nextRound" @click="siradakiTur()">
          {{
            this.currentRound === this.totalRounds - 1
              ? `Oyunu Bitir`
              : `Sıradaki Tur >>`
          }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="oyunSonu" class="oyunKutusu">
    <p>Oyunu tamamladınız. Toplam kazancınız: {{ totalRevenue - totalLoss }}</p>
    <button @click="$emit('end', true)" class="stepButton">
      Diğer Oyuna Geç!
    </button>
  </div>
  <div>
    <p>{{ secimler }}</p>
    <p>{{ zarlar }}</p>
  </div>
</template>

<script>
import ScoreTable from "./ScoreTable.vue";
import { store } from "../store.js";
export default {
  emits: ["end"],
  components: { ScoreTable },
  data() {
    return {
      payOffs: [
        [9, 9, 2, -2, 3, -3],
        [9, 9, 1, -1, 4, -4],
        [6, 6, 4, -4, 1, -1],
        [14, 14, 3, -3, 10, -10],
        [4, 4, 2, -2, 1, -1],
      ],
      totalRevenue: 0,
      totalLoss: 0,
      currentRound: 0,
      totalRounds: 5,
      currentDroppable: null,
      secimler: [null, null, null, null],
      asama: `baslangic`,
      oyunSonu: false,
      zarlar: [],
      store,
      baslangic: new Date(),
      bitis: null,
    };
  },
  methods: {
    convertNumbertoString(number) {
      return number > 0 ? `+` + number : `-` + Math.abs(number);
    },
    boruTasi(e) {
      if (this.asama !== `baslangic`) {
        return false;
      }
      var vm = this;
      let kucukBoru = e.target.closest(`.temperanceBoru`);
      let indeks = vm.secimler.findIndex((a) => a === kucukBoru.id.slice(9));
      if (indeks !== -1 && vm.secimler[indeks + 2]) {
        return false;
      }

      kucukBoru.style.cursor = "grabbing";
      vm.secimler[vm.secimler.findIndex((a) => a === kucukBoru.id.slice(9))] =
        null;

      let shiftX = e.clientX - kucukBoru.getBoundingClientRect().left;
      let shiftY = e.clientY - kucukBoru.getBoundingClientRect().top;

      if (!document.getElementById(`fakeBoru`)) {
        var fakeBoru = kucukBoru.cloneNode(true);
        fakeBoru.id = `fakeBoru`;
        fakeBoru.style.visibility = "hidden";
        kucukBoru.after(fakeBoru);
      } else {
        document.getElementById(`fakeBoru`).remove();
      }

      kucukBoru.style.position = "absolute";
      kucukBoru.style.zIndex = 3;
      document.getElementById(`app`).append(kucukBoru);

      moveAt(e.pageX, e.pageY);

      function moveAt(pageX, pageY) {
        kucukBoru.style.left = pageX - shiftX + "px";
        kucukBoru.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        kucukBoru.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        kucukBoru.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest(".droppable2");

        if (vm.currentDroppable != droppableBelow) {
          if (vm.currentDroppable) {
            leaveDroppable(vm.currentDroppable);
          }
          vm.currentDroppable = droppableBelow;
          if (vm.currentDroppable) {
            enterDroppable(vm.currentDroppable);
          }
        }
      }

      document.addEventListener("mousemove", onMouseMove);

      kucukBoru.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        kucukBoru.style.cursor = "grab";

        if (vm.currentDroppable) {
          var rect = vm.currentDroppable.getBoundingClientRect();
          vm.currentDroppable.style.background = "";
          kucukBoru.style.left = `${rect.left + window.scrollX}px`;
          kucukBoru.style.top = `${rect.top + window.scrollY}px`;
          vm.secimler[vm.currentDroppable.id.slice(1)] = kucukBoru.id.slice(9);
        }
        kucukBoru.onmouseup = null;
      };
      function enterDroppable(elem) {
        elem.style.background = "#F0FFF0";
      }
      function leaveDroppable(elem) {
        elem.style.background = "";
      }
    },
    hareket() {
      if (this.secimler.filter((a) => a).length !== 2) {
        return;
      }
      if (this.asama !== "baslangic") {
        return;
      }
      let vm = this;
      this.bitis = new Date();
      this.asama = `tophareketi`;
      let futbolTopu = this.$refs.futbolTopu;
      futbolTopu.style.zIndex = 4;
      let fakeBall = futbolTopu.cloneNode(true);
      fakeBall.id = `fakeBall`;
      fakeBall.style.visibility = "hidden";
      futbolTopu.after(fakeBall);
      futbolTopu.style.position = "absolute";

      Asagi();

      function Asagi() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,5px)` },
              { transform: `translate(0px,62px)` },
            ],
            {
              duration: 1000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        let zar = Math.floor(Math.random() * 2) + 1;
        zar === 1 ? setTimeout(Sol1, 1000) : setTimeout(Sag1, 1000);
        zar === 1 ? setTimeout(solBEtiket, 2100) : setTimeout(sagBEtiket, 2100);
        vm.zarlar.push(zar);
      }

      function Sol1() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(360deg)`, offset: 0 },
              { transform: `translate(-120px,0px) rotate(0deg)`, offset: 0.5 },
              {
                transform: `translate(-145px,12px) rotate(-75deg)`,
                offset: 0.625,
              },
              {
                transform: `translate(-152.5px,48px) rotate(-82.5deg)`,
                offset: 0.75,
              },
              {
                transform: `translate(-152.5px,93px) rotate(-82.5deg)`,
                offset: 1,
              },
            ],
            {
              duration: 3000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(animasyonDevamEt, 3000);
      }
      function Sag1() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              { transform: `translate(120px,0px) rotate(360deg)`, offset: 0.5 },
              {
                transform: `translate(145px,12px) rotate(432deg)`,
                offset: 0.625,
              },
              {
                transform: `translate(152.5px,48px) rotate(454.5deg)`,
                offset: 0.75,
              },
              {
                transform: `translate(152.5px,93px) rotate(454.5deg)`,
                offset: 1,
              },
            ],
            {
              duration: 3000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(animasyonDevamEt, 3000);
      }
      function Sol2() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              {
                transform: `translate(-40px,0px) rotate(-120deg)`,
                offset: 0.125,
              },
              {
                transform: `translate(-70px,15px) rotate(-210deg)`,
                offset: 0.25,
              },
              {
                transform: `translate(-75px,35px) rotate(-225deg)`,
                offset: 0.375,
              },
              {
                transform: `translate(-70px,63px) rotate(-210deg)`,
                offset: 0.5,
              },
              {
                transform: `translate(-40px,76px) rotate(-120deg)`,
                offset: 0.625,
              },
              { transform: `translate(0px,90px) rotate(0deg)`, offset: 0.75 },
              { transform: `translate(0px,166px) rotate(0deg)`, offset: 1 },
            ],
            {
              duration: 4000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(animasyonDevamEt, 4000);
      }
      function Sag2() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              {
                transform: `translate(40px,0px) rotate(120deg)`,
                offset: 0.125,
              },
              {
                transform: `translate(70px,15px) rotate(210deg)`,
                offset: 0.25,
              },
              {
                transform: `translate(75px,35px) rotate(225deg)`,
                offset: 0.375,
              },
              { transform: `translate(70px,63px) rotate(210deg)`, offset: 0.5 },
              {
                transform: `translate(40px,76px) rotate(120deg)`,
                offset: 0.625,
              },
              { transform: `translate(0px,90px) rotate(0deg)`, offset: 0.75 },
              { transform: `translate(0px,166px) rotate(0deg)`, offset: 1 },
            ],
            {
              duration: 4000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(animasyonDevamEt, 4000);
      }
      function animasyonDevamEt() {
        if (vm.hareketBittiMi()) {
          vm.asama = `roundsonu`;
          const collection = document.getElementsByClassName("yaklasilmis");
          for (let etiket of collection) {
            +etiket.textContent > 0
              ? (vm.totalRevenue += +etiket.textContent)
              : (vm.totalLoss += -etiket.textContent);
          }
        } else {
          let zar = Math.floor(Math.random() * 2) + 1;
          let ilgiliKucukBoru =
            vm.zarlar.length === 1
              ? vm.secimler[vm.zarlar[0] - 1]
              : 3 - +vm.secimler[vm.zarlar[0] - 1];
          zar === 1 ? Sol2() : Sag2();
          vm.zarlar.push(zar);
          setTimeout(() => {
            kucukEtiketler(ilgiliKucukBoru, zar);
          }, 700);
        }
      }
      function solBEtiket() {
        document.getElementById(`solBuyukEtiket`).classList.add(`yaklasilmis`);
      }
      function sagBEtiket() {
        document.getElementById(`sagBuyukEtiket`).classList.add(`yaklasilmis`);
      }
      function kucukEtiketler(id, yon) {
        let idtext = yon === 1 ? `solKucukEtiket` : `sagKucukEtiket`;
        idtext += id;
        document.getElementById(idtext).classList.add(`yaklasilmis`);
      }
    },
    hareketBittiMi() {
      let rect = this.$refs.futbolTopu.getBoundingClientRect();
      let elemBelow = document.elementFromPoint(
        (rect.left + rect.right) / 2,
        rect.top - 5
      );
      return !elemBelow.closest(`.temperanceBoru,#buyukBoru`);
    },
    siradakiTur() {
      store.veriler.push([
        `Temperance`,
        this.bitis - this.baslangic,
        this.payOffs[this.currentRound],
        this.secimler,
      ]);
      this.secimler = [null, null, null, null];
      this.zarlar = [];

      const kucukBorular = document.querySelectorAll(".temperanceBoru");
      kucukBorular.forEach((kucukBoru) => kucukBoru.remove());

      this.baslangic = new Date();
      this.asama = `baslangic`;

      if (this.currentRound >= this.totalRounds - 1) {
        this.oyunSonu = true;
        store.kazanc += this.totalRevenue - this.totalLoss;
        return;
      }

      this.$refs.futbolTopu.getAnimations().forEach((anim) => {
        anim.cancel();
      });
      const etiketler = document.querySelectorAll(".etiket");
      etiketler.forEach((etiket) => etiket.classList.remove(`yaklasilmis`));

      document.getElementById(`fakeBall`).remove();
      this.$refs.futbolTopu.style.position = "static";

      this.currentRound++;
    },
  },
};
</script>

<style>
.buyukInputlar {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 105px;
  min-height: 167.5px;
}

#kucukBorular {
  display: flex;
  justify-content: space-evenly;
  gap: 64px;
  min-height: 167.5px;
}

.temperanceBoru {
  height: 167.5px;
}

.droppable2 {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 197px;
  height: 167.5px;
  font-size: 3em;
  font-weight: bold;
  border: 2px dashed turquoise;
  align-items: center;
  justify-content: center;
  display: flex;
}

.gorulmez {
  visibility: hidden;
}
</style>

<style scoped>
.oyunKutusu {
  min-height: 700px;
}
</style>
