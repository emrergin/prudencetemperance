<template>
<div class="tutorialKutusu"   @click="nextStep">
    <div class="sutun1">
        <transition-group tag="div" name="tutorial" class="tutorialText">
            <p :key=5 v-if="step>0">
            Bu oyunda, 
            <span :style="{visibility: step>1? `visible` : `hidden`}"> küçük boruyu</span>
            <span :style="{visibility: step>2? `visible` : `hidden`}"> büyük borunun</span>
            <span :style="{visibility: step>3? `visible` : `hidden`}"> hangi ucuna</span>  
            <span :style="{visibility: step>4? `visible` : `hidden`}"> takacağınızı seçeceksiniz.</span>  
            </p> 
            <p :key=6 v-if="step>5">Farenizle küçük boruya tıklayın ve onu seçiminize sürükleyin.</p>
            <p :key=7 v-if="step>6">Top her bir kavşak noktasına geldiğinde yüzde elli ihtimalle sağa, yüzde elli ihtimalle sola gidecek.</p>
            <p :key=8 v-if="step>7">Boruların üzerindeki sayılar, top borunun o kısmından geçerse kazanacağınız ya da kaybedeceğiniz puanı göstermektedir.</p>
            <p :key=9 v-if="step>8">Her tur, topun hareketi bitince, kazandığınız puan genel puanınıza eklenir.</p>
            <div :key=10 v-if="step>9" class="centered">Hazırsanız başlayalım mı?</div> 
        </transition-group>
            <button class="stepButton" @click="$emit('end', true)" v-if="step>10">              
                Hazırım!
            </button>         

    </div>    

    <div class="sutun2" id="sut2" >
        <img id="futbolTopu" ref="futbolTopu" src="../assets/soccer_ball.svg" 
            oncontextmenu="return false" @click="hareket()"
            :style="{opacity: step>2? `1` : `0.5`}"  class="beliren"/>
        <div id="buyukEtiketler" :style="{opacity: step>2? `1` : `0.5`}"  class="beliren">
            <div id="solBuyukEtiket" class="buyukEtiket etiket">
                +7
            </div>
            <div id="sagBuyukEtiket" class="buyukEtiket etiket">
                +4
            </div>
        </div>
        <img id="buyukBoru" src="../assets/buyukboru.svg" class="beliren" 
        :class="[{kirmiziKenarli:step===3},{odakli:step>2},{odaksiz:step<=2} ]"/>
        <div id="inputlar">
            <div class="droppable beliren" id="i1" 
        :class="[{kirmiziKenarli:step===4},{odakli:step>3},{odaksiz:step<=3} ]"> A</div>
            <div class="droppable beliren" id="i2"
        :class="[{kirmiziKenarli:step===4},{odakli:step>3},{odaksiz:step<=3} ]"> B</div>
        </div>
        <div id="kucukBoru" ref="kucukBoru" 
        oncontextmenu="return false" @mousedown.left="boruTasi($event)" ondragstart="return false">
        <div id="kucukEtiketler" :style="{opacity: step>10? `1` : `0.5`}"  class="beliren">
            <div id="solKucukEtiket" class="kucukEtiket etiket">
                +2
            </div>
            <div id="sagKucukEtiket" class="kucukEtiket etiket">
                -2
            </div>
        </div >
            <img src="../assets/kucukboru.svg" class="draggable beliren" oncontextmenu="return false"            
            :class="[{kirmiziKenarli:step===2},{odakli:step>1},{odaksiz:step<=1}]"
            />
        </div>
    </div>
<div>{{step}}</div>
</div>
</template>
<script>

export default {
    data(){
        return{
            step:1
        }
    },
    methods:{
        nextStep(){
            if (this.step!==6){
                this.step++;
            }
        },
        boruTasi(e){
          if (this.step!==6){return false;}
          let kucukBoru=this.$refs.kucukBoru;
          var vm = this;
          kucukBoru.style.cursor="grabbing";
          const collection = document.getElementsByClassName("droppable");
          for (let i = 0; i < collection.length; i++) {
              collection[i].style.visibility = "visible";
          }
          let shiftX = e.clientX - kucukBoru.getBoundingClientRect().left;
          let shiftY = e.clientY - kucukBoru.getBoundingClientRect().top;
          
          kucukBoru.style.position = 'absolute';
          kucukBoru.style.zIndex = 3;
          document.getElementById(`app`).append(kucukBoru);

          moveAt(e.pageX, e.pageY);

          function moveAt(pageX, pageY) {
              kucukBoru.style.left = pageX - shiftX + 'px';
              kucukBoru.style.top = pageY - shiftY + 'px';
          }  

          function onMouseMove(event) {
              moveAt(event.pageX, event.pageY);

              kucukBoru.hidden = true;
              let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
              
              kucukBoru.hidden = false;

              if (!elemBelow) return;

              let droppableBelow = elemBelow.closest('.droppable');
              
              if (vm.currentDroppable != droppableBelow) {
                  
                  if (vm.currentDroppable) { // null when we were not over a droppable before this event
                  leaveDroppable(vm.currentDroppable);
              }
              vm.currentDroppable = droppableBelow;
              if (vm.currentDroppable) { // null if we're not coming over a droppable now
                  // (maybe just left the droppable)
                  enterDroppable(vm.currentDroppable);
              }
              }
          }            

          document.addEventListener('mousemove', onMouseMove);
          // kucukBoru.addEventListener('mouseup', onMouseUp());

          kucukBoru.onmouseup = function() {
              document.removeEventListener('mousemove', onMouseMove);
              kucukBoru.style.cursor="grab";                

              if (vm.currentDroppable){
                //   var rect = vm.currentDroppable.getBoundingClientRect();
                  vm.currentDroppable.style.background = '';
                //   vm.currentDroppable.className = '';
                //   vm.currentDroppable.innerHTML=``;
                  vm.currentDroppable.parentNode.insertBefore(kucukBoru,vm.currentDroppable);
                  vm.currentDroppable.remove();
                  kucukBoru.style.left = '0px';
                kucukBoru.style.top = '0px';
                  kucukBoru.style.position=`relative`;
                //   kucukBoru.style.left = `${rect.left  + window.scrollX}px`;
                //   kucukBoru.style.top = `${rect.top + window.scrollY}px`;    
                //  kucukBoru.offset(vm.currentDroppable.offset());   
                //   const collection = document.getElementsByClassName("droppable");
                //   for (let i = 0; i < collection.length; i++) {
                //       collection[i].style.visibility = "hidden";
                //   }
              }
              // kucukBoru.removeEventListener('mouseup', onMouseUp());
              kucukBoru.onmouseup = null;
          }
      function enterDroppable(elem) {
          elem.style.background = '#F0FFF0';
      }
      function leaveDroppable(elem) {
          elem.style.background = '';
      }          

      }
    }
}
</script>
<style>
.tutorialKutusu{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display:flex;
    margin:15px; 
    min-height: 440px;
    justify-content: space-between;
    padding: 20px;
    
}

.tutorial-enter-from{
    opacity: 0;
    transform: scale(0.6);
}

.tutorial-enter-to{
    opacity: 1;
    transform: scale(1);
}

.tutorial-enter-active{
    transition: all 0.5s ease;
}

.tutorialText{
    text-align:left;
    margin-right: auto;
}

.centered{
    text-align:center;    
}

.sutun1,.sutun2{
    display:flex;
    flex-direction: column;
    align-items: center;
}

.sutun1{
    width:66%;    
}

.sutun2{
    width:33%;    
    justify-content: flex-start;
    align-items:center;
    scale: 0.8;
}
.kirmiziKenarli{
    border: 10px solid red;
}

.odakli{
    opacity:1;
}

.odaksiz{
    opacity:0.5;
}

.beliren{
    transition: all 0.5s ease-in;
}
</style>

<style scoped>
    .centered{
        margin-top:30px;
        margin-bottom:-40px;
    }    
.droppable{
    flex-shrink: 0;
}
</style>
