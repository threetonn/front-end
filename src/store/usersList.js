// import { $SERVICES } from "@/services/api";

export default {
  state: {
    usersList: [
      {
        id: 1,
        name: "Королев Владимир",
        role: "trainer",
        img: "trainer1",
        imgAlt: "trainer",
        trainingType: ["Персональные"],
        trainerDesc: "Крутой тренер",
      },
      {
        id: 2,
        name: "Бородин Виктор",
        role: "trainer",
        img: "trainer2",
        imgAlt: "trainer",
        trainingType: ["Персональные", "Групповые"],
        trainerDesc: "Крутой тренер",
      },
      {
        id: 3,
        name: "Елизавета Смирнова",
        role: "trainer",
        img: "trainer4",
        imgAlt: "trainer",
        trainingType: ["Персональные"],
        trainerDesc: "Крутой тренер",
      },
      {
        id: 4,
        name: "Лунина Инга",
        role: "trainer",
        img: "trainer3",
        imgAlt: "trainer",
        trainingType: ["Групповые"],
        trainerDesc: "Крутой тренер",
      },
      {
        id: 5,
        name: "Лунина Инга",
        role: "trainer",
        img: "trainer6",
        imgAlt: "trainer",
        trainingType: ["Групповые"],
        trainerDesc: "Крутой тренер",
      },
    ],
    showUserCard: false,
    selectedUser: null,
  },
  getters: {
    getUserByID: (state) => (id) => {
      return state.usersList.find((user) => user.id === id);
    },
    getUsersByName: (state) => (name) => {
      return state.usersList.filter((user) => {
        const FIO = user.name + user.surname + user.patronymic;
        FIO.toLowerCase().includes(name.toLowerCase()) && user;
      });
    },
    getShowUserCard(state) {
      return state.showUserCard;
    },
    getSelectedUser(state) {
      return state.selectedUser;
    },
    getUsersByRole: (state) => (role) => {
      return state.usersList.filter((user) => user.role === role);
    },
  },
  mutations: {
    SHOW_USER_CARD(state) {
      state.showUserCard = true;
    },
    HIDE_USER_CARD(state) {
      state.showUserCard = false;
    },
    SELECT_USER(state, user) {
      state.selectedUser = user;
    },
    UPDATE_USERS_LIST(state, users) {
      if (Array.isArray(users) && users.length > 0) {
        state.usersList = [...state.usersList, ...users];
        state.usersList = [...new Set(state.usersList.map((user) => user.id))];
      }

      if (!Array.isArray(users) && typeof users === "object") {
        !state.usersList.find(users.id) &&
          (state.usersList = [...state.usersList, users]);
      }
    },
  },
  actions: {
    hideUserCard({ commit }) {
      commit("HIDE_USER_CARD");
    },
    showUserCard({ commit }) {
      commit("SHOW_USER_CARD");
    },
    selectUser({ commit }, user) {
      commit("SELECT_USER", user);
    },
    updateUsersList({ commit }, users) {
      users && commit("UPDATE_USERS_LIST", users);
    },
  },
};
