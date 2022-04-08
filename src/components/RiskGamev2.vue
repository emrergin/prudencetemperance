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
          @mousedown.left="boruTasiE($event)"
          ondragstart="return false"
          :style="{
            visibility: secim === `2` ? `hidden` : `visible`,
          }"
        >
          <div id="kucukEtiketler1">
            <div id="solKucukEtiket1" class="kucukEtiket etiket soletiket">
              {{ convertNumbertoString(payOffs[currentRound][0]) }}
            </div>
            <div id="sagKucukEtiket1" class="kucukEtiket etiket sagetiket">
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
          @mousedown.left="boruTasiE($event)"
          ondragstart="return false"
          :style="{
            visibility: secim === `1` ? `hidden` : `visible`,
          }"
        >
          <div id="kucukEtiketler2">
            <div id="solKucukEtiket2" class="kucukEtiket etiket soletiket">
              {{ convertNumbertoString(payOffs[currentRound][2]) }}
            </div>
            <div id="sagKucukEtiket2" class="kucukEtiket etiket sagetiket">
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
        <button class="stepButton" id="nextRound" @click="siradakiTurE()">
          {{
            currentRound === totalRounds - 1 ? `Oyunu Bitir` : `Sıradaki Tur >>`
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
  <!-- <div>
    <div>
      <p>Toplam kazancınız: {{ store.kazanc }}</p>
      <p>İsim: {{ store.isim }}</p>
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
  </div> -->
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
const props = defineProps(["payOffs"]);
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
  boruTasi(e, `droppable`, asama.value, `riskBoru`, currentDroppable, secim);
}

function hareketE(e) {
  hareket(e, asama, bitis, secim, totalRevenue, totalLoss, store);
}

function siradakiTurE() {
  siradakiTur(
    `Risk`,
    store,
    bitis,
    baslangic,
    asama,
    props.payOffs,
    currentRound,
    secim,
    `riskBoru`,
    oyunSonu,
    totalRounds
  );
}

function convertNumbertoString(number) {
  return number > 0 ? `+` + number : `-` + Math.abs(number);
}
</script>

<style scoped>
#kucukBorular {
  align-items: center;
}
</style>
