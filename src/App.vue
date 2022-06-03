<template>
  <div id="mobileWarning">
    <div v-if="isTurkish">Daha geniş bir ekrana ihtiyacınız var.</div>
    <div v-else>You need a larger screen for this.</div>
  </div>
  <!-- <div v-if="mode === `demo`" id="mainWrapper">
    <IntroScreen
      v-if="currentPhase === `intro`"
      @end="currentPhase = `temGam`"
    />
    <PrudenceGame
      :payOffs="pruPayOffs"
      v-if="currentPhase === `pruGam`"
      @end="currentPhase = `temGam`"
    />
    <TemperanceGame
      :payOffs="temPayOffs"
      v-if="currentPhase === `temGam`"
      @end="currentPhase = `rskGam`"
    />
    <RiskGame
      :payOffs="rskPayOffs"
      v-if="currentPhase === `rskGam`"
      @end="currentPhase = `son`"
    />
    <SonucEkrani v-if="currentPhase === `son`" />
  </div>
  <div v-else id="mainWrapper"> -->
  <div id="mainWrapper">
    <IntroScreen
      :isTurkish="isTurkish"
      v-if="currentPhase === `intro`"
      @end="currentPhase = treatments[`intro`]"
    />
    <PrudenceTutorial
      v-if="currentPhase === `pruTut`"
      @end="currentPhase = `pruGam`"
    />
    <PrudenceGame
      :payOffs="pruPayOffs"
      :lastTreatment="treatments[`pruGam`] === `son`"
      v-if="currentPhase === `pruGam`"
      @end="currentPhase = treatments[`pruGam`]"
    />
    <TemperanceTutorial
      v-if="currentPhase === `temTut`"
      @end="currentPhase = `temGam`"
    />
    <TemperanceGame
      :payOffs="temPayOffs"
      :lastTreatment="treatments[`temGam`] === `son`"
      v-if="currentPhase === `temGam`"
      @end="currentPhase = treatments[`temGam`]"
    />
    <RiskTutorial
      v-if="currentPhase === `rskTut`"
      @end="currentPhase = `rskGam`"
    />
    <RiskGame
      :payOffs="rskPayOffs"
      :lastTreatment="treatments[`rskGam`] === `son`"
      v-if="currentPhase === `rskGam`"
      @end="currentPhase = treatments[`rskGam`]"
    />
    <SonucEkrani v-if="currentPhase === `son`" @end="deneyBitisi = true" />
  </div>

  <footer v-if="deneyBitisi === true || currentPhase === `intro`">
    <a href="https://github.com/emrergin" target="_blank">Emre Ergin</a>
    tarafından yapılmıştır.
  </footer>
</template>

<script>
import IntroScreen from "./components/IntroScreen.vue";
import PrudenceTutorial from "./components/PrudenceTutorial.vue";
import PrudenceGame from "./components/PrudenceGamev2.vue";
import TemperanceTutorial from "./components/TemperanceTutorial.vue";
import TemperanceGame from "./components/TemperanceGamev2.vue";
import RiskGame from "./components/RiskGamev2.vue";
import RiskTutorial from "./components/RiskTutorial.vue";
import SonucEkrani from "./components/SonucEkrani.vue";
import { store } from "./store.js";

export default {
  name: "App",
  components: {
    IntroScreen,
    PrudenceGame,
    PrudenceTutorial,
    TemperanceGame,
    TemperanceTutorial,
    RiskGame,
    RiskTutorial,
    SonucEkrani,
  },
  data() {
    return {
      currentPhase: `intro`,
      mode: `notDemo`,
      store,
      deneyBitisi: false,
      treatments: null,
      isTurkish: false,
      pruPayOffs: [
        [9, 6, 2, -2],
        [9, 6, 1, -1],
        [9, 6, 4, -4],
        [14, 9, 3, -3],
        [7, 4, 2, -2],
      ],
      rskPayOffs: [
        [4, 4, 1, 13],
        [5, 5, 1, 13],
        [6, 6, 1, 13],
        [7, 7, 1, 13],
        [8, 8, 1, 13],
      ],
      temPayOffs: [
        [9, 9, 3, -3, 3, -3],
        [9, 9, 3, -3, 1, -1],
        [9, 9, 5, -5, 3, -3],
        [3, 3, 1, -1, 1, -1],
        [7, 7, 3, -3, 3, -3],
      ],
      nextTreatment: [
        {
          intro: `rskTut`,
          rskGam: `pruTut`,
          pruGam: `temTut`,
          temGam: `son`,
        },
        {
          intro: `rskTut`,
          rskGam: `temTut`,
          temGam: `pruTut`,
          pruGam: `son`,
        },
      ],
    };
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
    this.treatments =
      this.nextTreatment[Math.floor(Math.random() * this.nextTreatment.length)];
    for (let satir of this.pruPayOffs) {
      if (Math.floor(Math.random() * 2)) {
        let geciciPar = satir[0];
        satir[0] = satir[1];
        satir[1] = geciciPar;
      }
    }
    for (let satir of this.rskPayOffs) {
      if (Math.floor(Math.random() * 2)) {
        let geciciPar1 = satir[0];
        let geciciPar2 = satir[1];
        satir[0] = satir[2];
        satir[1] = satir[3];
        satir[2] = geciciPar1;
        satir[3] = geciciPar2;
      }
    }
    for (let satir of this.temPayOffs) {
      if (Math.floor(Math.random() * 2)) {
        let geciciPar1 = satir[2];
        let geciciPar2 = satir[3];
        satir[2] = satir[4];
        satir[3] = satir[5];
        satir[4] = geciciPar1;
        satir[5] = geciciPar2;
      }
    }
    function shuffle(array) {
      let resArray = array;
      for (let i = resArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [resArray[i], resArray[j]] = [resArray[j], resArray[i]];
      }
      return resArray;
    }
    this.pruPayOffs = shuffle(this.pruPayOffs);
    this.rskPayOffs = shuffle(this.rskPayOffs);
    this.temPayOffs = shuffle(this.temPayOffs);
    console.log(this.pruPayOffs, this.rskPayOffs, this.temPayOffs);

    if (navigator.language === `tr-TR`) {
      this.isTurkish = true;
    }
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.preventNav);
  },
  methods: {
    preventNav(event) {
      if (store.isim && !this.deneyBitisi) {
        event.preventDefault();
        event.returnValue = "";
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  min-height: calc(100vh - 6px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
}

footer {
  width: 100%;
  text-align: right;
  font-weight: 800;
  padding: 20px;
  background-color: turquoise;
  margin-top: auto;
}

#mobileWarning {
  /* width:100vw;
  height:100vh; */
  /* z-index:10;
  position:absolute; */
  font-size: 1.5rem;
  padding-block: 10rem;
  display: none;
}
</style>
