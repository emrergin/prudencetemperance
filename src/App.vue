<template>
  <PrudenceTutorial v-if="currentPhase===`pruTut`" @end="currentPhase=`pruGam`" />
  <PrudenceGame v-if="currentPhase===`pruGam`" @end="currentPhase=`temGam`" />
  <TemperanceGame v-if="currentPhase===`temGam`"  />
</template>

<script>
import PrudenceGame from './components/PrudenceGame.vue';
import PrudenceTutorial from './components/PrudenceTutorial.vue';
import TemperanceGame from './components/TemperanceGame.vue';
export default {
  name: 'App',
  components:{PrudenceGame,PrudenceTutorial,TemperanceGame},
  data(){
        return{
            currentPhase:`temGam`
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
