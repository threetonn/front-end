export default {
  state: {
    programCards: [
      {
        id: 1,
        imageAlt: "personal",
        imageName: "personal",
        nameRU: "Персональная",
        name: "Personal",
      },
      {
        id: 2,
        imageAlt: "group",
        imageName: "group",
        nameRU: "Групповая",
        name: "Group",
      },
      {
        id: 3,
        imageAlt: "airobik",
        imageName: "airobik",
        nameRU: "Аэробика",
        name: "Airobik",
      },
      {
        id: 4,
        imageAlt: "yoga",
        imageName: "yoga",
        nameRU: "Йога",
        name: "Yoga",
      },
    ],
  },
  getters: {
    getProgramCards(state) {
      return state.programCards;
    },
  },
  mutations: {},
  actions: {},
};
