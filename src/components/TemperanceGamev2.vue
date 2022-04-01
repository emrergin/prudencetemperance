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
      />
      <div id="buyukEtiketler">
        <div id="solBuyukEtiket" class="buyukEtiket etiket soletiket">
          {{ convertNumbertoString(payOffs[currentRound][0]) }}
        </div>
        <div id="sagBuyukEtiket" class="buyukEtiket etiket sagetiket">
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
        <button class="stepButton" id="nextRound" @click="siradakiTurE()">
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
    <p>Toplam kazancınız: {{ store.kazanc }}</p>
    <table>
      <tr>
        <th>Deney</th>
        <th>Karar Süresi (ms)</th>
        <th>Değerler</th>
        <th>Seçim</th>
      </tr>
      <tr v-for="veriSatiri in store.veriler" :key="veriSatiri[3]">
        <td>{{ veriSatiri[0] }}</td>
        <td>{{ veriSatiri[1] }}</td>
        <td>{{ veriSatiri[2] }}</td>
        <td>{{ veriSatiri[3] }}</td>
      </tr>
    </table>
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

const payOffs = [
  [9, 9, 2, -2, 3, -3],
  [9, 9, 1, -1, 4, -4],
  [6, 6, 4, -4, 1, -1],
  [14, 14, 3, -3, 10, -10],
  [4, 4, 2, -2, 1, -1],
];
const totalRounds = 5;

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
  hareket(e, asama, bitis, secimler, totalRevenue, totalLoss);
}

function siradakiTurE() {
  siradakiTur(
    `Temperance`,
    store,
    bitis,
    baslangic,
    asama,
    payOffs,
    currentRound,
    secimler,
    `temperanceBoru`,
    oyunSonu,
    totalRounds,
    totalRevenue.value,
    totalLoss.value
  );
}

function convertNumbertoString(number) {
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
