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
        @click="hareketE($event)"
        :class="{ clickReminder: (secim && currentRound===0 && asama===`baslangic`) }"
      />
      <div id="buyukBoru">
        <div id="buyukEtiketler">
          <div id="solBuyukEtiket" class="buyukEtiket etiket soletiket">
            {{ convertNumbertoString(payOffs[currentRound][0]) }}
          </div>
          <div id="sagBuyukEtiket" class="buyukEtiket etiket sagetiket">
            {{ convertNumbertoString(payOffs[currentRound][1]) }}
          </div>
        </div>
        <img src="../assets/buyukboru.svg" />
      </div>
      <div id="inputlar">
        <div
          class="droppable"
          id="i1"
          :style="{ visibility: !secim ? `visible` : `hidden` }"
        >
          A
        </div>
        <div
          class="droppable"
          id="i2"
          :style="{ visibility: !secim ? `visible` : `hidden` }"
        >
          B
        </div>
      </div>
      <div v-if="asama !== `roundsonu`">
        <div
          id="kucukBoru"
          class="kucukBoru"
          oncontextmenu="return false"
          @mousedown.left="boruTasiE($event)"
          ondragstart="return false"
        >
          <div id="kucukEtiketler">
            <div id="solKucukEtiket" class="kucukEtiket etiket soletiket">
              {{ convertNumbertoString(payOffs[currentRound][2]) }}
            </div>
            <div id="sagKucukEtiket" class="kucukEtiket etiket sagetiket">
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
      <button
        class="stepButton"
        id="nextRound"
        v-if="asama === `roundsonu`"
        @click="siradakiTurE()"
      >
        {{
          currentRound === totalRounds - 1 ? `Oyunu Bitir` : `Sıradaki Tur >>`
        }}
      </button>
    </div>
  </div>
  <div v-if="oyunSonu" class="oyunKutusu">
    <p>Oyunu tamamladınız. Toplam kazancınız: {{ totalRevenue - totalLoss }}</p>
    <button @click="$emit('end', true)" class="stepButton">
      <span v-if="lastTreatment">Deneyi Bitir</span>
      <span v-else>Diğer Oyuna Geç!</span>
    </button>
  </div>
</template>

<script setup>
import ScoreTable from "./ScoreTable.vue";
import { store } from "../store.js";
import { ref } from "vue";
import boruTasi from "../composables/boruTasi";
import hareket from "../composables/hareket";
import siradakiTur from "../composables/siradakiTur";
import { defineEmits as defineEmits } from "@vue/runtime-dom";

defineEmits(["end"]);
// eslint-disable-next-line
const props = defineProps({
  payOffs: undefined,
  lastTreatment:{
    type:Boolean,
    default:false
    }
  });
// eslint-disable-next-line
const totalRounds = props.payOffs.length;

const currentDroppable = ref(null);
const secim = ref(null);
const asama = ref(`baslangic`);
const baslangic = ref(new Date());
const bitis = ref(null);
const totalRevenue = ref(0);
const totalLoss = ref(0);

const currentRound = ref(0);
const oyunSonu = ref(false);

function boruTasiE(e) {
  boruTasi(e, `droppable`, asama.value, `kucukBoru`, currentDroppable, secim);
}

function hareketE(e) {
  hareket(e, asama, bitis, secim, totalRevenue, totalLoss, store);
}

function siradakiTurE() {
  siradakiTur(
    `Prudence`,
    store,
    bitis,
    baslangic,
    asama,
    props.payOffs,
    currentRound,
    secim,
    `kucukBoru`,
    oyunSonu,
    totalRounds
  );
}

function convertNumbertoString(number) {
  if (number===0) {return `${number}`}
  return number > 0 ? `+` + number : `-` + Math.abs(number);
}

</script>

<style>
.oyunKutusu {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  margin: 0px;
  min-height: 433px;
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
  justify-content: space-evenly;
  width:100%;
  /* top: 28px; */
}

.buyukEtiket {
  border: 2px solid black;
  border-radius: 8px;
  padding: 2px;
}
#kucukBoru,
#kucukBoru1,
#kucukBoru2,
#buyukBoru {
  position: relative;
}

img{
  display: block;
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
  min-width:3ch;
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
  z-index: 4;
}

.stepButton {
  padding: 5px;
  font-size: 1.5em;
  margin: 60px auto 20px auto;
}
</style>
