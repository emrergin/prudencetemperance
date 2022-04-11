import veriGuncelle from "./veriGuncelle";

function siradakiTur(
  treatment,
  store,
  bitis,
  baslangic,
  asama,
  payOffs,
  currentRound,
  secimler,
  boruClass,
  oyunSonu,
  totalRounds
) {
  if (Array.isArray(secimler.value)) {
    secimler.value = secimler.value.map((a) => (a === null ? `_` : a));
  }
  store.veriler.push([
    treatment,
    bitis.value - baslangic.value,
    payOffs[currentRound.value],
    secimler.value,
  ]);
  veriGuncelle();
  if (!Array.isArray(secimler.value)) {
    secimler.value = null;
  } else {
    secimler.value = [null, null, null, null];
  }

  const kucukBorular = document.querySelectorAll(`.${boruClass}`);
  kucukBorular.forEach((kucukBoru) => kucukBoru.remove());



  if (currentRound.value >= totalRounds - 1) {
    oyunSonu.value = true;
    return;
  }
  let futbolTopu = document.getElementById("futbolTopu");
  futbolTopu.getAnimations().forEach((anim) => {
    anim.cancel();
  });
  const etiketler = document.querySelectorAll(".etiket");
  etiketler.forEach((etiket) => etiket.classList.remove(`yaklasilmis`));

  document.getElementById(`fakeBall`).remove();
  futbolTopu.style.position = "static";

  baslangic.value = new Date();
  asama.value = `baslangic`;
  currentRound.value++;
}

export default siradakiTur;
