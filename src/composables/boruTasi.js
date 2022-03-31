function boruTasi(e, dropClass, asama, boruClass, secim) {
  if (asama !== `baslangic`) {
    return false;
  }
  let kucukBoru = e.target.closest(`.${boruClass}`);
  kucukBoru.style.cursor = "grabbing";
  const collection = document.getElementsByClassName(dropClass);
  for (let i = 0; i < collection.length; i++) {
    collection[i].style.visibility = "visible";
  }
  let shiftX = e.clientX - kucukBoru.getBoundingClientRect().left;
  let shiftY = e.clientY - kucukBoru.getBoundingClientRect().top;

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

    if (secim.value != droppableBelow) {
      if (secim.value) {
        leaveDroppable(secim.value);
      }
      secim.value = droppableBelow;

      if (secim.value) {
        enterDroppable(secim.value);
      }
    }
  }

  document.addEventListener("mousemove", onMouseMove);
  kucukBoru.addEventListener("mouseup", onMouseUp);

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    kucukBoru.style.cursor = "grab";

    if (secim.value) {
      var rect = secim.value.getBoundingClientRect();
      secim.value.style.background = "";
      kucukBoru.style.left = `${rect.left + window.scrollX}px`;
      kucukBoru.style.top = `${rect.top + window.scrollY}px`;
      const collection = document.getElementsByClassName(dropClass);
      for (let i = 0; i < collection.length; i++) {
        collection[i].style.visibility = "hidden";
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
  return secim.value;
}

export default boruTasi;
