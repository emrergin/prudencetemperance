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
  if (!Array.isArray(secimler.value)) {
    secimler.value = null;
  } else {
    secimler.value = [null, null, null, null];
  }

  const kucukBorular = document.querySelectorAll(`.${boruClass}`);
  kucukBorular.forEach((kucukBoru) => kucukBoru.remove());

  baslangic.value = new Date();
  asama.value = `baslangic`;

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

  currentRound.value++;
}

export default siradakiTur;
