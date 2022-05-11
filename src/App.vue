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
      @end="currentPhase = `pruTut`"
    />
    <PrudenceTutorial
      v-if="currentPhase === `pruTut`"
      @end="currentPhase = `pruGam`"
    />
    <PrudenceGame
    :payOffs="pruPayOffs"
      v-if="currentPhase === `pruGam`"
      @end="currentPhase = `temTut`"
    />
    <TemperanceTutorial
      v-if="currentPhase === `temTut`"
      @end="currentPhase = `temGam`"
    />
    <TemperanceGame
    :payOffs="temPayOffs"
      v-if="currentPhase === `temGam`"
      @end="currentPhase = `rskTut`"
    />
    <RiskTutorial
      v-if="currentPhase === `rskTut`"
      @end="currentPhase = `rskGam`"
    />
    <RiskGame 
    :payOffs="rskPayOffs"
    v-if="currentPhase === `rskGam`"
     @end="currentPhase = `son`" />
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
      mode: `demod`,
      store,
      deneyBitisi: false,
      pruPayOffs: [
        [9, 6, 2, -2],
        [9, 6, 1, -1],
        [9, 6, 4, -4],
        [14, 9, 3, -3],
        [7, 4, 2, -2],
      ],
      rskPayOffs: [
        [10, 8, 15, 3],
        [5, 3, 7, 1],
        [9, 12, 10, 10],
        [2, 4, 1, 5],
        [7, 1, 4, 4],
      ],
      temPayOffs: [
        [9, 9, 2, -2, 3, -3],
        [9, 9, 1, -1, 4, -4],
        [6, 6, 4, -4, 1, -1],
        [14, 14, 3, -3, 10, -10],
        [4, 4, 2, -2, 1, -1],
      ],
    };
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.preventNav);
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
