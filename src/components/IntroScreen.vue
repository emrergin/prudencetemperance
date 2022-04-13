<template>
  <p>Lütfen isminizi ve soyisminizi giriniz.</p>
  <input v-model="store.isim" />

  <ul class="girisMetni">
    <li>
      Bu deney, Doç. Dr. Mehmet Yiğit Gürdal, Dr. Öğr. Üyesi Emre Ergin ve ...
      'in risk tutumları hakkındaki bir çalışmasına yöneliktir.
    </li>
    <li>
      Çalışmamız için sizden, üç adet oyunu alacağınız puanları hesaba katarak
      oynamanızı bekliyoruz.
    </li>
    <li>
      Bu oyunlarda alacağınız kararlar, en sonunda ne kadar puan/para
      kazanacağınızı etkileyecek.
    </li>
    <li>
      Oyunlarda bir ses bileşeni bulunmamaktadır. Bütün oyunlarda fare
      kullanımınız beklenmektedir.
    </li>
    <li>
      Her oyunun öncesinde o oyunu anlatan bir kısım bulunmaktadır. Bu
      kısımlarda yönergenin devamını okumak için, metnin istediği şeyi yapmanız,
      yahut sol tıklamanız bekleniyor.
    </li>
    <li>
      Oyunun herhangi bir aşamasında çıkmakta özgürsünüz. Bu durumda o ana
      kadarki puanlarınız değerlendirilecek.
    </li>
    <li>
      Bulunduğunuz sayfayı değiştirmeniz veya sayfayı yenilemeniz gibi
      hareketler durumunda deneyden erken ayrılmış sayılacaksınız.
    </li>
  </ul>
  <button
    v-if="store.isim"
    @click="logData();
    tamEkran();
    $emit('end', true);"
    class="stepButton"
  >
    Deneye başla!
  </button>
</template>

<script setup>
  import { store } from "../store.js";
  import { defineEmits as defineEmits } from "@vue/runtime-dom";

  defineEmits(["end"]);
  function logData() {      
    const someData = {
      title: "kisi verileri",
      kisiVerisi: store.veriler,
      odeme:store.kazanc,
      isim: store.isim,
      _id: store._id
    };
    const postMethod = {
      method: `POST`,
      body: JSON.stringify(someData),
      headers: {
        "Content-type": "application/json  ; charset=UTF-8", // Indicates the content
      },
    };
    fetch(`https://prudencetemperance.herokuapp.com/api/kisiveri`, postMethod);   
  }
  function tamEkran(){
    var requestMethod = document.body.requestFullScreen 
      || document.body.webkitRequestFullScreen 
      || document.body.mozRequestFullScreen 
      || document.body.msRequestFullscreen;
    requestMethod.call(document.body);
    return false;
  }
</script>

<style>
.girisMetni {
  text-align: left;
  font-size: 1.5rem;
  width: 1200px;
}
</style>
