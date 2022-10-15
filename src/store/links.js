export default {
  state: {
    links: [
      {
        id: 1,
        nameRU: "Главная",
        link: "main",
        hashLink: "",
      },
      {
        id: 2,
        nameRU: "Программы",
        link: "programs",
        hashLink: "program",
      },
      {
        id: 3,
        nameRU: "Расписание",
        link: "schedule",
        hashLink: "timetable",
      },
      {
        id: 4,
        nameRU: "Тренера",
        link: "trainers",
        hashLink: "trainers",
      },
    ],
  },
  getters: {
    getLinks(state) {
      return state.links;
    },
  },
  mutations: {},
  actions: {},
};
