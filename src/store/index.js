import { createStore } from "vuex";
import base from "./base";
import user from "./user";
import links from "./links";
import programs from "./programs";
import schedule from "./schedule";
import subscriptions from "./subscriptions";
import usersList from "./usersList";
import workout from "./workout";

export default createStore({
  modules: {
    base,
    user,
    links,
    programs,
    schedule,
    subscriptions,
    usersList,
    workout,
  },
});
