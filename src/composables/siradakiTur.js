function siradakiTur(treatment,store,bitis,baslangic,asama,payOffs,
    currentRound,secim,boruClass,oyunSonu,totalRounds,totalRevenue,totalLoss){
    store.veriler.push([treatment,bitis.value-baslangic.value,
    payOffs[currentRound.value],secim.value.id.slice(1)]);
    secim.value=null;

    const kucukBorular = document.querySelectorAll(`.${boruClass}`);
    kucukBorular.forEach(kucukBoru=>kucukBoru.remove());

    baslangic.value=new Date();
    asama.value=`baslangic`;

    if (currentRound.value>=totalRounds-1){          
        oyunSonu.value=true;
        store.kazanc+=totalRevenue-totalLoss;
        return;
    }
    let futbolTopu=document.getElementById("futbolTopu");
    futbolTopu.getAnimations().forEach((anim) => {
        anim.cancel();
    });
    const etiketler = document.querySelectorAll(".etiket");
    etiketler.forEach(etiket=>etiket.classList.remove(`yaklasilmis`));

    document.getElementById(`fakeBall`).remove();
    futbolTopu.style.position="static";

    currentRound.value++;
} 


export default siradakiTur;