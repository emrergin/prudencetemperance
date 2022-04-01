<template>
  <div v-if="mode === `demo`">
    <PrudenceGame
      v-if="currentPhase === `pruGam`"
      @end="currentPhase = `temGam`"
    />
    <TemperanceGame
      v-if="currentPhase === `temGam`"
      @end="currentPhase = `rskGam`"
    />
    <RiskGame v-if="currentPhase === `rskGam`" @end="currentPhase = `son`" />
    <SonucEkrani v-if="currentPhase === `son`" />
  </div>
  <div v-else>
    <PrudenceTutorial
      v-if="currentPhase === `pruTut`"
      @end="currentPhase = `pruGam`"
    />
    <PrudenceGame
      v-if="currentPhase === `pruGam`"
      @end="currentPhase = `temTut`"
    />
    <TemperanceTutorial
      v-if="currentPhase === `temTut`"
      @end="currentPhase = `temGam`"
    />
    <TemperanceGame
      v-if="currentPhase === `temGam`"
      @end="currentPhase = `rskTut`"
    />
    <RiskTutorial
      v-if="currentPhase === `rskTut`"
      @end="currentPhase = `rskGam`"
    />
    <RiskGame v-if="currentPhase === `rskGam`" @end="currentPhase = `son`" />
    <SonucEkrani v-if="currentPhase === `son`" />
  </div>

  <footer>
    <a href="https://github.com/emrergin" target="_blank">Emre Ergin</a>
    tarafından yapılmıştır.
  </footer>
</template>

<script>
import PrudenceTutorial from "./components/PrudenceTutorial.vue";
import PrudenceGame from "./components/PrudenceGamev2.vue";
import TemperanceTutorial from "./components/TemperanceTutorial.vue";
import TemperanceGame from "./components/TemperanceGamev2.vue";
import RiskGame from "./components/RiskGamev2.vue";
import RiskTutorial from "./components/RiskTutorial.vue";
import SonucEkrani from "./components/SonucEkrani.vue";

export default {
  name: "App",
  components: {
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
      currentPhase: `rskGam`,
      mode: `demo`,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
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
