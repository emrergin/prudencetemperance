function boruTasi(e, dropClass, asama, boruClass, currentDroppable, secimler) {
  if (asama !== `baslangic`) {
    return false;
  }
  let kucukBoru = e.target.closest(`.${boruClass}`);
  kucukBoru.style.cursor = "grabbing";

  if (!Array.isArray(secimler.value)) {
    secimler.value = null;
  } else {
    let indeks = secimler.value.findIndex((a) => a === kucukBoru.id.slice(9));
    if (indeks !== -1 && secimler.value[indeks + 2]) {
      return false;
    } else {
      secimler.value[indeks] = null;
    }
  }

  let shiftX = e.clientX - kucukBoru.getBoundingClientRect().left;
  let shiftY = e.clientY - kucukBoru.getBoundingClientRect().top;

  if (!document.getElementById(`fakeBoru`)) {
    var fakeBoru = kucukBoru.cloneNode(true);
    fakeBoru.id = `fakeBoru`;
    fakeBoru.style.visibility = "hidden";
    kucukBoru.after(fakeBoru);
  } else {
    document.getElementById(`fakeBoru`).remove();
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

    let droppableBelow = elemBelow.closest(`.${dropClass}`);

    if (currentDroppable.value != droppableBelow) {
      if (currentDroppable.value) {
        leaveDroppable(currentDroppable.value);
      }
      currentDroppable.value = droppableBelow;

      if (currentDroppable.value) {
        enterDroppable(currentDroppable.value);
      }
    }
  }

  document.addEventListener("mousemove", onMouseMove);
  kucukBoru.addEventListener("mouseup", onMouseUp);

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    kucukBoru.style.cursor = "grab";

    if (currentDroppable.value) {
      var rect = currentDroppable.value.getBoundingClientRect();
      currentDroppable.value.style.background = "";
      kucukBoru.style.left = `${rect.left + window.scrollX}px`;
      kucukBoru.style.top = `${rect.top + window.scrollY}px`;

      if (!Array.isArray(secimler.value)) {
        secimler.value = currentDroppable.value.id.slice(1);
      } else {
        secimler.value[currentDroppable.value.id.slice(1)] =
          kucukBoru.id.slice(9);
      }
    }

    kucukBoru.removeEventListener("mouseup", onMouseUp);
  }

  function enterDroppable(elem) {
    elem.style.background = "#F0FFF0";
  }
  function leaveDroppable(elem) {
    elem.style.background = "";
  }
}

export default boruTasi;
