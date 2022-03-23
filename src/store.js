import { reactive } from 'vue'

let KisiVerileri=[];
let toplamKazanc=0;


export const store = reactive({
   veriler: KisiVerileri,
   kazanc: toplamKazanc
})