// import { $SERVICES } from "@/services/api";

import { getTrainersAPI } from "@/api/workoutAPI";

export default {
  state: {
    trainers: null,
    usersList: [
      {
        id: 1,
        name: "Владимир",
        surname: "Королев",
        patronymic: "",
        email: "test@mail.ru",
        phone: "+79609996655",
        role: "trainer",
        img: "trainer1",
        imgAlt: "trainer",
        workout_type: ["Персональные"],
        bio: "Крутой тренер",
      },
      {
        id: 2,
        name: "Виктор",
        surname: "Бородин",
        patronymic: "",
        email: "test@mail.ru",
        phone: "+79609996655",
        role: "trainer",
        img: "trainer2",
        imgAlt: "trainer",
        workout_type: [
          "Персональные",
          "Групповые",
          "Персональные",
          "Групповые",
        ],
        bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore, commodi modi ipsa ex dolor, consectetur expedita error facere eius saepe labore vitae cumque laudantium! Nemo esse consectetur at, incidunt quaerat illum obcaecati aut praesentium quibusdam sapiente, earum quo! Provident fuga similique excepturi deserunt ad saepe mollitia velit, est corporis quas. Fugiat consequatur rerum at nostrum molestiae ratione perspiciatis amet aliquam a atque architecto sunt laudantium rem dignissimos nemo maiores quis consequuntur alias soluta nisi quae, dolorem molestias nesciunt veritatis? Totam at iste ipsa facere rerum earum vero ipsum architecto optio, fuga consequatur iusto ea doloremque dignissimos quae quaerat, odit maxime.",
      },
      {
        id: 3,
        name: "Елизавета",
        surname: "Смирнова",
        patronymic: "",
        email: "test@mail.ru",
        phone: "+79609996655",
        role: "trainer",
        img: "trainer4",
        imgAlt: "trainer",
        workout_type: ["Персональные"],
        bio: "Крутой тренер",
      },
      {
        id: 4,
        name: "Инга",
        surname: "Лунина",
        patronymic: "",
        email: "test@mail.ru",
        phone: "+79609996655",
        role: "trainer",
        img: "trainer3",
        imgAlt: "trainer",
        workout_type: ["Групповые"],
        bio: "Крутой тренер",
      },
      {
        id: 5,
        name: "Инга",
        surname: "Лунина",
        patronymic: "",
        email: "test@mail.ru",
        phone: "+79609996655",
        role: "trainer",
        img: "trainer6",
        workout_type: ["Групповые"],
        bio: "Крутой тренер",
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
    getTrainers(state) {
      return state.trainers;
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
    GET_TRAINERS(state, trainers) {
      state.trainers = trainers;
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
    async getTrainers({ commit }) {
      const trainers = await getTrainersAPI();
      trainers && commit("GET_TRAINERS", trainers);
    },
    // updateUsersList({ commit }, users) {
    //   users && commit("UPDATE_USERS_LIST", users);
    // },
  },
};
