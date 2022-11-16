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
    routeAccess: [
      {
        name: "Профиль",
        route: "account",
        access: ["client", "trainer", "manager"],
      },
      {
        name: "Расписание",
        route: "schedule",
        access: [],
      },
      {
        name: "Абонементы",
        route: "subscriptions",
        access: ["client", "manager"],
      },
      {
        name: "Тренера",
        route: "trainers",
        access: ["client", "manager"],
      },
      {
        name: "Персонал",
        route: "staff",
        access: ["manager"],
      },
      {
        name: "Клиенты",
        route: "users",
        access: ["trainer", "manager"],
      },
    ],
  },
  getters: {
    getLinks(state) {
      return state.links;
    },
    getRouteAccess(state) {
      return state.routeAccess;
    },
  },
  mutations: {},
  actions: {},
};
