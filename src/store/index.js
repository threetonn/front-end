import { createStore } from "vuex";
import base from "./base";
import user from "./user";
import links from "./links";
import programs from "./programs";
import trainers from "./trainers";
import schedule from "./schedule";

export default createStore({
  modules: {
    base,
    user,
    links,
    programs,
    trainers,
    schedule,
  },
});
