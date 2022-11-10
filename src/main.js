import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vue3-carousel/dist/carousel.css";
import Notifications from "@kyvg/vue3-notification";

createApp(App).use(store).use(router).use(Notifications).mount("#app");
