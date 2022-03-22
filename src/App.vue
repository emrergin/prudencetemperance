<template>
  <!-- <PrudenceTutorial v-if="currentPhase===`pruTut`" @end="currentPhase=`pruGam`" /> -->
 
  <PrudenceTutorial v-if="currentPhase===`pruTut`" @end="currentPhase=`pruGam`" />
  <PrudenceGame v-if="currentPhase===`pruGam`" @end="currentPhase=`temTut`"/>
  <TemperanceTutorial v-if="currentPhase===`temTut`"  @end="currentPhase=`temGam`" />
  <TemperanceGame v-if="currentPhase===`temGam`"  @end="currentPhase=`rskGam`" />
   <RiskGame v-if="currentPhase===`rskGam`"/>
</template>

<script>
import PrudenceGame from './components/PrudenceGame.vue';
import PrudenceTutorial from './components/PrudenceTutorial.vue';
import TemperanceGame from './components/TemperanceGame.vue';
import TemperanceTutorial from './components/TemperanceTutorial.vue';
import RiskGame from './components/RiskGame.vue';

export default {
  name: 'App',
  components:{PrudenceGame,PrudenceTutorial,TemperanceGame,TemperanceTutorial, RiskGame},
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
