import { getSubscriptionsAPI } from "@/api/subscriptionAPI";

export default {
  state: {
    subscriptionCards: [
      {
        id: 1,
        type: "basic",
        title: "Базовый",
        price: 60,
        list: ["Бассейн", "Спа", "Ванна", "Телевизор"],
      },
      {
        id: 2,
        type: "extended",
        title: "Расширенный",
        price: 80,
        list: ["Бассейн", "Спа", "Ванна", "Телевизор", "Спортивное питание"],
      },
      {
        id: 3,
        type: "extended-plus",
        title: "Расширенный Плюс",
        price: 100,
        list: [
          "Бассейн",
          "Спа",
          "Ванна",
          "Телевизор",
          "Личный тренер",
          "Спортивное питание",
          "План тренировок",
        ],
      },
    ],
  },
  getters: {
    getSubscriptionCards(state) {
      return state.subscriptionCards;
    },
  },
  mutations: {
    SET_SUBSCRIPTIONS(state, subscriptions) {
      state.subscriptionCards = subscriptions;
    },
  },
  actions: {
    async getSubscriptionsList({ commit }) {
      const subscriptions = await getSubscriptionsAPI();
      subscriptions && commit("SET_SUBSCRIPTIONS", subscriptions);
    },
  },
};
