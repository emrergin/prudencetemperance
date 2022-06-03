<template>
  <div v-if="!bitis">
    <button
      @click="
        bitis = true;
        $emit('end', true);
        tamEkrandanCik();
      "
      class="stepButton"
    >
      Verileri Gör
    </button>
  </div>
  <div v-else>
    <h2>Deney bitti. Katılımınız için teşekkürler.</h2>
    <h3>Verileriniz</h3>
    <p>Kullanıcı ID: {{ store._id }}</p>
    <p>İsminiz: {{ store.isim }}</p>
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
import { store } from "../store.js";
import { defineEmits as defineEmits } from "@vue/runtime-dom";
import { ref } from "vue";

defineEmits(["end"]);

const bitis = ref(false);

function tamEkrandanCik() {
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
