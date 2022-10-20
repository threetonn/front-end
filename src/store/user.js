export default {
  state: {
    accessToken: "",
    refreshToken: "",
    authorization: false,
    user: "",
  },
  getters: {
    getTokens(state) {
      return {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      };
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.accessToken = payload.access_token;
      state.refreshToken = payload.refresh_token;
      state.authorization = true;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setToken({ commit }, payload) {
      payload && commit("SET_TOKEN", payload);
    },
    setUser({ commit }, payload) {
      payload && commit("SET_USER", payload);
    },
  },
};
