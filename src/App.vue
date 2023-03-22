<template>
  <div id="languagePicker" v-if="currentPhase === `intro`">
    <button v-if="isTurkish" @click="isTurkish = false">English</button>
    <button v-else @click="isTurkish = true">Türkçe</button>
  </div>
  <div id="mobileWarning">
    <div v-if="isTurkish">Daha geniş bir ekrana ihtiyacınız var.</div>
    <div v-else>You need a larger screen for this.</div>
  </div>
  <div id="mainWrapper">
    <IntroScreen
      :isTurkish="isTurkish"
      v-if="currentPhase === `intro`"
      @end="currentPhase = treatments[`intro`]"
    />
    <PrudenceTutorial
      :isTurkish="isTurkish"
      v-if="currentPhase === `pruTut`"
      @end="currentPhase = `pruGam`"
    />
    <PrudenceGame
      :payOffs="pruPayOffs"
      :isTurkish="isTurkish"
      :lastTreatment="treatments[`pruGam`] === `son`"
      v-if="currentPhase === `pruGam`"
      @end="currentPhase = treatments[`pruGam`]"
    />
    <TemperanceTutorial
      :isTurkish="isTurkish"
      v-if="currentPhase === `temTut`"
      @end="currentPhase = `temGam`"
    />
    <TemperanceGame
      :payOffs="temPayOffs"
      :isTurkish="isTurkish"
      :lastTreatment="treatments[`temGam`] === `son`"
      v-if="currentPhase === `temGam`"
      @end="currentPhase = treatments[`temGam`]"
    />
    <RiskTutorial
      :isTurkish="isTurkish"
      v-if="currentPhase === `rskTut`"
      @end="currentPhase = `rskGam`"
    />
    <RiskGame
      :payOffs="rskPayOffs"
      :isTurkish="isTurkish"
      :lastTreatment="treatments[`rskGam`] === `son`"
      v-if="currentPhase === `rskGam`"
      @end="currentPhase = treatments[`rskGam`]"
    />
    <SonucEkrani
      v-if="currentPhase === `son`"
      @end="endOfExperiment = true"
      :isTurkish="isTurkish"
    />
  </div>

  <footer
    v-if="(endOfExperiment === true || currentPhase === `intro`) && isTurkish"
  >
    <a href="https://github.com/emrergin" target="_blank">Emre Ergin</a>
    tarafından yapılmıştır.
  </footer>
  <footer
    v-if="(endOfExperiment === true || currentPhase === `intro`) && !isTurkish"
  >
    Made by
    <a href="https://github.com/emrergin" target="_blank">Emre Ergin</a>.
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
      store,
      endOfExperiment: false,
      treatments: null,
      isTurkish: false,
      pruPayOffs: [
        [4, 11, 3, -3],
        [3, 9, 2, -2],
        [5, 8, 4, -4],
        [5, 10, 3, -3],
        [3, 8, 1, -1],
        [5, 9, 4, -4],
        [6, 12, 5, -5],
        [6, 10, 5, -5],
        [5, 10, 4, -4],
        [4, 6, 3, -3],
        [2, 6, 1, -1],
        [3, 6, 2, -2],
      ],
      rskPayOffs: [
        [8, 9, 1, 16],
        [7, 9, 2, 14],
        [9, 11, 4, 16],
        [7, 9, 3, 13],
        [4, 5, 1, 8],
        [5, 7, 2, 10],
        [6, 7, 3, 10],
        [7, 9, 4, 12],
        [6, 8, 3, 11],
        [8, 9, 5, 12],
        [8, 9, 3, 14],
        [6, 7, 1, 12],
      ],
      temPayOffs: [
        [7, 7, 2, -2, 4, -4],
        [7, 7, 3, -3, 3, -3],
        [5, 5, 1, -1, 2, -2],
        [5, 5, 1, -1, 3, -3],
        [8, 8, 2, -2, 3, -3],
        [9, 9, 2, -2, 6, -6],
        [8, 8, 3, -3, 4, -4],
        [8, 8, 2, -2, 5, -5],
        [10, 10, 3, -3, 6, -6],
        [10, 10, 4, -4, 5, -5],
        [8, 8, 1, -1, 6, -6],
        [5, 5, 2 - 2, 2, -2],
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
      if (store.isim && !this.endOfExperiment) {
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
  font-size: 1.5rem;
  padding-block: 10rem;
  display: none;
}

#languagePicker {
  display: flex;
  justify-content: flex-end;
  padding-top: 1em;
  padding-inline: 2em;
}

#languagePicker > button {
  font-size: 1rem;
  padding-inline: 3ch;
}
</style>
