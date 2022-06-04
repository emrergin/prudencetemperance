<template>
  <div class="tutorialKutusu">
    <div class="column1" v-if="isTurkish">
      <transition-group tag="div" name="tutorial" class="tutorialText">
        <p :key="1" v-if="step > 0">
          Bu oyunda,
          <span :style="{ visibility: step > 1 ? `visible` : `hidden` }">
            alttaki borulardan hangisini</span
          >
          <span :style="{ visibility: step > 2 ? `visible` : `hidden` }">
            işaretli yere
          </span>
          <span :style="{ visibility: step > 3 ? `visible` : `hidden` }">
            yerleştireceğinizi seçeceksiniz.</span
          >
        </p>
        <p :key="2" v-if="step > 4">
          Seçtiğiniz boruyu verilen yere sürükleyin.
        </p>
        <p :key="4" v-if="step > 5">Şimdi, topa tıklayın.</p>

        <p :key="8" v-if="step > 6">
          Top bunun gibi yol ayrımlarında <b>yüzde elli ihtimalle</b> sağa,
          <b>yüzde elli ihtimalle</b> sola gidecek.
        </p>

        <p :key="9" v-if="step > 9">
          Topun izlediği yol üzerindeki sayılar kazanacağınız ya da
          kaybedeceğiniz puanı göstermektedir.
        </p>

        <p :key="10" v-if="step > 10">
          Bu örnek turda {{ ciktiHesapla() }} puan kazandınız. Her tur puanınız
          böyle belirlenecek.
        </p>

        <div :key="11" v-if="step > 11" class="centered">
          Hazırsanız başlayalım mı?
        </div>
        <div :key="12" class="centered" v-if="step > 12">
          <button @click="$emit('end', true)" class="stepButton">
            Hazırım!
          </button>
        </div>
      </transition-group>
    </div>
    <div class="column1" v-else>
      <transition-group tag="div" name="tutorial" class="tutorialText">
        <p :key="1" v-if="step > 0">
          In this game you will pick
          <span :style="{ visibility: step > 1 ? `visible` : `hidden` }">
            one of these pipes</span
          >
          <span :style="{ visibility: step > 2 ? `visible` : `hidden` }">
            to place here
          </span>
          <span :style="{ visibility: step > 3 ? `visible` : `hidden` }">
            as you want.</span
          >
        </p>
        <p :key="2" v-if="step > 4">
          Drag the pipe you picked to underneath the upper pipe.
        </p>
        <p :key="4" v-if="step > 5">Now, click the ball.</p>

        <p :key="8" v-if="step > 6">
          When the pipe forks like this, the ball will either go to the left or
          to the right, with a <b>fifty percent</b>
          probability of each.
        </p>

        <p :key="9" v-if="step > 9">
          The numbers across the path the ball follows shows the points you gain
          or you lose.
        </p>

        <p :key="10" v-if="step > 10">
          In this sample turn, you gained {{ ciktiHesapla() }} points. Each turn
          your point will be calculated likewise.
        </p>

        <div :key="11" v-if="step > 11" class="centered">
          Shall we start if you are ready?
        </div>
        <div :key="12" class="centered" v-if="step > 12">
          <button @click="$emit('end', true)" class="stepButton">
            I am ready!
          </button>
        </div>
      </transition-group>
    </div>

    <div class="column2" id="sut2">
      <div
        id="futbolTopu"
        ref="futbolTopu"
        oncontextmenu="return false"
        @click="hareket()"
        class="phaseIn"
        :class="[
          { kirmiziKenarli: step === 6 },
          { odakli: step > 5 },
          { odaksiz: step <= 5 },
        ]"
      >
        <div
          :class="[{ gorunur: step === 7 }, { gorunmez: step !== 7 }]"
          class="phaseIn kirmiziOklar"
        >
          <div>◄</div>
          <div>►</div>
        </div>
        <img src="../assets/soccer_ball.svg" style="align-self: flex-end" />
      </div>

      <img
        id="girisBoru"
        src="../assets/kucukboru3.svg"
        class="phaseIn"
        :class="[{ odakli: step > 2 }, { odaksiz: step <= 2 }]"
      />
      <div class="inputlar">
        <div
          class="droppable phaseIn"
          id="i1"
          :class="[
            { kirmiziKenarli: step === 3 },
            { odakli: step > 2 },
            { odaksiz: step <= 2 },
          ]"
          :style="{ visibility: !secim ? `visible` : `hidden` }"
        >
          A
        </div>
      </div>

      <div id="kucukBorular" class="gorunur" :class="[{ gorulmez: step >= 6 }]">
        <div
          id="kucukBoru1"
          oncontextmenu="return false"
          @mousedown.left="boruTasi($event)"
          ondragstart="return false"
          class="riskBoru"
        >
          <div
            id="kucukEtiketler1"
            class="phaseIn"
            :class="[
              { kirmiziKenarli: step === 10 },
              { odakli: step > 9 },
              { odaksiz: step <= 9 },
            ]"
          >
            <div id="solKucukEtiket1" class="kucukEtiket etiket">+3</div>
            <div id="sagKucukEtiket1" class="kucukEtiket etiket">+14</div>
          </div>
          <img
            src="../assets/kucukboru.svg"
            class="draggable phaseIn"
            oncontextmenu="return false"
            :class="[
              { kirmiziKenarli: step === 2 },
              { odakli: step > 1 },
              { odaksiz: step <= 1 },
            ]"
          />
        </div>
        <div
          id="kucukBoru2"
          oncontextmenu="return false"
          @mousedown.left="boruTasi($event)"
          ondragstart="return false"
          class="riskBoru"
        >
          <div
            id="kucukEtiketler2"
            class="phaseIn"
            :class="[
              { kirmiziKenarli: step === 10 },
              { odakli: step > 9 },
              { odaksiz: step <= 9 },
            ]"
          >
            <div id="solKucukEtiket2" class="kucukEtiket etiket">+10</div>
            <div id="sagKucukEtiket2" class="kucukEtiket etiket">+7</div>
          </div>
          <img
            src="../assets/kucukboru.svg"
            class="draggable phaseIn"
            oncontextmenu="return false"
            :class="[
              { kirmiziKenarli: step === 2 },
              { odakli: step > 1 },
              { odaksiz: step <= 1 },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      secim: null,
      currentDroppable: null,
    };
  },
  props: ["isTurkish"],
  emits: ["end"],
  mounted: function () {
    window.addEventListener("click", this.nextStep);
  },
  beforeUnmount() {
    document.querySelectorAll(".riskBoru").forEach((e) => e.remove());
    window.removeEventListener("click", this.nextStep);
  },
  methods: {
    nextStep() {
      if (
        this.step !== 5 &&
        this.step !== 6 &&
        this.step !== 8 &&
        this.step !== 8 &&
        this.step !== 9
      ) {
        this.step++;
      }
      if (this.step === 8) {
        this.hareket2();
      }
    },
    boruTasi(e) {
      if (this.step !== 5) {
        return false;
      }
      let kucukBoru = e.target.closest(`.riskBoru`);
      var vm = this;

      kucukBoru.style.cursor = "grabbing";
      if (this.secim === kucukBoru.id.slice(9)) {
        this.secim = null;
      }

      let shiftX = e.clientX - kucukBoru.getBoundingClientRect().left;
      let shiftY = e.clientY - kucukBoru.getBoundingClientRect().top;

      if (!document.getElementById(`fakeBoru`)) {
        var fakeBoru = kucukBoru.cloneNode(true);
        fakeBoru.id = `fakeBoru`;
        fakeBoru.style.visibility = "hidden";
        kucukBoru.after(fakeBoru);
      }

      kucukBoru.style.position = "absolute";
      kucukBoru.style.zIndex = 3;
      document.getElementById(`app`).append(kucukBoru);

      moveAt(e.pageX, e.pageY);

      function moveAt(pageX, pageY) {
        kucukBoru.style.left = pageX - shiftX + "px";
        kucukBoru.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        kucukBoru.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        kucukBoru.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest(".droppable");

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

      document.addEventListener("mousemove", onMouseMove);

      kucukBoru.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        kucukBoru.style.cursor = "grab";

        if (vm.currentDroppable) {
          vm.currentDroppable.parentNode.insertBefore(
            kucukBoru,
            vm.currentDroppable
          );
          vm.secim = kucukBoru.id.slice(9);
          vm.currentDroppable.remove();
          kucukBoru.style.left = "0px";
          kucukBoru.style.top = "0px";
          kucukBoru.style.position = `relative`;
          vm.step++;
        }
        kucukBoru.onmouseup = null;
      };
      function enterDroppable(elem) {
        elem.style.background = "#F0FFF0";
      }
      function leaveDroppable(elem) {
        elem.style.background = "";
      }
    },
    hareket() {
      if (!this.secim) {
        return;
      }
      if (this.step !== 6) {
        return;
      }
      if (document.querySelector("#app> .riskBoru")) {
        document.querySelector("#app> .riskBoru").remove();
      }

      let vm = this;
      let futbolTopu = this.$refs.futbolTopu;
      futbolTopu.style.zIndex = 4;
      futbolTopu.classList.remove(`kirmiziKenarli`);
      let fakeBall = futbolTopu.cloneNode(true);
      fakeBall.id = `fakeBall`;
      fakeBall.style.visibility = "hidden";
      futbolTopu.after(fakeBall);
      futbolTopu.style.position = "absolute";

      Asagi();

      function Asagi() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,5px)` },
              { transform: `translate(0px,156px)` },
            ],
            {
              duration: 2000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(() => {
          vm.step++;
        }, 2000);
      }
    },
    hareket2() {
      let futbolTopu = this.$refs.futbolTopu;
      let vm = this;
      this.step++;
      let zar = Math.floor(Math.random() * 2) + 1;
      zar === 1 ? Sol() : Sag();
      let ilgiliEtiket = ``;
      ilgiliEtiket = zar === 1 ? `solKucukEtiket` : `sagKucukEtiket`;
      ilgiliEtiket += vm.secim;
      setTimeout(() => {
        kucukEtiketler(ilgiliEtiket);
      }, 400);
      function Sol() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              {
                transform: `translate(-40px,0px) rotate(-120deg)`,
                offset: 0.25,
              },
              {
                transform: `translate(-70px,15px) rotate(-210deg)`,
                offset: 0.5,
              },
              {
                transform: `translate(-75px,35px) rotate(-225deg)`,
                offset: 0.75,
              },
              { transform: `translate(-75px,70px) rotate(-225deg)`, offset: 1 },
            ],
            {
              duration: 2000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(() => {
          vm.step++;
        }, 2000);
      }
      function Sag() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              { transform: `translate(40px,0px) rotate(120deg)`, offset: 0.25 },
              { transform: `translate(70px,15px) rotate(210deg)`, offset: 0.5 },
              {
                transform: `translate(75px,35px) rotate(225deg)`,
                offset: 0.75,
              },
              { transform: `translate(75px,70px) rotate(225deg)`, offset: 1 },
            ],
            {
              duration: 2000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(() => {
          vm.step++;
        }, 2000);
      }

      function kucukEtiketler(idtext) {
        document.getElementById(idtext).classList.add(`yaklasilmis`);
      }
    },
    ciktiHesapla() {
      const collection = document.getElementsByClassName("yaklasilmis");
      return +collection[0].textContent;
    },
  },
};
</script>

<style scoped>
#futbolTopu,
#fakeBall {
  display: flex;
  align-items: flex-end;
  position: relative;
}

.stepButton {
  display: block;
}

.kirmiziKenarli {
  border: 10px solid red;
}

.gorunmez {
  display: none !important;
}

#kucukBorular {
  min-width: 458px;
}
</style>
