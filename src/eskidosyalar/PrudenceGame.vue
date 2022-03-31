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
      <div id="inputlar">
        <div class="droppable" id="i1">A</div>
        <div class="droppable" id="i2">B</div>
      </div>
      <div
        id="kucukBoru"
        ref="kucukBoru"
        oncontextmenu="return false"
        @mousedown.left="boruTasi($event)"
        ondragstart="return false"
      >
        <div id="kucukEtiketler">
          <div id="solKucukEtiket" class="kucukEtiket etiket">
            {{ convertNumbertoString(payOffs[currentRound][2]) }}
          </div>
          <div id="sagKucukEtiket" class="kucukEtiket etiket">
            {{ convertNumbertoString(payOffs[currentRound][3]) }}
          </div>
        </div>
        <img
          src="../assets/kucukboru.svg"
          class="draggable"
          oncontextmenu="return false"
        />
      </div>
      <button
        class="stepButton"
        id="nextRound"
        v-if="asama === `roundsonu`"
        @click="siradakiTur()"
      >
        {{
          this.currentRound === this.totalRounds - 1
            ? `Oyunu Bitir`
            : `Sıradaki Tur >>`
        }}
      </button>
    </div>
  </div>
  <div v-if="oyunSonu" class="oyunKutusu">
    <p>Oyunu tamamladınız. Toplam kazancınız: {{ totalRevenue - totalLoss }}</p>
    <button @click="$emit('end', true)" class="stepButton">
      Diğer Oyuna Geç!
    </button>
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
        [9, 6, 2, -2],
        [9, 6, 1, -1],
        [9, 6, 4, -4],
        [14, 9, 3, -3],
        [7, 4, 2, -2],
      ],
      totalRevenue: 0,
      totalLoss: 0,
      currentRound: 0,
      totalRounds: 5,
      currentDroppable: null,
      asama: `baslangic`,
      oyunSonu: false,
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
      let kucukBoru = this.$refs.kucukBoru;
      var vm = this;
      kucukBoru.style.cursor = "grabbing";
      const collection = document.getElementsByClassName("droppable");
      for (let i = 0; i < collection.length; i++) {
        collection[i].style.visibility = "visible";
      }
      let shiftX = e.clientX - kucukBoru.getBoundingClientRect().left;
      let shiftY = e.clientY - kucukBoru.getBoundingClientRect().top;

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
          const collection = document.getElementsByClassName("droppable");
          for (let i = 0; i < collection.length; i++) {
            collection[i].style.visibility = "hidden";
          }
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
      let durum = 0;
      if (!this.currentDroppable) {
        return;
      }
      if (this.asama !== `baslangic`) {
        return;
      }
      this.bitis = new Date();
      this.asama = `tophareketi`;
      let futbolTopu = this.$refs.futbolTopu;
      futbolTopu.style.zIndex = 4;
      let fakeBall = futbolTopu.cloneNode(true);
      fakeBall.id = `fakeBall`;
      fakeBall.style.visibility = "hidden";

      let zar = Math.floor(Math.random() * 100) + 1;
      futbolTopu.after(fakeBall);
      futbolTopu.style.position = "absolute";
      if (this.currentDroppable.id.slice(1) === `2`) {
        if (zar > 75) {
          futbolTopu.classList.add(`asagiHareketli1P`);
          durum = 1;
          setTimeout(sagBEtiket, 2100);
          setTimeout(sagKEtiket, 3650);
        } else if (zar > 50) {
          futbolTopu.classList.add(`asagiHareketli2P`);
          durum = 2;
          setTimeout(sagBEtiket, 2100);
          setTimeout(solKEtiket, 3650);
        } else {
          futbolTopu.classList.add(`asagiHareketli6P`);
          durum = 6;
          setTimeout(solBEtiket, 2100);
        }
      }
      if (this.currentDroppable.id.slice(1) === `1`) {
        if (zar > 75) {
          futbolTopu.classList.add(`asagiHareketli4P`);
          durum = 4;
          setTimeout(solBEtiket, 2100);
          setTimeout(solKEtiket, 3650);
        } else if (zar > 50) {
          futbolTopu.classList.add(`asagiHareketli5P`);
          durum = 5;
          setTimeout(solBEtiket, 2100);
          setTimeout(sagKEtiket, 3650);
        } else {
          futbolTopu.classList.add(`asagiHareketli3P`);
          durum = 3;
          setTimeout(sagBEtiket, 2100);
        }
      }
      futbolTopu.onanimationend = () => {
        this.asama = `roundsonu`;
        this.kazancGuncelle(durum);
      };

      function solBEtiket() {
        document.getElementById(`solBuyukEtiket`).classList.add(`yaklasilmis`);
      }
      function sagBEtiket() {
        document.getElementById(`sagBuyukEtiket`).classList.add(`yaklasilmis`);
      }
      function solKEtiket() {
        document.getElementById(`solKucukEtiket`).classList.add(`yaklasilmis`);
      }
      function sagKEtiket() {
        document.getElementById(`sagKucukEtiket`).classList.add(`yaklasilmis`);
      }
    },
    kazancGuncelle(durum) {
      let Kazanclar = 0;
      let Kayiplar = 0;

      if (durum === 6 || durum === 4 || durum === 5) {
        if (this.payOffs[this.currentRound][0] > 0) {
          Kazanclar += this.payOffs[this.currentRound][0];
        } else {
          Kayiplar += Math.abs(this.payOffs[this.currentRound][0]);
        }
      } else {
        if (this.payOffs[this.currentRound][1] > 0) {
          Kazanclar += this.payOffs[this.currentRound][1];
        } else {
          Kayiplar += Math.abs(this.payOffs[this.currentRound][1]);
        }
      }

      if (durum === 4 || durum === 2) {
        if (this.payOffs[this.currentRound][2] > 0) {
          Kazanclar += this.payOffs[this.currentRound][2];
        } else {
          Kayiplar += Math.abs(this.payOffs[this.currentRound][2]);
        }
      } else if (durum === 1 || durum === 5) {
        if (this.payOffs[this.currentRound][3] > 0) {
          Kazanclar += this.payOffs[this.currentRound][3];
        } else {
          Kayiplar += Math.abs(this.payOffs[this.currentRound][3]);
        }
      }
      this.totalRevenue += Kazanclar;
      this.totalLoss += Kayiplar;
    },
    siradakiTur() {
      store.veriler.push([
        `Prudence`,
        this.bitis - this.baslangic,
        this.payOffs[this.currentRound],
        this.currentDroppable.id.slice(1),
      ]);
      const kucukBoru = document.getElementById(`kucukBoru`);
      kucukBoru.style.top = `initial`;
      kucukBoru.style.left = `initial`;
      kucukBoru.style.position = "relative";
      document.getElementById(`nextRound`).before(kucukBoru);

      if (this.currentRound >= this.totalRounds - 1) {
        this.oyunSonu = true;
        store.kazanc += this.totalRevenue - this.totalLoss;
        return;
      }

      this.$refs.futbolTopu.classList.remove(
        "asagiHareketli1P",
        "asagiHareketli2P",
        "asagiHareketli3P",
        "asagiHareketli4P",
        "asagiHareketli5P",
        "asagiHareketli6P"
      );
      const etiketler = document.querySelectorAll(".etiket");
      etiketler.forEach((etiket) => etiket.classList.remove(`yaklasilmis`));

      this.currentDroppable = null;

      document.getElementById(`fakeBall`).remove();
      this.$refs.futbolTopu.style.position = "static";

      const collection = document.getElementsByClassName("droppable");
      for (let i = 0; i < collection.length; i++) {
        collection[i].style.visibility = "visible";
      }

      this.baslangic = new Date();
      this.asama = `baslangic`;

      this.currentRound++;
    },
  },
};
</script>

<style>
.oyunKutusu {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  margin: 15px;
  min-height: 385px;
}
#oyunAsagi {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

#buyukEtiketler {
  position: absolute;
  display: flex;
  gap: 200px;
  top: 28px;
}

.buyukEtiket {
  border: 2px solid black;
  border-radius: 8px;
  padding: 2px;
}

#kucukBoru,
#kucukBoru1,
#kucukBoru2 {
  position: relative;
}
#kucukEtiketler,
#kucukEtiketler1,
#kucukEtiketler2 {
  position: absolute;
  left: 30px;
  gap: 85px;
  display: flex;
  justify-content: space-between;
}

.kucukEtiket {
  border: 2px solid black;
  border-radius: 8px;
  padding: 2px;
}

.yaklasilmis {
  background-color: green;
  color: #f8f8f8;
}

#inputlar {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 105px;
}

.draggable {
  cursor: grab;
}

.droppable {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 197px;
  text-align: center;
  font-size: 3em;
  font-weight: bold;
  border: 2px dashed turquoise;
}

#futbolTopu {
  cursor: pointer;
}

.stepButton {
  padding: 5px;
  font-size: 1.5em;
  margin: 50px auto 20px auto;
}

.asagiHareketli1P {
  position: absolute;
  animation: PtoDown1 5000ms linear 1;
  animation-fill-mode: forwards;
}

.asagiHareketli2P {
  position: absolute;
  animation: PtoDown2 5000ms linear 1;
  animation-fill-mode: forwards;
}

.asagiHareketli3P {
  position: absolute;
  animation: PtoDown3 4000ms linear 1;
  animation-fill-mode: forwards;
}

.asagiHareketli4P {
  position: absolute;
  animation: PtoDown4 5000ms linear 1;
  animation-fill-mode: forwards;
}

.asagiHareketli5P {
  position: absolute;
  animation: PtoDown5 5000ms linear 1;
  animation-fill-mode: forwards;
}

.asagiHareketli6P {
  position: absolute;
  animation: PtoDown6 4000ms linear 1;
  animation-fill-mode: forwards;
}
@keyframes PtoDown1 {
  0% {
    transform: translate(0px, 5px) rotate(0deg);
  }
  14% {
    transform: translate(0px, 62px) rotate(0deg);
  }
  42% {
    transform: translate(120px, 62px) rotate(360deg);
  }
  49% {
    transform: translate(145px, 78px) rotate(432deg);
  }
  56% {
    transform: translate(152.5px, 110px) rotate(454.5deg);
  }
  70% {
    transform: translate(152.5px, 155px) rotate(454.5deg);
  }
  84% {
    transform: translate(212.5px, 155px) rotate(634.5deg);
  }
  96% {
    transform: translate(230px, 200px) rotate(732deg);
  }
  100% {
    transform: translate(230px, 220px) rotate(732deg);
  }
}

@keyframes PtoDown2 {
  0% {
    transform: translate(0px, 5px) rotate(0deg);
  }
  14% {
    transform: translate(0px, 62px) rotate(0deg);
  }
  42% {
    transform: translate(120px, 62px) rotate(360deg);
  }
  49% {
    transform: translate(145px, 78px) rotate(432deg);
  }
  56% {
    transform: translate(152.5px, 110px) rotate(454.5deg);
  }
  70% {
    transform: translate(152.5px, 155px) rotate(454.5deg);
  }
  84% {
    transform: translate(92.5px, 155px) rotate(274.5deg);
  }
  96% {
    transform: translate(75px, 200px) rotate(327deg);
  }
  100% {
    transform: translate(75px, 220px) rotate(327deg);
  }
}

@keyframes PtoDown3 {
  0% {
    transform: translate(0px, 5px) rotate(0deg);
  }
  20% {
    transform: translate(0px, 62px) rotate(0deg);
  }
  60% {
    transform: translate(120px, 62px) rotate(360deg);
  }
  70% {
    transform: translate(145px, 78px) rotate(432deg);
  }
  80% {
    transform: translate(152.5px, 110px) rotate(454.5deg);
  }
  100% {
    transform: translate(152.5px, 155px) rotate(454.5deg);
  }
}

@keyframes PtoDown4 {
  0% {
    transform: translate(0px, 5px) rotate(360deg);
  }
  14% {
    transform: translate(0px, 62px) rotate(360deg);
  }
  42% {
    transform: translate(-120px, 62px) rotate(0deg);
  }
  49% {
    transform: translate(-145px, 78px) rotate(-75deg);
  }
  56% {
    transform: translate(-152.5px, 110px) rotate(-82.5deg);
  }
  70% {
    transform: translate(-152.5px, 155px) rotate(-82.5deg);
  }
  84% {
    transform: translate(-212.5px, 155px) rotate(-262.5deg);
  }
  96% {
    transform: translate(-230px, 200px) rotate(-315deg);
  }
  100% {
    transform: translate(-230px, 220px) rotate(-315deg);
  }
}

@keyframes PtoDown5 {
  0% {
    transform: translate(0px, 5px) rotate(360deg);
  }
  14% {
    transform: translate(0px, 62px) rotate(360deg);
  }
  42% {
    transform: translate(-120px, 62px) rotate(0deg);
  }
  49% {
    transform: translate(-145px, 78px) rotate(-75deg);
  }
  56% {
    transform: translate(-152.5px, 110px) rotate(-82.5deg);
  }
  70% {
    transform: translate(-152.5px, 155px) rotate(-82.5deg);
  }
  84% {
    transform: translate(-92.5px, 155px) rotate(97.5deg);
  }
  96% {
    transform: translate(-75px, 200px) rotate(150deg);
  }
  100% {
    transform: translate(-75px, 220px) rotate(150deg);
  }
}

@keyframes PtoDown6 {
  0% {
    transform: translate(0px, 5px) rotate(360deg);
  }
  20% {
    transform: translate(0px, 62px) rotate(360deg);
  }
  60% {
    transform: translate(-120px, 62px) rotate(0deg);
  }
  70% {
    transform: translate(-145px, 78px) rotate(-75deg);
  }
  80% {
    transform: translate(-152.5px, 110px) rotate(-82.5deg);
  }
  100% {
    transform: translate(-152.5px, 155px) rotate(-82.5deg);
  }
}
</style>
