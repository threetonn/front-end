import { createStore } from "vuex";
import links from "./links";
import programs from "./programs";
import trainers from "./trainers";
import schedule from "./schedule";

export default createStore({
  modules: {
    links,
    programs,
    trainers,
    schedule,
  },
});
