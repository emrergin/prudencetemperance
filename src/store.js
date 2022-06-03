import { reactive } from "vue";
import { uuid } from "vue-uuid";

let KisiVerileri = [];
let toplamKazanc = 0;
let KisiIsmi = "";
const uuID = uuid.v1();

export const store = reactive({
  veriler: KisiVerileri,
  kazanc: toplamKazanc,
  isim: KisiIsmi,
  _id: uuID,
});
