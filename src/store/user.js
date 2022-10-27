import { $SERVICES } from "@/services/api";

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
    getPersonalScheduleEvents(state) {
      return state.user.workouts;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.accessToken = payload.access_token;
      state.refreshToken = payload.refresh_token;
      state.authorization = true;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT_USER(state) {
      state.user = null;
      state.refreshToken = null;
      state.accessToken = null;
    },
  },
  actions: {
    setToken({ commit }, payload) {
      payload && commit("SET_TOKEN", payload);
    },
    setUser({ commit }, user) {
      user && commit("SET_USER", user);
    },
    async logoutUser({ commit, state }) {
      try {
        await fetch(`${$SERVICES.API}/logout`, state.accessToken);

        commit("LOGOUT_USER");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
