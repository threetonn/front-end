// import { $SERVICES } from "@/services/api";

import { getClientsAPI, getStaffAPI, getTrainersAPI } from "@/api/userAPI";

export default {
  state: {
    trainers: null,
    staff: null,
    clients: null,
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
    getStaff(state) {
      return state.staff;
    },
    getClients(state) {
      return state.clients;
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
    GET_STAFF(state, staff) {
      state.staff = staff;
    },
    GET_CLIENTS(state, clients) {
      state.clients = clients;
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
      if (!trainers.error) {
        trainers && commit("GET_TRAINERS", trainers);
      }
    },
    async getStaff({ commit }) {
      const staff = await getStaffAPI();
      if (!staff.error) {
        staff && commit("GET_STAFF", staff);
      }
    },
    async getClients({ commit }) {
      const clients = await getClientsAPI();
      if (!clients.error) {
        clients && commit("GET_CLIENTS", clients);
      }
    },
  },
};
