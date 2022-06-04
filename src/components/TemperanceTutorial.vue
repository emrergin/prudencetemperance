<template>
  <div class="tutorialKutusu">
    <div class="column1" v-if="isTurkish">
      <transition-group tag="div" name="tutorial" class="tutorialText">
        <p :key="1" v-if="step > 0">
          Bu oyunda,
          <span :style="{ visibility: step > 1 ? `visible` : `hidden` }">
            alttaki boruları</span
          >
          <span :style="{ visibility: step > 2 ? `visible` : `hidden` }">
            nerelere yerleştireceğinizi</span
          >
          <span :style="{ visibility: step > 3 ? `visible` : `hidden` }">
            seçeceksiniz.</span
          >
        </p>
        <p :key="2" v-if="step > 4">
          Alttaki borulardan birine tıklayın ve onu seçtiğiniz yere sürükleyin.
        </p>
        <p :key="3" v-if="step > 5">
          Şimdi diğer boruyu {{ remainingPlaces }}'ye yerleştirin.
        </p>
        <p :key="4" v-if="step > 6">Şimdi, topa tıklayın.</p>

        <p :key="8" v-if="step > 7">
          Top bunun gibi yol ayrımlarında <b>yüzde elli ihtimalle</b> sağa,
          <b>yüzde elli ihtimalle</b> sola gidecek.
        </p>

        <p :key="9" v-if="step > 10">
          Topun izlediği yol üzerindeki sayılar kazanacağınız ya da
          kaybedeceğiniz puanı göstermektedir.
        </p>

        <p :key="10" v-if="step > 11">
          Bu örnek turda {{ ciktiHesapla() }} puan kazandınız. Her tur puanınız
          böyle belirlenecek.
        </p>

        <div :key="11" v-if="step > 12" class="centered">
          Hazırsanız başlayalım mı?
        </div>
        <div :key="12" class="centered" v-if="step > 13">
          <button @click="$emit('end', true)" class="stepButton">
            Hazırım!
          </button>
        </div>
      </transition-group>
    </div>

    <div class="column1" v-else>
      <transition-group tag="div" name="tutorial" class="tutorialText">
        <p :key="1" v-if="step > 0">
          In this game, you will place
          <span :style="{ visibility: step > 1 ? `visible` : `hidden` }">
            these pipes</span
          >
          <span :style="{ visibility: step > 2 ? `visible` : `hidden` }">
            to these places</span
          >
          <span :style="{ visibility: step > 3 ? `visible` : `hidden` }">
            as you want.</span
          >
        </p>
        <p :key="2" v-if="step > 4">
          Click one of the below pipes and drag it to a place you select.
        </p>
        <p :key="3" v-if="step > 5">
          Now, place the other pipe to {{ remainingPlaces }}.
        </p>
        <p :key="4" v-if="step > 6">Now, click the ball.</p>

        <p :key="8" v-if="step > 7">
          When the pipe forks like this, the ball will either go to the left or
          to the right, with a <b>fifty percent</b>
          probability of each.
        </p>

        <p :key="9" v-if="step > 10">
          The numbers across the path the ball follows shows the points you gain
          or you lose.
        </p>

        <p :key="10" v-if="step > 11">
          In this sample turn, you gained {{ ciktiHesapla() }} points. Each turn
          your point will be calculated likewise.
        </p>

        <div :key="11" v-if="step > 12" class="centered">
          Shall we start if you are ready?
        </div>
        <div :key="12" class="centered" v-if="step > 13">
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
          { kirmiziKenarli: step === 7 },
          { odakli: step > 6 },
          { odaksiz: step <= 6 },
        ]"
      >
        <div
          :class="[{ gorunur: step === 8 }, { gorunmez: step !== 8 }]"
          class="phaseIn kirmiziOklar"
        >
          <div>◄</div>
          <div>►</div>
        </div>
        <img src="../assets/soccer_ball.svg" style="align-self: flex-end" />
      </div>
      <div
        id="buyukBoru"
        src="../assets/buyukboru.svg"
        class="phaseIn"
        :class="[{ odakli: step > 2 }, { odaksiz: step <= 2 }]"
      >
        <div
          id="largeTags"
          class="phaseIn"
          :class="[
            { kirmiziKenarli: step === 11 },
            { odakli: step > 10 },
            { odaksiz: step <= 10 },
          ]"
        >
          <div id="leftLargeTag" class="buyukEtiket etiket">+9</div>
          <div id="rightLargeTag" class="buyukEtiket etiket">+9</div>
        </div>
        <img src="../assets/buyukboru.svg" />
      </div>
      <div class="buyukInputlar">
        <div
          class="droppable2 phaseIn"
          id="i0"
          :class="[
            { kirmiziKenarli: step === 3 },
            { odakli: step > 2 },
            { odaksiz: step <= 2 },
            { gorulmez: secimler[0] },
          ]"
        >
          A
        </div>
        <div
          class="droppable2 phaseIn"
          id="i1"
          :class="[
            { kirmiziKenarli: step === 3 },
            { odakli: step > 2 },
            { odaksiz: step <= 2 },
            { gorulmez: secimler[1] },
          ]"
        >
          B
        </div>
      </div>
      <div class="buyukInputlar">
        <div
          class="droppable2 phaseIn"
          id="i2"
          :class="[
            { kirmiziKenarli: step === 3 },
            { odakli: step > 2 },
            { odaksiz: step <= 2 },
            { gorulmez: (!secimler[0] || secimler[2]) && step !== 3 },
          ]"
        >
          C
        </div>
        <div
          class="droppable2 phaseIn"
          id="i3"
          :class="[
            { kirmiziKenarli: step === 3 },
            { odakli: step > 2 },
            { odaksiz: step <= 2 },
            { gorulmez: (!secimler[1] || secimler[3]) && step !== 3 },
          ]"
        >
          D
        </div>
      </div>
      <div id="kucukBorular">
        <div
          id="kucukBoru1"
          oncontextmenu="return false"
          @mousedown.left="boruTasi($event)"
          ondragstart="return false"
          class="temperanceBoru"
        >
          <div
            id="kucukEtiketler1"
            class="phaseIn"
            :class="[
              { kirmiziKenarli: step === 11 },
              { odakli: step > 10 },
              { odaksiz: step <= 10 },
            ]"
          >
            <div id="solKucukEtiket1" class="kucukEtiket etiket">+2</div>
            <div id="sagKucukEtiket1" class="kucukEtiket etiket">-2</div>
          </div>
          <img
            src="../assets/kucukboru2.svg"
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
          class="temperanceBoru"
        >
          <div
            id="kucukEtiketler2"
            class="phaseIn"
            :class="[
              { kirmiziKenarli: step === 11 },
              { odakli: step > 10 },
              { odaksiz: step <= 10 },
            ]"
          >
            <div id="solKucukEtiket2" class="kucukEtiket etiket">+3</div>
            <div id="sagKucukEtiket2" class="kucukEtiket etiket">-3</div>
          </div>
          <img
            src="../assets/kucukboru2.svg"
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
      secimler: [null, null, null, null],
      zarlar: [],
      currentDroppable: null,
      remainingPlaces: ``,
    };
  },
  emits: ["end"],
  props: ["isTurkish"],
  mounted: function () {
    window.addEventListener("click", this.nextStep);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.nextStep);
  },
  methods: {
    nextStep() {
      if (
        this.step !== 5 &&
        this.step !== 6 &&
        this.step !== 7 &&
        this.step !== 9 &&
        this.step !== 10
      ) {
        this.step++;
      }
      if (this.step === 9) {
        this.hareket2();
      }
    },
    boruTasi(e) {
      if (this.step !== 5 && this.step !== 6) {
        return false;
      }
      var vm = this;
      let kucukBoru = e.target.closest(`.temperanceBoru`);
      let indeks = vm.secimler.findIndex((a) => a === kucukBoru.id.slice(9));
      if (indeks !== -1) {
        return false;
      }

      kucukBoru.style.cursor = "grabbing";
      vm.secimler[vm.secimler.findIndex((a) => a === kucukBoru.id.slice(9))] =
        null;

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

        let droppableBelow = elemBelow.closest(".droppable2");

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
          vm.secimler[vm.currentDroppable.id.slice(1)] = kucukBoru.id.slice(9);
          vm.currentDroppable.remove();
          kucukBoru.style.left = "0px";
          kucukBoru.style.top = "0px";
          kucukBoru.style.position = `relative`;
          vm.step++;

          if (vm.remainingPlaces === ``) {
            if (vm.isTurkish) {
              if (vm.secimler[1]) {
                vm.remainingPlaces = "A'ya veya D";
              } else {
                vm.remainingPlaces = "C'ye veya B";
              }
            } else {
              if (vm.secimler[1]) {
                vm.remainingPlaces = "A or D";
              } else {
                vm.remainingPlaces = "C or B";
              }
            }
          }
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
      if (this.secimler.filter((a) => a).length !== 2) {
        return;
      }
      if (this.step !== 7) {
        return;
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
              { transform: `translate(0px,62px)` },
            ],
            {
              duration: 1000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(() => {
          vm.step++;
        }, 1000);
      }
    },
    hareket2() {
      let vm = this;
      this.step++;
      let futbolTopu = this.$refs.futbolTopu;
      let zar = Math.floor(Math.random() * 2) + 1;
      zar === 1 ? Sol1() : Sag1();
      zar === 1 ? setTimeout(solBEtiket, 1100) : setTimeout(sagBEtiket, 1100);
      vm.zarlar.push(zar);
      function Sol1() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(360deg)`, offset: 0 },
              { transform: `translate(-120px,0px) rotate(0deg)`, offset: 0.5 },
              {
                transform: `translate(-145px,12px) rotate(-75deg)`,
                offset: 0.625,
              },
              {
                transform: `translate(-152.5px,48px) rotate(-82.5deg)`,
                offset: 0.75,
              },
              {
                transform: `translate(-152.5px,93px) rotate(-82.5deg)`,
                offset: 1,
              },
            ],
            {
              duration: 3000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(animasyonDevamEt, 3000);
      }
      function Sag1() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              { transform: `translate(120px,0px) rotate(360deg)`, offset: 0.5 },
              {
                transform: `translate(145px,12px) rotate(432deg)`,
                offset: 0.625,
              },
              {
                transform: `translate(152.5px,48px) rotate(454.5deg)`,
                offset: 0.75,
              },
              {
                transform: `translate(152.5px,93px) rotate(454.5deg)`,
                offset: 1,
              },
            ],
            {
              duration: 3000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(animasyonDevamEt, 3000);
      }
      function Sol2() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              {
                transform: `translate(-40px,0px) rotate(-120deg)`,
                offset: 0.125,
              },
              {
                transform: `translate(-70px,15px) rotate(-210deg)`,
                offset: 0.25,
              },
              {
                transform: `translate(-75px,35px) rotate(-225deg)`,
                offset: 0.375,
              },
              {
                transform: `translate(-70px,63px) rotate(-210deg)`,
                offset: 0.5,
              },
              {
                transform: `translate(-40px,76px) rotate(-120deg)`,
                offset: 0.625,
              },
              { transform: `translate(0px,90px) rotate(0deg)`, offset: 0.75 },
              { transform: `translate(0px,166px) rotate(0deg)`, offset: 1 },
            ],
            {
              duration: 4000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(animasyonDevamEt, 4000);
      }
      function Sag2() {
        futbolTopu
          .animate(
            [
              { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
              {
                transform: `translate(40px,0px) rotate(120deg)`,
                offset: 0.125,
              },
              {
                transform: `translate(70px,15px) rotate(210deg)`,
                offset: 0.25,
              },
              {
                transform: `translate(75px,35px) rotate(225deg)`,
                offset: 0.375,
              },
              { transform: `translate(70px,63px) rotate(210deg)`, offset: 0.5 },
              {
                transform: `translate(40px,76px) rotate(120deg)`,
                offset: 0.625,
              },
              { transform: `translate(0px,90px) rotate(0deg)`, offset: 0.75 },
              { transform: `translate(0px,166px) rotate(0deg)`, offset: 1 },
            ],
            {
              duration: 4000,
              fill: `forwards`,
              composite: `accumulate`,
            }
          )
          .persist();
        setTimeout(animasyonDevamEt, 4000);
      }
      function animasyonDevamEt() {
        if (vm.hareketBittiMi()) {
          vm.step++;
          // vm.kazancMetin=vm.ciktiHesapla();
        } else {
          let zar = Math.floor(Math.random() * 2) + 1;
          let ilgiliKucukBoru =
            vm.zarlar.length === 1
              ? vm.secimler[vm.zarlar[0] - 1]
              : 3 - +vm.secimler[vm.zarlar[0] - 1];
          zar === 1 ? Sol2() : Sag2();
          vm.zarlar.push(zar);
          setTimeout(() => {
            kucukEtiketler(ilgiliKucukBoru, zar);
          }, 750);
        }
      }
      function solBEtiket() {
        document.getElementById(`leftLargeTag`).classList.add(`yaklasilmis`);
      }
      function sagBEtiket() {
        document.getElementById(`rightLargeTag`).classList.add(`yaklasilmis`);
      }
      function kucukEtiketler(id, yon) {
        let idtext = yon === 1 ? `solKucukEtiket` : `sagKucukEtiket`;
        idtext += id;
        document.getElementById(idtext).classList.add(`yaklasilmis`);
      }
    },
    hareketBittiMi() {
      let rect = this.$refs.futbolTopu.getBoundingClientRect();
      let elemBelow = document.elementFromPoint(
        (rect.left + rect.right) / 2,
        rect.top - 5
      );
      return !elemBelow.closest(`.temperanceBoru,#buyukBoru`);
    },
    ciktiHesapla() {
      let sonucMetin = ``;
      let sonucSayi = 0;
      const collection = document.getElementsByClassName("yaklasilmis");
      if (collection.length === 1) {
        return +collection[0].textContent;
      }
      for (let etiket of collection) {
        sonucSayi += +etiket.textContent;
        if (sonucMetin) {
          +etiket.textContent > 0
            ? (sonucMetin += `+` + +etiket.textContent)
            : (sonucMetin += +etiket.textContent);
        } else {
          +etiket.textContent > 0
            ? (sonucMetin += +etiket.textContent)
            : (sonucMetin += +etiket.textContent);
        }
      }
      sonucMetin += `=` + sonucSayi;
      return sonucMetin;
    },
  },
};
</script>

<style scoped>
.buyukInputlar {
  gap: 109px;
}

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

.tutorialKutusu {
  min-height: 618px;
}
</style>
