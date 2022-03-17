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
            <p :key=6 v-if="step>5">Küçük boruya tıklayın ve onu seçtiğiniz yere sürükleyin.</p>
            <p :key=7 v-if="step>7">Şimdi, topa tıklayın.</p>
            <!-- Top her bir kavşak noktasına geldiğinde yüzde elli ihtimalle sağa, yüzde elli ihtimalle sola gidecek. -->
            <p :key=8 v-if="step>8">Topun izlediği yol üzerindeki sayılar kazanacağınız ya da kaybedeceğiniz puanı göstermektedir.</p>
            <p :key=9 v-if="step>9">Bu örnek turda {{odenek[durum-1].length===1? odenek[durum-1][0] :`${odenek[durum-1][0]}${odenek[durum-1][1]}=${odenek[durum-1][2]}`}} 
            puan kazandınız. Her tur puanınız böyle belirlenecek.</p>
            <div :key=10 v-if="step>10" class="centered">Hazırsanız başlayalım mı?</div> 
        </transition-group>
            <button class="stepButton" @click="$emit('end', true)" v-if="step>11">              
                Hazırım!
            </button>         

    </div>    

    <div class="sutun2" id="sut2" >
        <img id="futbolTopu" ref="futbolTopu" src="../assets/soccer_ball.svg" 
            oncontextmenu="return false" @click="hareket()" class="beliren"
            :class="[{kirmiziKenarli:step===7},{odakli:step>6},{odaksiz:step<=6} ]"/>
        <div id="buyukEtiketler" class="beliren"
        :class="[{kirmiziKenarli:step===9},{odakli:step>8},{odaksiz:step<=8} ]">
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
        <div id="kucukEtiketler" class="beliren"
        :class="[{kirmiziKenarli:step===9},{odakli:step>8},{odaksiz:step<=8} ]">
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
<div>{{step}}-{{secim}}</div>
</div>
</template>
<script>

export default {
    data(){
        return{
            step:1,
            secim:null,
            durum:null,
            odenek: [[4,-2,2],[4,`+2`,6],[4],[7,`+2`,9],[7,-2,5],[7]]
        }
    },
    methods:{
        nextStep(){
            if (this.step!==6 && this.step!==8){
                this.step++;
            }
        },
        boruTasi(e){
          if (this.step!==6){return false;}
          let kucukBoru=this.$refs.kucukBoru;
          var vm = this;
          kucukBoru.style.cursor="grabbing";

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

          kucukBoru.onmouseup = function() {
              document.removeEventListener('mousemove', onMouseMove);
              kucukBoru.style.cursor="grab";                

              if (vm.currentDroppable){
                vm.currentDroppable.style.background = '';
                vm.currentDroppable.parentNode.insertBefore(kucukBoru,vm.currentDroppable);
                vm.secim=vm.currentDroppable.id.slice(1);
                vm.currentDroppable.remove();
                kucukBoru.style.left = '0px';
                kucukBoru.style.top = '0px';
                kucukBoru.style.position=`relative` ; 
                const collection = document.getElementsByClassName("droppable");
                for (let i = 0; i < collection.length; i++) {
                    collection[i].style.visibility = "hidden";
                }
                vm.step++;
              }
              kucukBoru.onmouseup = null;
          }
      function enterDroppable(elem) {
          elem.style.background = '#F0FFF0';
      }
      function leaveDroppable(elem) {
          elem.style.background = '';
      }          

        },
        hareket(){
          if (!this.secim || !(this.step===8)){return}
          this.asama=`tophareketi`;
          let futbolTopu=this.$refs.futbolTopu;
          futbolTopu.style.zIndex = 4;
          let fakeBall=futbolTopu.cloneNode(true);
          fakeBall.id=`fakeBall`;
          fakeBall.style.visibility = "hidden";

          let zar= Math.floor(Math.random() * 100);
          futbolTopu.after(fakeBall);
          futbolTopu.style.position="absolute";
          if (this.secim===`2`){
            if(zar>75){
              futbolTopu.classList.add(`asagiHareketli1P`);
              this.durum=1;
              setTimeout(sagBEtiket, 2100);
              setTimeout(sagKEtiket, 3650);
            }else if(zar>50){
              futbolTopu.classList.add(`asagiHareketli2P`);
              this.durum=2;
              setTimeout(sagBEtiket, 2100);
              setTimeout(solKEtiket, 3650);
            }else{
              futbolTopu.classList.add(`asagiHareketli6P`);
              this.durum=6;
              setTimeout(solBEtiket, 2100);
            }
          }
          if (this.secim===`1`){
            if(zar>75){
              futbolTopu.classList.add(`asagiHareketli4P`);
              this.durum=4;
              setTimeout(solBEtiket, 2100);
              setTimeout(solKEtiket, 3650);
            }else if(zar>50){
              futbolTopu.classList.add(`asagiHareketli5P`);
              this.durum=5;
              setTimeout(solBEtiket, 2100);
              setTimeout(sagKEtiket, 3650);
            }else{
              futbolTopu.classList.add(`asagiHareketli3P`);
              this.durum=3;
              setTimeout(sagBEtiket, 2100);
            }
          }
      futbolTopu.onanimationend = () => {
          this.step++;
      };

      function solBEtiket(){
      document.getElementById(`solBuyukEtiket`).classList.add(`yaklasilmis`);
      }
      function sagBEtiket(){
      document.getElementById(`sagBuyukEtiket`).classList.add(`yaklasilmis`);
      }
      function solKEtiket(){
      document.getElementById(`solKucukEtiket`).classList.add(`yaklasilmis`);
      }
      function sagKEtiket(){
      document.getElementById(`sagKucukEtiket`).classList.add(`yaklasilmis`);
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

@keyframes PTtoDown0 {
    0%  { transform:  translate(0px,5px) rotate(0deg);}
  100% { transform:  translate(0px,62px) rotate(0deg);}
}
@keyframes PTtoDown1 {
  0%  { transform:  translate(0px,5px) rotate(0deg);}
  14% { transform:  translate(0px,62px) rotate(0deg);}
  42% { transform:  translate(120px,62px) rotate(360deg);}
  49% { transform:  translate(145px,78px) rotate(432deg) ;}
  56% { transform:  translate(152.5px,110px) rotate(454.5deg); }
  70% { transform:  translate(152.5px,155px) rotate(454.5deg);}
  84% { transform:  translate(212.5px,155px) rotate(634.5deg);}
  96% { transform:  translate(230px,200px) rotate(732deg); }
  100% {transform:  translate(230px,220px) rotate(732deg); }
}

@keyframes PTtoDown2 {
  0%  { transform:  translate(0px,5px) rotate(0deg);}
  14% { transform:  translate(0px,62px) rotate(0deg);}
  42% { transform:  translate(120px,62px) rotate(360deg);}
  49% { transform:  translate(145px,78px) rotate(432deg) ;}
  56% { transform:  translate(152.5px,110px) rotate(454.5deg); }
  70% { transform:  translate(152.5px,155px) rotate(454.5deg);}
  84% { transform:  translate(92.5px,155px) rotate(274.5deg);}
  96% { transform:  translate(75px,200px) rotate(327deg); }
  100% {transform:  translate(75px,220px) rotate(327deg); }
}

@keyframes PTtoDown3 {
  0%   { transform: translate(0px,5px) rotate(0deg) ; }
  20% { transform: translate(0px,62px) rotate(0deg) ;}
  60% { transform: translate(120px,62px) rotate(360deg) ; }
  70% { transform: translate(145px,78px) rotate(432deg) ; }
  80% { transform: translate(152.5px,110px) rotate(454.5deg) ;}
  100% { transform: translate(152.5px,155px) rotate(454.5deg) ; }
}

@keyframes PTtoDown4 {
  0%  { transform:  translate(0px,5px) rotate(360deg);}
  14% { transform:  translate(0px,62px) rotate(360deg);}
  42% { transform:  translate(-120px,62px) rotate(0deg);}
  49% { transform:  translate(-145px,78px) rotate(-75deg) ;}
  56% { transform:  translate(-152.5px,110px) rotate(-82.5deg); }
  70% { transform:  translate(-152.5px,155px) rotate(-82.5deg);}
  84% { transform:  translate(-212.5px,155px) rotate(-262.5deg);}
  96% { transform:  translate(-230px,200px) rotate(-315deg); }
  100% {transform:  translate(-230px,220px) rotate(-315deg); }
}

@keyframes PTtoDown5 {
  0%  { transform:  translate(0px,5px) rotate(360deg);}
  14% { transform:  translate(0px,62px) rotate(360deg);}
  42% { transform:  translate(-120px,62px) rotate(0deg);}
  49% { transform:  translate(-145px,78px) rotate(-75deg) ;}
  56% { transform:  translate(-152.5px,110px) rotate(-82.5deg); }
  70% { transform:  translate(-152.5px,155px) rotate(-82.5deg);}
  84% { transform:  translate(-92.5px,155px) rotate(97.5deg);}
  96% { transform:  translate(-75px,200px) rotate(150deg); }
  100% {transform:  translate(-75px,220px) rotate(150deg); }
}

@keyframes PTtoDown6 {
   0% { transform:  translate(0px,5px) rotate(360deg); }
  20% { transform: translate(0px,62px) rotate(360deg);}
  60% { transform: translate(-120px,62px) rotate(0deg); }
  70% { transform: translate(-145px,78px) rotate(-75deg); }
  80% { transform: translate(-152.5px,110px) rotate(-82.5deg);}
  100% { transform: translate(-152.5px,155px) rotate(-82.5deg); }
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

#inputlar{
    gap: 109px;
}
</style>
