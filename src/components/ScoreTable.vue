<template>
  <ul class="plainList" id="oyunVerileri" v-if="isTurkish">
    <li>
      <span>Toplam Kazanç </span
      ><span class="veriKare" id="topKazanc">{{ totalRevenue }}</span>
    </li>
    <li>
      <span>Toplam Kayıp </span
      ><span class="veriKare" id="topKayip">{{ totalLoss }}</span>
    </li>
    <li>
      <span>Net Kazanç </span
      ><span class="veriKare" id="netKazanc">{{
        totalRevenue - totalLoss
      }}</span>
    </li>
    <li>
      <span>Oyun </span
      ><span class="veriKare" id="oyunRound">{{
        currentRound + 1 + `/` + totalRounds
      }}</span>
    </li>
  </ul>
  <ul v-else>
    <li>
      <span>Total Earnings </span
      ><span class="veriKare" id="topKazanc">{{ totalRevenue }}</span>
    </li>
    <li>
      <span>Total Loss </span
      ><span class="veriKare" id="topKayip">{{ totalLoss }}</span>
    </li>
    <li>
      <span>Net Earnings </span
      ><span class="veriKare" id="netKazanc">{{
        totalRevenue - totalLoss
      }}</span>
    </li>
    <li>
      <span>Round </span
      ><span class="veriKare" id="oyunRound">{{
        currentRound + 1 + `/` + totalRounds
      }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: [
    `totalRevenue`,
    `totalLoss`,
    `currentRound`,
    `totalRounds`,
    `isTurkish`,
  ],
};
</script>
<style>
.plainList {
  list-style-type: none;
  padding-left: 0px;
}

#oyunVerileri {
  background-color: #d0d0d0;
  padding: 10px;
  display: flex;
  gap: 10px;
  margin-top: 0px;
}

.veriKare {
  padding: 5px 10px;
  background-color: #f7f7f7;
}
</style>
