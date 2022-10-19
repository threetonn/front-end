export default {
  state: {
    formTypeEnum: {
      signin: "signin",
      signup: "signup",
      default: "signin",
    },
    activeForm: {
      showForm: false,
      formType: "",
    },
  },
  getters: {
    getActiveForm(state) {
      return state.activeForm;
    },
  },
  mutations: {
    DISPLAY_ACTIVE_FORM(state, payload) {
      state.activeForm.showForm = true;
      state.activeForm.formType =
        state.formTypeEnum[payload.toLowerCase()] || state.formTypeEnum.default;
    },
    HIDE_ACTIVE_FORM(state) {
      state.activeForm.showForm = false;
    },
  },
  actions: {
    displayActiveForm({ commit }, payload) {
      commit("DISPLAY_ACTIVE_FORM", payload);
    },
    hideActiveForm({ commit }) {
      console.log("123");
      commit("HIDE_ACTIVE_FORM");
    },
  },
};
