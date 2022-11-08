import { getProfileAPI, signInUserAPI, signUpUserAPI } from "@/services/api";

export default {
  state: {
    accessToken: "",
    refreshToken: "",
    authorization: false,
    user: "",
  },
  getters: {
    getAuthorization(state) {
      return state.authorization;
    },
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
    getUserSubscriptionID(state) {
      return state.user.subscriptionID;
    },
  },
  mutations: {
    SET_USER_SUBSCRIPTION(state, id) {
      state.user.subscriptionID = id;
    },
    SIGN_UP_USER(state, user) {
      state.user = user;
      state.authorization = true;
    },
    SIGN_IN_USER(state, user) {
      state.accessToken = user.access_token;
      state.refreshToken = user.refresh_token;
      state.authorization = true;
    },
    LOGOUT_USER(state) {
      state.authorization = false;
      state.user = null;
      state.refreshToken = null;
      state.accessToken = null;
    },
  },
  actions: {
    async signUpUser({ dispatch, commit }, userData) {
      const user = await signUpUserAPI(userData);

      if (user) {
        await commit("SIGN_UP_USER", user);
        dispatch("signInUser", {
          email: userData.email,
          password: userData.password,
        });
      }
    },
    async signInUser({ dispatch }, userData) {
      const user = await signInUserAPI(userData);

      dispatch("setUserWithToken", {
        accessToken: user.access_token,
        refreshToken: user.refresh_token,
      });
    },
    async setUserWithToken({ dispatch, commit }, payload) {
      await dispatch("logoutUser");

      const profile = await getProfileAPI(payload.accessToken);

      profile?.email && commit("SIGN_UP_USER", profile);

      console.log(profile);

      if (profile?.email) {
        localStorage.setItem(
          "userLocal",
          JSON.stringify({
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          })
        );
      } else {
        localStorage.setItem("userLocal", "");
      }
    },
    setUserSubscription({ commit }, id) {
      id && commit("SET_USER_SUBSCRIPTION", id);
    },
    logoutUser({ commit }) {
      try {
        localStorage.setItem("userLocal", "");

        commit("LOGOUT_USER");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
