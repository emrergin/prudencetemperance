function hareket(e, asama, bitis, secim, totalRevenue, totalLoss) {
  if (!secim.value) {
    return;
  }
  if (asama.value !== "baslangic") {
    return;
  }
  bitis.value = new Date();
  asama.value = `tophareketi`;
  let futbolTopu = e.target;
  futbolTopu.style.zIndex = 4;
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
    setTimeout(siradakiAnimasyon, 1000);
  }

  function Sol1() {
    futbolTopu
      .animate(
        [
          { transform: `translate(0px,0px) rotate(360deg)`, offset: 0 },
          { transform: `translate(-120px,0px) rotate(0deg)`, offset: 0.5 },
          { transform: `translate(-145px,12px) rotate(-75deg)`, offset: 0.625 },
          {
            transform: `translate(-152.5px,48px) rotate(-82.5deg)`,
            offset: 0.75,
          },
          { transform: `translate(-152.5px,93px) rotate(-82.5deg)`, offset: 1 },
        ],
        {
          duration: 3000,
          fill: `forwards`,
          composite: `accumulate`,
        }
      )
      .persist();
    setTimeout(siradakiAnimasyon, 3000);
  }
  function Sag1() {
    futbolTopu
      .animate(
        [
          { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
          { transform: `translate(120px,0px) rotate(360deg)`, offset: 0.5 },
          { transform: `translate(145px,12px) rotate(432deg)`, offset: 0.625 },
          {
            transform: `translate(152.5px,48px) rotate(454.5deg)`,
            offset: 0.75,
          },
          { transform: `translate(152.5px,93px) rotate(454.5deg)`, offset: 1 },
        ],
        {
          duration: 3000,
          fill: `forwards`,
          composite: `accumulate`,
        }
      )
      .persist();
    setTimeout(siradakiAnimasyon, 3000);
  }

  function Sol2PR() {
    futbolTopu
      .animate(
        [
          { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
          { transform: `translate(-40px,0px) rotate(-120deg)`, offset: 0.25 },
          { transform: `translate(-70px,15px) rotate(-210deg)`, offset: 0.5 },
          { transform: `translate(-75px,35px) rotate(-225deg)`, offset: 0.75 },
          { transform: `translate(-75px,70px) rotate(-225deg)`, offset: 1 },
        ],
        {
          duration: 2000,
          fill: `forwards`,
          composite: `accumulate`,
        }
      )
      .persist();
    setTimeout(siradakiAnimasyon, 2000);
  }
  function Sag2PR() {
    futbolTopu
      .animate(
        [
          { transform: `translate(0px,0px) rotate(0deg)`, offset: 0 },
          { transform: `translate(40px,0px) rotate(120deg)`, offset: 0.25 },
          { transform: `translate(70px,15px) rotate(210deg)`, offset: 0.5 },
          { transform: `translate(75px,35px) rotate(225deg)`, offset: 0.75 },
          { transform: `translate(75px,70px) rotate(225deg)`, offset: 1 },
        ],
        {
          duration: 2000,
          fill: `forwards`,
          composite: `accumulate`,
        }
      )
      .persist();
    setTimeout(siradakiAnimasyon, 2000);
  }

  function siradakiAnimasyon() {
    let rect = futbolTopu.getBoundingClientRect();
    let elemBelow = document.elementFromPoint(
      rect.left - 5,
      (rect.top + rect.bottom) / 2
    );
    let zar = Math.floor(Math.random() * 2) + 1;

    if (elemBelow.closest(`.kucukBoru`)) {
      zar === 1 ? Sol2PR() : Sag2PR();
      zar === 1
        ? etiketBoya(elemBelow.closest(`.kucukBoru`), `sol`, 700)
        : etiketBoya(elemBelow.closest(`.kucukBoru`), `sag`, 700);
      return false;
    }
    if (elemBelow.closest(`#buyukBoru`)) {
      zar === 1 ? Sol1() : Sag1();
      let etiketler = document.getElementById(`buyukEtiketler`);
      zar === 1
        ? etiketBoya(etiketler, `sol`, 1100)
        : etiketBoya(etiketler, `sag`, 1100);

      return false;
    }
    asama.value = `roundsonu`;
    const collection = document.getElementsByClassName("yaklasilmis");
    for (let etiket of collection) {
      +etiket.textContent > 0
        ? (totalRevenue.value += +etiket.textContent)
        : (totalLoss.value += -etiket.textContent);
    }
  }

  function etiketBoya(obje, yon, time) {
    setTimeout(() => {
      obje.querySelector(`.${yon}etiket`).classList.add(`yaklasilmis`);
    }, time);
  }
}

export default hareket;
