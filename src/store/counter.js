export default {
  state: {
    counter: 0,
  },
  getters: {
    getCounter(state) {
      return state.counter;
    },
  },
  mutations: {
    ADD_INCREMENT(state, payload) {
      state.counter = state.counter + payload;
    },
  },
  actions: {
    increment({ commit }, payload) {
      commit("ADD_INCREMENT", payload);
    },
  },
};
