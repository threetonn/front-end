export default {
  state: {
    subscriptionCards: [
      {
        id: 1,
        type: "basic",
        title: "Базовый",
        priceM: 1800,
        priceY: 19990,
        list: ["Бассейн", "Спа", "Ванна", "Телевизор"],
      },
      {
        id: 2,
        type: "extended",
        title: "Расширенный",
        priceM: 2500,
        priceY: 24990,
        list: ["Бассейн", "Спа", "Ванна", "Телевизор", "Спортивное питание"],
      },
      {
        id: 2,
        type: "extended-plus",
        title: "Расширенный Плюс",
        priceM: 2990,
        priceY: 29990,
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
