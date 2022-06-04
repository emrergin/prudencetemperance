<template>
  <div v-if="!bitis">
    <button
      v-if="isTurkish"
      @click="
        bitis = true;
        $emit('end', true);
        exitFullscreen();
      "
      class="stepButton"
    >
      Verileri Gör
    </button>
    <button
      v-else
      @click="
        bitis = true;
        $emit('end', true);
        exitFullscreen();
      "
      class="stepButton"
    >
      See the Data
    </button>
  </div>
  <div v-else>
    <h2 v-if="isTurkish">Deney bitti. Katılımınız için teşekkürler.</h2>
    <h2 v-else>The experiment is over. Thank you for your participation.</h2>
    <h3 v-if="isTurkish">Verileriniz</h3>
    <h3 v-else>Your Data</h3>
    <p v-if="isTurkish">Kullanıcı ID: {{ store._id }}</p>
    <p v-else>User ID: {{ store._id }}</p>
    <p v-if="isTurkish">İsminiz: {{ store.isim }}</p>
    <p v-else>Name: {{ store.isim }}</p>
    <p v-if="isTurkish">Toplam kazancınız: {{ store.kazanc }}</p>
    <p v-else>Total Earnings: {{ store.kazanc }}</p>
    <table>
      <tr>
        <th v-if="isTurkish">Deney</th>
        <th v-else>Game</th>
        <th v-if="isTurkish">Karar Süresi (ms)</th>
        <th v-else>Decision Time (ms)</th>
        <th v-if="isTurkish">Değerler</th>
        <th v-else>Values</th>
        <th v-if="isTurkish">Seçim</th>
        <th v-else>Selection</th>
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
import { store } from "../store.js";
import { defineEmits as defineEmits } from "@vue/runtime-dom";
import { ref } from "vue";

defineEmits(["end"]);
defineProps({
  isTurkish: {
    type: Boolean,
    default: true,
  },
});

const bitis = ref(false);

function exitFullscreen() {
  var requestMethod =
    document.cancelFullScreen ||
    document.webkitCancelFullScreen ||
    document.mozCancelFullScreen ||
    document.exitFullscreen ||
    document.webkitExitFullscreen;
  if (requestMethod) {
    // cancel full screen.
    requestMethod.call(document);
  }
  return false;
}
</script>

<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: turquoise;
}
</style>
