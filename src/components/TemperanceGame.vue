<template>
    <div class="oyunKutusu" v-if="!oyunSonu">
        <ScoreTable 
            :totalRevenue="totalRevenue" 
            :totalLoss="totalLoss" 
            :totalRounds="totalRounds"
            :currentRound="currentRound"
        />
        <div id="oyunAsagi">
            <img id="futbolTopu" ref="futbolTopu" src="../assets/soccer_ball.svg" oncontextmenu="return false" @click="hareket()"/>
            <div id="buyukEtiketler">
                <div id="solBuyukEtiket" class="buyukEtiket etiket">
                    {{convertNumbertoString(payOffs[currentRound][0])}}
                </div>
                <div id="sagBuyukEtiket" class="buyukEtiket etiket">
                    {{convertNumbertoString(payOffs[currentRound][1])}}
                </div>
            </div>
            <img id="buyukBoru" src="../assets/buyukboru.svg"/>
            <div class="buyukInputlar">
                <div class="droppable2" id="i0" 
                :class="{gorulmez:secimler[0]}"> A</div>
                <div class="droppable2" id="i1" 
                :class="{gorulmez:secimler[1]}"> B</div>
            </div>
            <div class="buyukInputlar">
                <div class="droppable2" id="i2" 
                :class="{gorulmez:!secimler[0]||secimler[2]}"> C</div>
                <div class="droppable2" id="i3" 
                :class="{gorulmez:!secimler[1]||secimler[3]}"> D</div>
            </div>
            <div id="kucukBorular">
                <div id="kucukBoru1" class="temperanceBoru"
                oncontextmenu="return false" @mousedown.left="boruTasi($event)" ondragstart="return false">
                <div id="kucukEtiketler">
                    <div id="solKucukEtiket1" class="kucukEtiket etiket">
                        {{convertNumbertoString(payOffs[currentRound][2])}}
                    </div>
                    <div id="sagKucukEtiket1" class="kucukEtiket etiket">
                        {{convertNumbertoString(payOffs[currentRound][3])}}
                    </div>
                </div>
                <img src="../assets/kucukboru2.svg" class="draggable" oncontextmenu="return false" />
                </div>
                <div id="kucukBoru2" class="temperanceBoru"
            oncontextmenu="return false" @mousedown.left="boruTasi($event)" ondragstart="return false">
                <div id="kucukEtiketler">
                    <div id="solKucukEtiket2" class="kucukEtiket etiket">
                        {{convertNumbertoString(payOffs[currentRound][4])}}
                    </div>
                    <div id="sagKucukEtiket2" class="kucukEtiket etiket">
                        {{convertNumbertoString(payOffs[currentRound][5])}}
                    </div>
                </div>
                <img src="../assets/kucukboru2.svg" class="draggable" oncontextmenu="return false" />
                </div>                
            </div>

        </div>
    </div>
    <div>
        <p>{{secimler}}</p>
    </div>
</template>

<script>
import ScoreTable from './ScoreTable.vue'
export default {
    components: { ScoreTable},
    data(){
        return{
            payOffs:[[9,9,2,-2,3,-3],[9,9,1,-1,4,-4],[6,6,4,-4,1,-1],[14,14,3,-3,10,-10],[4,4,2,-2,1,-1]],
            totalRevenue:0,
            totalLoss:0,
            currentRound:0,
            totalRounds:5,
            currentDroppable:null,
            secimler:[null,null,null,null],
            asama: `baslangic`,
            oyunSonu:false
        }
    },
    methods:{
        convertNumbertoString(number){
            return number>0? `+`+number : `-`+Math.abs(number);
        },
        boruTasi(e){
            if (this.asama!==`baslangic`){return false;}
            var vm = this;
            let kucukBoru=e.target.closest(`.temperanceBoru`);
            let indeks=vm.secimler.findIndex(a=>a===kucukBoru.id.slice(9));
            if (indeks!==-1 && vm.secimler[indeks+2]){
                return false;
            }            
            
            kucukBoru.style.cursor="grabbing";
            vm.secimler[vm.secimler.findIndex(a=>a===kucukBoru.id.slice(9))]=null;

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

                let droppableBelow = elemBelow.closest('.droppable2');
                
                if (vm.currentDroppable != droppableBelow) {                  
                    if (vm.currentDroppable) { 
                        leaveDroppable(vm.currentDroppable);
                    }
                    vm.currentDroppable = droppableBelow;
                    if (vm.currentDroppable) { 
                        enterDroppable(vm.currentDroppable);
                    }
                }
            }            

            document.addEventListener('mousemove', onMouseMove);

            kucukBoru.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                kucukBoru.style.cursor="grab";                

                if (vm.currentDroppable){
                    var rect = vm.currentDroppable.getBoundingClientRect();
                    kucukBoru.style.left = `${rect.left  + window.scrollX}px`;
                    kucukBoru.style.top = `${rect.top + window.scrollY}px`;
                    vm.secimler[vm.currentDroppable.id.slice(1)]=kucukBoru.id.slice(9);
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
            if (this.secimler.filter(a=>a).length!==2){return}
            // let vm=this;
            this.asama=`tophareketi`;
            let futbolTopu=this.$refs.futbolTopu;
            futbolTopu.style.zIndex = 4;
            let fakeBall=futbolTopu.cloneNode(true);
            fakeBall.id=`fakeBall`;
            fakeBall.style.visibility = "hidden";            
            futbolTopu.after(fakeBall);
            futbolTopu.style.position="absolute";

            function Asagi(){
                futbolTopu.animate([
                    { transform:  `translate(0px,5px)`},
                    { transform:  `translate(0px,62px)`}
                    ],{
                        duration: 1000,
                        fill: `forwards`,
                        composite: `accumulate`
                    }).persist();
                setTimeout(Sol1, 1000);
            }

            function Sol1(){
                futbolTopu.animate([
                    { transform:  `translate(0px,0px) rotate(360deg)`,offset: 0},
                    { transform:  `translate(-120px,0px) rotate(0deg)`,offset: 0.4},
                    { transform:  `translate(-145px,12px) rotate(-75deg)`,offset: 0.6},
                    { transform:  `translate(-152.5px,48px) rotate(-82.5deg)`,offset: 0.8},
                    { transform:  `translate(-152.5px,93px) rotate(-82.5deg)`,offset: 1}
                    ],{
                        duration: 3000,
                        fill: `forwards`,
                        composite: `accumulate`
                    }).persist();
            }

            Asagi();







            // let zar= Math.floor(Math.random() * 100);


        // futbolTopu.onanimationend = () => {
        // this.asama=`roundsonu`;
        // this.kazancGuncelle(durum);
        // };
          
        },
        hareketBittiMi(){
            let rect = this.$refs.futbolTopu.getBoundingClientRect();
            let elemBelow = document.elementFromPoint((rect.left+rect.right)/2,rect.top-5);
            return !elemBelow.closest(`.temperanceBoru,#buyukBoru`);
        }
    }
}
</script>

<style>
.buyukInputlar{
    display:flex;
    width:100%;
    justify-content: center;
    gap: 105px;
    min-height: 167.5px;
}

#kucukBorular{
    display:flex;
    justify-content: space-evenly;
    gap: 64px;
    min-height: 167.5px;
}

.temperanceBoru{
    height:167.5px;
}

.droppable2{
    padding-top:12px;
    padding-bottom: 12px;
    width: 197px;
    height: 167.5px;
    font-size: 3em;
    font-weight: bold;
    border: 2px dashed turquoise;
    align-items: center;
    justify-content:center;
    display:flex;
}

.gorulmez{
    visibility: hidden;
}

</style>
