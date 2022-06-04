<template>
  <div class="oyunKutusu" v-if="!oyunSonu">
    <ScoreTable
      :totalRevenue="totalRevenue"
      :totalLoss="totalLoss"
      :totalRounds="totalRounds"
      :currentRound="currentRound"
      :isTurkish="isTurkish"
    />
    <div id="oyunAsagi">
      <img
        id="futbolTopu"
        ref="futbolTopu"
        src="../assets/soccer_ball.svg"
        oncontextmenu="return false"
        @click="hareketE($event)"
        :class="{
          clickReminder:
            secimler.filter((a) => a).length === 2 &&
            currentRound === 0 &&
            asama === `baslangic`,
        }"
      />
      <div id="buyukBoru">
        <div id="largeTags">
          <div id="leftLargeTag" class="buyukEtiket etiket soletiket">
            {{ convertNumbertoString(payOffs[currentRound][0]) }}
          </div>
          <div id="rightLargeTag" class="buyukEtiket etiket sagetiket">
            {{ convertNumbertoString(payOffs[currentRound][1]) }}
          </div>
        </div>
        <img src="../assets/buyukboru.svg" />
      </div>
      <div class="buyukInputlar">
        <div
          class="droppable2"
          id="i0"
          :class="{ gorulmez: secimler[0] || asama !== `baslangic` }"
        >
          A
        </div>
        <div
          class="droppable2"
          id="i1"
          :class="{ gorulmez: secimler[1] || asama !== `baslangic` }"
        >
          B
        </div>
      </div>
      <div class="buyukInputlar">
        <div
          class="droppable2"
          id="i2"
          :class="{
            gorulmez: !secimler[0] || secimler[2] || asama !== `baslangic`,
          }"
        >
          C
        </div>
        <div
          class="droppable2"
          id="i3"
          :class="{
            gorulmez: !secimler[1] || secimler[3] || asama !== `baslangic`,
          }"
        >
          D
        </div>
      </div>
      <div id="kucukBorular" v-if="asama !== `roundsonu`">
        <div
          id="kucukBoru1"
          class="temperanceBoru"
          oncontextmenu="return false"
          @mousedown.left="boruTasiE($event)"
          ondragstart="return false"
        >
          <div id="kucukEtiketler1">
            <div id="solKucukEtiket1" class="kucukEtiket etiket soletiket">
              {{ convertNumbertoString(payOffs[currentRound][2]) }}
            </div>
            <div id="sagKucukEtiket1" class="kucukEtiket etiket sagetiket">
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
          @mousedown.left="boruTasiE($event)"
          ondragstart="return false"
        >
          <div id="kucukEtiketler2">
            <div id="solKucukEtiket2" class="kucukEtiket etiket soletiket">
              {{ convertNumbertoString(payOffs[currentRound][4]) }}
            </div>
            <div id="sagKucukEtiket2" class="kucukEtiket etiket sagetiket">
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
        <button
          class="stepButton"
          id="nextRound"
          @click="siradakiTurE()"
          v-if="isTurkish"
        >
          {{
            currentRound === totalRounds - 1 ? `Oyunu Bitir` : `Sıradaki Tur >>`
          }}
        </button>
        <button
          class="stepButton"
          id="nextRound"
          @click="siradakiTurE()"
          v-else
        >
          {{
            currentRound === totalRounds - 1 ? `End the Game` : `Next Round >>`
          }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="oyunSonu && isTurkish" class="oyunKutusu">
    <p>Oyunu tamamladınız. Toplam kazancınız: {{ totalRevenue - totalLoss }}</p>
    <button @click="$emit('end', true)" class="stepButton">
      <span v-if="lastTreatment">Deneyi Bitir</span>
      <span v-else>Diğer Oyuna Geç!</span>
    </button>
  </div>
  <div v-if="oyunSonu && !isTurkish" class="oyunKutusu">
    <p>
      You completed the game. Total earnings: {{ totalRevenue - totalLoss }}
    </p>
    <button @click="$emit('end', true)" class="stepButton">
      <span v-if="lastTreatment">End the experiment</span>
      <span v-else>Proceed to the next game!</span>
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
const props = defineProps({
  payOffs: undefined,
  lastTreatment: {
    type: Boolean,
    default: false,
  },
  isTurkish: {
    type: Boolean,
    default: true,
  },
});
// eslint-disable-next-line
const totalRounds = props.payOffs.length;

const currentDroppable = ref(null);
const secimler = ref([null, null, null, null]);
const asama = ref(`baslangic`);
const baslangic = ref(new Date());
const bitis = ref(null);
const totalRevenue = ref(0);
const totalLoss = ref(0);

const currentRound = ref(0);
const oyunSonu = ref(false);

function boruTasiE(e) {
  boruTasi(
    e,
    `droppable2`,
    asama.value,
    `temperanceBoru`,
    currentDroppable,
    secimler
  );
}

function hareketE(e) {
  hareket(e, asama, bitis, secimler, totalRevenue, totalLoss, store);
}

function siradakiTurE() {
  siradakiTur(
    `Temperance`,
    store,
    bitis,
    baslangic,
    asama,
    props.payOffs,
    currentRound,
    secimler,
    `temperanceBoru`,
    oyunSonu,
    totalRounds
  );
}

function convertNumbertoString(number) {
  if (number === 0) {
    return `${number}`;
  }
  return number > 0 ? `+` + number : `-` + Math.abs(number);
}
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
