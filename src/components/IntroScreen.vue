<template>
  <ul class="girisMetni">

    <li>
      Hoş geldiniz.
    </li>
    <li>
      Bu deneyi belli durumlarda alınan ekonomik kararları anlamak icin hazırladık.
    </li>
    <li>
      Deneye <strong>Windows</strong> veya <strong>Linux</strong> kullanan bir cihazla katılmalısınız. Yani, mobil cihazlar ve <i>iOS</i> işletim sistemi deneye uygun değildir.
    </li>
    <li>
      Lütfen kullandığınız tarayıcının güncel olduğuna emin olun. Deney, <i>Internet Explorer</i> üzerinden çalışmamaktadır.
    </li>
    <li>
      Deneyde her biri 5 tur sürecek 3 oyun bulunuyor. 
      Her oyunun öncesinde o oyunu anlatan bir yönerge olacak. 
      Yönergeyi okurken devam etmek için metnin istediği şeyi yapmanız yahut farenin sol tuşuyla ekrana tıklamanız bekleniyor.
    </li>
    <li>
      Oyunlarda kazancınızı "puan" cinsinden hesaplayacağız. 
      Toplam kazancınız oyun boyunca topladığınız puanlara eşittir. 
    </li>
    <li>
      Oyunun herhangi bir aşamasında çıkmakta serbestsiniz. 
      Bu durumda, yahut bulunduğunuz sayfayı değiştirmeniz ve yenilemeniz gibi durumlarda deneyden ayrılmış sayılacaksınız.
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
  margin-top:0.75em;
}
</style>

<style scoped>
.stepButton{
  margin: 1em auto 20px auto;
}
</style>
