import { reactive } from "vue";

let KisiVerileri = [];
let toplamKazanc = 0;
let KisiIsmi = "";

export const store = reactive({
  veriler: KisiVerileri,
  kazanc: toplamKazanc,
  isim: KisiIsmi,
});
