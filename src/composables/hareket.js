function hareket(e, asama, bitis, secimler, totalRevenue, totalLoss, store) {
  if (!Array.isArray(secimler.value)) {
    if (!secimler.value) {
      return;
    }
  } else {
    if (secimler.value.filter((a) => a).length !== 2) {
      return;
    }
  }
  if (asama.value !== "baslangic") {
    return;
  }
  bitis.value = new Date();
  asama.value = `tophareketi`;
  let futbolTopu = e.target;
  let fakeBall = futbolTopu.cloneNode(true);
  fakeBall.id = `fakeBall`;
  fakeBall.classList.remove(`clickReminder`);
  futbolTopu.style.visibility = "hidden";
  futbolTopu.after(fakeBall);
  fakeBall.style.position = "absolute";

  Asagi();

  function Asagi() {
    fakeBall
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
    setTimeout(nextAnimation, 1000);
  }

  function AsagiR() {
    fakeBall
      .animate(
        [
          { transform: `translate(0px,0px)` },
          { transform: `translate(0px,94px)` },
        ],
        {
          duration: 1000,
          fill: `forwards`,
          composite: `accumulate`,
        }
      )
      .persist();
    setTimeout(nextAnimation, 1000);
  }

  function Sol1() {
    fakeBall
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
    setTimeout(nextAnimation, 3000);
  }
  function Sag1() {
    fakeBall
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
    setTimeout(nextAnimation, 3000);
  }

  function Sol2PR() {
    fakeBall
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
    setTimeout(nextAnimation, 2000);
  }
  function Sag2PR() {
    fakeBall
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
    setTimeout(nextAnimation, 2000);
  }

  function Sol2T() {
    fakeBall
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
    setTimeout(nextAnimation, 4000);
  }
  function Sag2T() {
    fakeBall
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
    setTimeout(nextAnimation, 4000);
  }

  function nextAnimation() {
    let rect = fakeBall.getBoundingClientRect();
    fakeBall.style.display = "none";
    let elemBelow = document.elementFromPoint(
      // rect.left - 5,
      // (rect.top + rect.bottom) / 2
      (rect.left + rect.right) / 2,
      (rect.top + rect.bottom) / 2
    );
    fakeBall.style.display = "block";
    let zar = Math.floor(Math.random() * 2) + 1;

    if (elemBelow.closest(`.kucukBoru,.riskBoru`)) {
      zar === 1 ? Sol2PR() : Sag2PR();
      zar === 1
        ? etiketBoya(elemBelow.closest(`.kucukBoru,.riskBoru`), `sol`, 600)
        : etiketBoya(elemBelow.closest(`.kucukBoru,.riskBoru`), `sag`, 600);
      return false;
    }
    if (elemBelow.closest(`.temperanceBoru`)) {
      zar === 1 ? Sol2T() : Sag2T();
      zar === 1
        ? etiketBoya(elemBelow.closest(`.temperanceBoru`), `sol`, 600)
        : etiketBoya(elemBelow.closest(`.temperanceBoru`), `sag`, 600);

      return false;
    }
    if (elemBelow.closest(`#girisBoru`)) {
      AsagiR();
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
      if (+etiket.textContent > 0) {
        totalRevenue.value += +etiket.textContent;
        store.kazanc += +etiket.textContent;
      } else {
        totalLoss.value += -etiket.textContent;
        store.kazanc += +etiket.textContent;
      }
    }
  }

  function etiketBoya(obje, yon, time) {
    setTimeout(() => {
      obje.querySelector(`.${yon}etiket`).classList.add(`yaklasilmis`);
    }, time);
  }
}

export default hareket;
