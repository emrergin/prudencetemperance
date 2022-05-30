<template>
  <ul class="girisMetni">
    <li>
      Bu deney, <strong>Mehmet Yiğit Gürdal</strong> ve <strong>Emre Ergin</strong>'in risk tutumları hakkındaki bir çalışmasına yöneliktir.
    </li>
    <li>
      Deneye <strong>Windows</strong> veya <strong>Linux</strong> kullanan bir cihazla katılmalısınız. Yani, mobil cihazlar ve <i>iOS</i> işletim sistemi deneye uygun değildir.
    </li>
    <li>
      Lütfen kullandığınız tarayıcının güncel olduğuna emin olun. Deney, <i>Internet Explorer</i> üzerinden çalışmamaktadır.
    </li>
    <li>
      Oyunlarda bir ses bileşeni bulunmamaktadır. Bütün oyunlarda fare
      kullanmanız beklenmektedir.
    </li>
    <li>
      Çalışmamız için sizden üç adet oyunu, alacağınız puanları hesaba katarak
      oynamanızı bekliyoruz.
    </li>
    <li>
      Bu oyunlarda alacağınız kararlar, en sonunda ne kadar puan
      kazanacağınızı etkileyecek.
    </li>
    <li>
      Her oyunun öncesinde o oyunu anlatan bir kısım bulunmaktadır. Bu
      kısımlarda yönergenin devamını okumak için metnin istediği şeyi yapmanız
      yahut farenin sol tuşuyla ekrana tıklamanız bekleniyor.
    </li>
    <li>
      Oyunun herhangi bir aşamasında çıkmakta özgürsünüz. 
      Bu durumda o ana kadarki puanlarınız değerlendirilecek.
    </li>
    <li>
      Bulunduğunuz sayfayı değiştirmeniz veya sayfayı yenilemeniz gibi
      durumlarda deneyden erken ayrılmış sayılacaksınız.
    </li>
  </ul>

  <p>Çalışmaya katılmayı kabul ediyorum.</p>
  <input style="display:block;margin-inline: auto;" v-model="store.isim" placeholder="Ad Soyad"/>
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
  width: 75ch;
  margin: 1.5rem auto 1rem auto;
}

.girisMetni>li+li{
  margin-top:0.25em;
}
</style>

<style scoped>
.stepButton{
  margin: 1em auto 20px auto;
}
</style>
