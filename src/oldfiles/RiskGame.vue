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
      <img id="girisBoru" src="../assets/kucukboru3.svg" />
      <div id="inputlar">
        <div
          class="droppable"
          id="i1"
          :style="{ visibility: !secim ? `visible` : `hidden` }"
        >
          A
        </div>
      </div>
      <div id="kucukBorular" v-if="asama !== `roundsonu`">
        <div
          id="kucukBoru1"
          class="riskBoru"
          oncontextmenu="return false"
          @mousedown.left="boruTasi($event)"
          ondragstart="return false"
          :style="{
            visibility:
              asama !== `baslangic` && secim !== `1` ? `hidden` : `visible`,
          }"
        >
          <div id="kucukEtiketler1">
            <div id="solKucukEtiket1" class="kucukEtiket etiket">
              {{ convertNumbertoString(payOffs[currentRound][0]) }}
            </div>
            <div id="sagKucukEtiket1" class="kucukEtiket etiket">
              {{ convertNumbertoString(payOffs[currentRound][1]) }}
            </div>
          </div>
          <img
            src="../assets/kucukboru.svg"
            class="draggable"
            oncontextmenu="return false"
          />
        </div>
        <div
          id="kucukBoru2"
          class="riskBoru"
          oncontextmenu="return false"
          @mousedown.left="boruTasi($event)"
          ondragstart="return false"
          :style="{
            visibility:
              asama !== `baslangic` && secim !== `2` ? `hidden` : `visible`,
          }"
        >
          <div id="kucukEtiketler2">
            <div id="solKucukEtiket2" class="kucukEtiket etiket">
              {{ convertNumbertoString(payOffs[currentRound][2]) }}
            </div>
            <div id="sagKucukEtiket2" class="kucukEtiket etiket">
              {{ convertNumbertoString(payOffs[currentRound][3]) }}
            </div>
          </div>
          <img
            src="../assets/kucukboru.svg"
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
      Sonuçları gör.
    </button>
  </div>
  <div>
    <p>{{ secim }}</p>
  </div>
</template>

<script>
import ScoreTable from "./ScoreTable.vue";
import { store } from "../store.js";
export default {
  components: { ScoreTable },
  emits: ["end"],
  data() {
    return {
      payOffs: [
        [10, 8, 15, 3],
        [5, 3, 7, 1],
        [9, 12, 10, 10],
        [2, 4, 1, 5],
        [7, 1, 4, 4],
      ],
      totalRevenue: 0,
      totalLoss: 0,
      currentRound: 0,
      totalRounds: 5,
      currentDroppable: null,
      asama: `baslangic`,
      oyunSonu: false,
      secim: null,
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
      let kucukBoru = e.target.closest(`.riskBoru`);

      var vm = this;

      kucukBoru.style.cursor = "grabbing";
      if (this.secim === kucukBoru.id.slice(9)) {
        this.secim = null;
      }

      let shiftX = e.clientX - kucukBoru.getBoundingClientRect().left;
      let shiftY = e.clientY - kucukBoru.getBoundingClientRect().top;

      if (!document.getElementById(`fakeBoru`)) {
        var fakeBoru = kucukBoru.cloneNode(true);
        fakeBoru.id = `fakeBoru`;
        fakeBoru.style.visibility = "hidden";
        kucukBoru.after(fakeBoru);
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

        let droppableBelow = elemBelow.closest(".droppable");

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
          vm.secim = kucukBoru.id.slice(9);
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
      if (!this.secim) {
        return;
      }
      if (this.asama !== `baslangic`) {
        return;
      }
      this.bitis = new Date();
      let vm = this;
      this.asama = `tophareketi`;
      let futbolTopu = this.$refs.futbolTopu;
      futbolTopu.style.zIndex = 4;
      let fakeBall = futbolTopu.cloneNode(true);
      fakeBall.id = `fakeBall`;
      fakeBall.style.visibility = "hidden";
      futbolTopu.after(fakeBall);
      futbolTopu.style.position = "absolute";

      document.getElementById(`fakeBoru`).remove();

      Asagi();

      function Asagi() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,5px)` },
              { transform: `translate(0px,156px)` },
            ],
            {
              duration: 2000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        let zar = Math.floor(Math.random() * 2) + 1;
        zar === 1 ? setTimeout(Sol, 2000) : setTimeout(Sag, 2000);
        let ilgiliEtiket = ``;
        ilgiliEtiket = zar === 1 ? `solKucukEtiket` : `sagKucukEtiket`;
        ilgiliEtiket += vm.secim;
        setTimeout(() => {
          kucukEtiketler(ilgiliEtiket);
        }, 2400);
      }

      function Sol() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              {
                transform: `translate(-40px,0px) rotate(-120deg)`,
                offset: 0.25,
              },
              {
                transform: `translate(-70px,15px) rotate(-210deg)`,
                offset: 0.5,
              },
              {
                transform: `translate(-75px,35px) rotate(-225deg)`,
                offset: 0.75,
              },
              { transform: `translate(-75px,70px) rotate(-225deg)`, offset: 1 },
            ],
            {
              duration: 2000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(hareketSonu, 2000);
      }
      function Sag() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              { transform: `translate(40px,0px) rotate(120deg)`, offset: 0.25 },
              { transform: `translate(70px,15px) rotate(210deg)`, offset: 0.5 },
              {
                transform: `translate(75px,35px) rotate(225deg)`,
                offset: 0.75,
              },
              { transform: `translate(75px,70px) rotate(225deg)`, offset: 1 },
            ],
            {
              duration: 2000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(hareketSonu, 2000);
      }

      function hareketSonu() {
        vm.asama = `roundsonu`;
        const collection = document.getElementsByClassName("yaklasilmis");
        for (let etiket of collection) {
          +etiket.textContent > 0
            ? (vm.totalRevenue += +etiket.textContent)
            : (vm.totalLoss += -etiket.textContent);
        }
      }

      function kucukEtiketler(idtext) {
        document.getElementById(idtext).classList.add(`yaklasilmis`);
      }
    },
    siradakiTur() {
      store.veriler.push([
        `Risk`,
        this.bitis - this.baslangic,
        this.payOffs[this.currentRound],
        this.secim,
      ]);
      this.secim = null;

      const kucukBorular = document.querySelectorAll(".riskBoru");
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

<style></style>

<style scoped>
#kucukBorular {
  align-items: center;
}
</style>
