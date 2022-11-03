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
        id: 2,
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
  mutations: {},
  actions: {},
};
