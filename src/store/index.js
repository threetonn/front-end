import { createStore } from "vuex";
import counter from "./counter";
import links from "./links";
import programs from "./programs";
import trainers from "./trainers";
import schedule from "./schedule";

export default createStore({
  modules: {
    counter,
    links,
    programs,
    trainers,
    schedule,
  },
});
