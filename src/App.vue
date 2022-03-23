<template>
  <!-- <PrudenceTutorial v-if="currentPhase===`pruTut`" @end="currentPhase=`pruGam`" /> -->
 
  <PrudenceTutorial v-if="currentPhase===`pruTut`" @end="currentPhase=`pruGam`" />
  <PrudenceGame v-if="currentPhase===`pruGam`" @end="currentPhase=`temTut`"/>
  <TemperanceTutorial v-if="currentPhase===`temTut`"  @end="currentPhase=`temGam`" />
  <TemperanceGame v-if="currentPhase===`temGam`"  @end="currentPhase=`rskTut`" />
  <RiskTutorial v-if="currentPhase===`rskTut`" @end="currentPhase=`rskGam`"/>
  <RiskGame v-if="currentPhase===`rskGam`"  @end="currentPhase=`son`"/>
  <SonucEkrani v-if="currentPhase===`son`" />
</template>

<script>
import PrudenceGame from './components/PrudenceGame.vue';
import PrudenceTutorial from './components/PrudenceTutorial.vue';
import TemperanceGame from './components/TemperanceGame.vue';
import TemperanceTutorial from './components/TemperanceTutorial.vue';
import RiskGame from './components/RiskGame.vue';
import RiskTutorial from './components/RiskTutorial.vue';
import SonucEkrani from './components/SonucEkrani.vue';

export default {
  name: 'App',
  components:{PrudenceGame,PrudenceTutorial,TemperanceGame,TemperanceTutorial, RiskGame,RiskTutorial,SonucEkrani},
  data(){
        return{
            currentPhase:`pruTut`
        }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0px;
}
</style>
