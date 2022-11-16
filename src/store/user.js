/* eslint-disable no-unused-vars */
import {
  getProfileAPI,
  signInUserAPI,
  signUpUserAPI,
  sendUserImageAPI,
  sendNewUserDataAPI,
} from "@/api/userAPI";

import { client, manager, trainer } from "@/utils/testUser";

export default {
  state: {
    access_token: "",
    refresh_token: "",
    authorization: false,
    user: manager,
  },
  getters: {
    getAuthorization(state) {
      return state.authorization;
    },
    getTokens(state) {
      return {
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      };
    },
    getUser(state) {
      return state.user;
    },
    getPersonalScheduleEvents(state) {
      return state.user.workouts;
    },
    getUserSubscription(state) {
      return state.user.subscription;
    },
  },
  mutations: {
    SET_USER_SUBSCRIPTION(state, subscription) {
      state.user.subscription = subscription;
    },
    SIGN_UP_USER(state, user) {
      state.user = user;
      state.authorization = true;
    },
    SIGN_IN_USER(state, user) {
      state.access_token = user.access_token;
      state.refresh_token = user.refresh_token;
      state.authorization = true;
    },
    LOGOUT_USER(state) {
      state.authorization = false;
      state.user = null;
      state.refresh_token = null;
      state.access_token = null;
    },
  },
  actions: {
    async changeUserData({ commit }, userData) {
      const user = await sendNewUserDataAPI(
        userData.data,
        userData.access_token
      );
      await commit("SIGN_UP_USER", user);
    },
    async uploadImage({ commit }, { formData, access_token }) {
      const user = await sendUserImageAPI(formData, access_token);
      await commit("SIGN_UP_USER", user);
    },
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
    async signInUser({ commit, dispatch }, userData) {
      const user = await signInUserAPI(userData);

      await commit("SIGN_IN_USER", user);

      dispatch("setUserWithToken", {
        access_token: user.access_token,
        refresh_token: user.refresh_token,
      });
    },
    async setUserWithToken({ commit }, payload) {
      // await dispatch("logoutUser");
      const tokens = {
        access_token: payload.access_token,
        refresh_token: payload.refresh_token,
      };
      await commit("SIGN_IN_USER", tokens);

      const profile = await getProfileAPI(payload.access_token);

      profile?.email && commit("SIGN_UP_USER", profile);

      if (profile?.email) {
        localStorage.setItem("userLocal", JSON.stringify(tokens));
      } else {
        localStorage.setItem("userLocal", "");
      }
    },
    setUserSubscription({ commit }, subscription) {
      subscription && commit("SET_USER_SUBSCRIPTION", subscription);
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
