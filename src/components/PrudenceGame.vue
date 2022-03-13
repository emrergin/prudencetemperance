<template>
      <div id="oyunKutusu">
        <ScoreTable 
        :totalRevenue="totalRevenue" 
        :totalLoss="totalLoss" 
        :totalRounds="totalRounds"
        :currentRound="currentRound"/>
        <div id="oyunAsagi">
          <img id="futbolTopu" src="../assets/soccer_ball.svg"/>
          <div id="buyukEtiketler">
              <div id="solBuyukEtiket" class="buyukEtiket etiket">+5</div>
              <div id="sagBuyukEtiket" class="buyukEtiket etiket">+9</div>
          </div>
          <img id="buyukBoru" src="../assets/buyukboru.svg"/>
          <div id="inputlar">
              <div id="inputKutusu1" class="droppable" > A</div>
              <div id="inputKutusu2" class="droppable"> B</div>
          </div>
          <div id="kucukBoru" ref="kucukBoru" @mousedown="boruTasi">
            <div id="kucukEtiketler">
                <div id="solKucukEtiket" class="kucukEtiket etiket">
                    {{convertNumbertoString(payOffs[currentRound][2])}}
                </div>
                <div id="sagKucukEtiket" class="kucukEtiket etiket">
                    {{convertNumbertoString(payOffs[currentRound][3])}}
                </div>
            </div>
              <img src="../assets/kucukboru.svg" class="draggable" oncontextmenu="return false" />
          </div>
          <button id="nextRound" class="invisible" onclick="siradakiTur()">
              Sıradaki Tur >>
          </button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            payOffs:[[9,6,2,-2],[9,6,1,-1],[9,6,4,-4],[14,9,3,-3],[7,4,2,-2]],
            totalRevenue:0,
            totalLoss:0,
            totalRounds:5,
            currentRound:0
        }
    },
    methods:{
        convertNumbertoString(number){
            return number>0? `+ `+number : `- `+Math.abs(number);
        },
        boruTasi(){
            
        }
    }
}
</script>

<style>
#oyunKutusu{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display:flex;
    flex-direction: column;   
    margin:15px; 
}
#oyunAsagi{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

#buyukEtiketler{
  position: absolute;
  display: flex;
  gap: 200px;
  top: 28px;
}

.buyukEtiket{
  border: 2px solid black;
  border-radius:8px;
  padding: 2px;
}

#kucukBoru{
  position: relative;
}
#kucukEtiketler{
  position: absolute;
  left: 30px;
  gap: 70px;
  display: flex;
  justify-content: space-between;
}

.kucukEtiket{
  border: 2px solid black;
  border-radius:8px;
  padding: 2px;
}

#inputlar{
    display:flex;
    width:100%;
    justify-content: center;
    gap: 106px;
}

.draggable{
    cursor:grab;
}

#inputKutusu1,#inputKutusu2{
    padding-top:12px;
    padding-bottom: 12px;
    width: 194px;
    text-align:center;
    font-size: 3em;
    font-weight: bold;
    border: 2px dashed turquoise;
}

#futbolTopu{
    cursor: pointer;
}

#nextRound{
  padding: 5px;
  font-size: 1.5em;
  margin-top: 50px;
}

.invisible{
  display: none;
}
</style>
