<template>
<div >
  <p> Kişinin toplam kazancı: {{store.kazanc}}</p>
  <table>
    <tr>
      <th>Oturum</th>
      <th>Deney</th>
      <th>Tarih</th>
      <th>Değerler</th>
      <th>Seçim</th>
    </tr>
    <tr v-for="veriSatiri in store.veriler" :key="veriSatiri[3]">
      <td>{{veriSatiri[0]}} </td>
      <td>{{veriSatiri[1]}}</td>
      <td>{{veriSatiri[2].toLocaleString("tr-TR", {year: 'numeric', month: 'numeric', 
  day: 'numeric', hour: '2-digit', minute: '2-digit', second: `2-digit`})+`:`+veriSatiri[2].getMilliseconds()}} </td>
      <td>{{veriSatiri[3]}}</td>
      <td>{{veriSatiri[4]}} </td>
    </tr>
  </table>
</div>
</template>
<script>
import { store } from '../store.js'
export default {
    data(){
        return{
            store
        }
    }
}
</script>

<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}

table td, table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: turquoise;
}
</style>
