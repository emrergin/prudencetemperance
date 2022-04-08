import { createApp } from "vue";
import App from "./App.vue";
import UUID from "vue-uuid";
// eslint-disable-next-line
import style from '../public/style.css'

createApp(App).use(UUID).mount("#app");

