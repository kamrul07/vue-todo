import { createApp } from "vue";

import { createPinia } from "pinia";
import "./style.css";
import router from "./router/router.js";
import App from "./App.vue";
import "vue-toast-notification/dist/theme-sugar.css";
const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
