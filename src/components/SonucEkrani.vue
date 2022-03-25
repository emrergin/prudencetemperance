<template>

<div v-if="asama===`gonderilmedi`">
  <p>Lütfen isminizi giriniz.</p>
  <input v-model="isim">
  <Transition name="tutorial">
  <button  @click="veriGonder()" v-if="isim">
    Veriyi Gönder
  </button>
  </Transition>



<div >
  <p> Toplam kazancınız: {{store.kazanc}}</p>
  <table>
    <tr>
      <th>Deney</th>
      <th>Karar Süresi (ms)</th>
      <th>Değerler</th>
      <th>Seçim</th>
    </tr>
    <tr v-for="veriSatiri in store.veriler" :key="veriSatiri[3]">
      <td>{{veriSatiri[0]}} </td>
      <td>{{veriSatiri[1]}}</td>
      <td>{{veriSatiri[2]}}</td>
      <td>{{veriSatiri[3]}}</td>
    </tr>
  </table>
</div>

</div>
<div v-else>
  <h2>Veriniz gönderildi. Katılımınız için teşekkürler.</h2>
</div>
</template>
<script>
import { store } from '../store.js'
export default {
    data(){
        return{
            store,
            isim: null,
            asama: `gonderilmedi`
        }
    },
    methods:{
      veriGonder(){
        const someData = {
          title: "kisi verileri",
          kisiVerisi : store.veriler,
          odeme: store.kazanc,
          isim: this.isim
        }   
      const putMethod = {
        method: 'PUT', // Method itself
        headers: {
          'Content-type': 'application/json  ; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(someData)
      }
      // console.log(JSON.stringify(someData))
      fetch(`https://prudencetemperance.herokuapp.com/api/kisiveri`,putMethod)
      .then(()=>this.asama=`ok`)
      .catch(err => console.log(err)); // Do something with the error
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
