<template>
  <div class="warning" v-if="isTurkish">
    Bu site deneyin son hali, laboratuarda uygulanan son versiyonu değildir.
    Önizleme kolaylığı açısından buraya konmuştur. Deneyin son hali için:
    <a href="https://github.com/emrergin/prudence-labversion"
      >https://github.com/emrergin/prudence-labversion</a
    >
  </div>
  <div class="warning" v-else>
    This is not the latest version of the experiment that is also used in the
    laboratory setup. It is only here for ease of reviewing. For the last
    version, visit:
    <a href="https://github.com/emrergin/prudence-labversion"
      >https://github.com/emrergin/prudence-labversion</a
    >
  </div>
  <ul class="girisMetni" v-if="isTurkish">
    <li>
      Hoş geldiniz. Bu deneyi belli durumlarda alınan ekonomik kararları anlamak
      için hazırladık.
    </li>
    <li>
      Deneyde fare kullanmanız beklendiğinden, mobil cihazlar deneye uygun
      değildir.
    </li>
    <li>
      Deney, <i>Internet Explorer</i> ve <i>Safari</i> üzerinden
      çalışmamaktadır. Lütfen kullandığınız tarayıcının güncel olduğuna emin
      olun.
    </li>
    <li>
      Deneyde her biri 15 tur sürecek 3 oyun bulunuyor. Her oyunun öncesinde o
      oyunu anlatan bir yönerge olacak. Yönergeyi okurken devam etmek için
      metnin istediği şeyi yapmanız yahut farenin sol tuşuyla ekrana tıklamanız
      bekleniyor.
    </li>
    <li>
      Oyunlarda kazancınızı "puan" cinsinden hesaplayacağız. Toplam kazancınız
      deney boyunca topladığınız puanlara eşittir.
    </li>
    <li>
      Deneyden erken ayrılabilirsiniz. Bulunduğunuz sayfayı değiştirmeniz ve
      yenilemeniz gibi durumlarda da deneyden erken ayrılmış sayılacaksınız.
      Erken ayrılmanız durumunda o zamana kadarki kararlarınız
      değerlendirilecek.
    </li>
  </ul>
  <ul class="girisMetni" v-else>
    <li>
      Welcome. We designed this experiment to understand economic decisions in
      certain situations.
    </li>
    <li>
      Since the games need mouse use, mobile devices are not suitable for the
      experiment.
    </li>
    <li>
      The experiment does not work with <i>Internet Explorer</i> or
      <i>Safari</i>. Please make sure that the browser you are using is updated
      recently.
    </li>
    <li>
      In the experiment, there are 3 games with 15 rounds each. Before each
      game, there will be a corresponding instructions page. While reading the
      instructions, to resume the text, you should either do what the text asks,
      or left-click to the screen.
    </li>
    <li>
      We will calculate your earnings in terms of "points". Your total earnings
      will be equal to the points you collect across the games.
    </li>
    <li>
      You can leave the experiment early. Changing the page or refreshing it
      will also be counted as leaving the experiment early. In this case, the
      points you collected until then will still be evaluated.
    </li>
  </ul>

  <p v-if="isTurkish">Çalışmaya katılmayı kabul ediyorum.</p>
  <p v-else>I agree to participate in this research.</p>
  <input
    v-if="isTurkish"
    style="display: block; margin-inline: auto"
    v-model="store.isim"
    placeholder="Ad Soyad"
  />
  <input
    v-else
    style="display: block; margin-inline: auto"
    v-model="store.isim"
    placeholder="Name Surname"
  />
  <button
    v-if="store.isim"
    @click="
      logData();
      tamEkran();
      $emit('end', true);
    "
    class="stepButton"
  >
    <span v-if="isTurkish">Deneye başla!</span>
    <span v-else>Start the experiment!</span>
  </button>
</template>

<script setup>
import { store } from "../store.js";
import { defineEmits as defineEmits } from "@vue/runtime-dom";

defineEmits(["end"]);
defineProps({
  isTurkish: {
    type: Boolean,
    default: true,
  },
});
function logData() {
  const someData = {
    title: "kisi verileri",
    kisiVerisi: store.veriler,
    odeme: store.kazanc,
    isim: store.isim,
    _id: store._id,
  };
  const postMethod = {
    method: `POST`,
    body: JSON.stringify(someData),
    headers: {
      "Content-type": "application/json  ; charset=UTF-8", // Indicates the content
    },
  };
  console.log(postMethod);
  //fetch(`https://prudencetemperance.herokuapp.com/api/kisiveri`, postMethod);
}
function tamEkran() {
  var requestMethod =
    document.body.requestFullScreen ||
    document.body.webkitRequestFullScreen ||
    document.body.mozRequestFullScreen ||
    document.body.msRequestFullscreen;
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

.girisMetni > li + li {
  margin-top: 0.75em;
}
</style>

<style scoped>
.stepButton {
  margin: 1em auto 20px auto;
}

.warning {
  border: solid 4px red;
  font-size: 1.5rem;
  padding-block: 1ch;
  font-weight: bold;
}
</style>
