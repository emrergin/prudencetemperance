<template>
  <div v-if="mode === `demo`">
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
  <div v-else>
    <IntroScreen
      v-if="currentPhase === `intro`"
      @end="currentPhase = treatments[`intro`]"
    />
    <PrudenceTutorial
      v-if="currentPhase === `pruTut`"
      @end="currentPhase = `pruGam`"
    />
    <PrudenceGame
    :payOffs="pruPayOffs"
      v-if="currentPhase === `pruGam`"
      @end="currentPhase = treatments[`pruGam`]"
    />
    <TemperanceTutorial
      v-if="currentPhase === `temTut`"
      @end="currentPhase = `temGam`"
    />
    <TemperanceGame
    :payOffs="temPayOffs"
      v-if="currentPhase === `temGam`"
      @end="currentPhase = treatments[`temGam`]"
    />
    <RiskTutorial
      v-if="currentPhase === `rskTut`"
      @end="currentPhase = `rskGam`"
    />
    <RiskGame 
    :payOffs="rskPayOffs"
    v-if="currentPhase === `rskGam`"
     @end="currentPhase = treatments[`rskGam`]" />
    <SonucEkrani v-if="currentPhase === `son`" @end="deneyBitisi = true"/>
  </div>

  <footer v-if="currentPhase === `son` || currentPhase === `intro`">
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
      pruPayOffs: [
        [9, 6, 2, -2],
        [9, 6, 1, -1],
        [9, 6, 4, -4],
        [14, 9, 3, -3],
        [7, 4, 2, -2],
      ],
      rskPayOffs: [
        [1, 3, 0, 10],
        [2, 4, 0, 10],
        [3, 5, 0, 10],
        [4, 6, 0, 10],
        [5, 7, 0, 10],
      ],
      temPayOffs: [
        [9, 9, 3, -3, 3, -3],
        [9, 9, 3, -3, 1, -1],
        [9, 9, 5, -5, 3, -3],
        [3, 3, 1, -1, 1, -1],
        [7, 7, 3, -3, 3, -3],
      ],
      nextTreatment:[
          {
            intro: `rskTut`,
            rskGam: `pruTut`,
            pruGam: `temTut`,
            temGam: `son`
          }
          ,
          {
            intro: `rskTut`,
            rskGam: `temTut`,
            temGam: `pruTut`,
            pruGam: `son`
          }
      ]
    };
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.preventNav);
  },
  onMounted() {
    this.treatments=this.nextTreatment[Math.floor(Math.random()*this.nextTreatment.length)];
  },
  methods: {
    preventNav(event) {
      if (store.isim && !this.deneyBitisi){
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
</style>
