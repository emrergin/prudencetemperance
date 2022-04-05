<template>
  <p>Lütfen isminizi giriniz.</p>
  <input v-model="isim" />

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
    v-if="isim"
    @click="
      store.isim = isim;
      $emit('end', true);
    "
    class="stepButton"
  >
    Deneye başla!
  </button>
</template>

<script>
import { store } from "../store.js";
export default {
  data() {
    return {
      isim: null,
      store,
    };
  },
  emits: ["end"],
};
</script>

<style>
.girisMetni {
  text-align: left;
  font-size: 1.5rem;
  width: 1200px;
}
</style>
