export default {
  state: {
    trainerCards: [
      {
        id: 1,
        name: "Королев Владимир",
        img: "trainer1",
        imgAlt: "trainer",
        trainingType: ["Персональные"],
        trainerDesc: "Крутой тренер",
      },
      {
        id: 2,
        name: "Бородин Виктор",
        img: "trainer2",
        imgAlt: "trainer",
        trainingType: ["Персональные", "Групповые"],
        trainerDesc: "Крутой тренер",
      },
      {
        id: 3,
        name: "Елизавета Смирнова",
        img: "trainer4",
        imgAlt: "trainer",
        trainingType: ["Персональные"],
        trainerDesc: "Крутой тренер",
      },
      {
        id: 4,
        name: "Лунина Инга",
        img: "trainer3",
        imgAlt: "trainer",
        trainingType: ["Групповые"],
        trainerDesc: "Крутой тренер",
      },
      {
        id: 5,
        name: "Лунина Инга",
        img: "trainer6",
        imgAlt: "trainer",
        trainingType: ["Групповые"],
        trainerDesc: "Крутой тренер",
      },
    ],
  },
  getters: {
    getTrainerCards(state) {
      return state.trainerCards;
    },
  },
  mutations: {},
  actions: {},
};
