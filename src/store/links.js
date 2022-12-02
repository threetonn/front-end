import { getRouteAccessAPI } from "@/api/routesAPI";

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
    routeAccess: null,
  },
  getters: {
    getLinks(state) {
      return state.links;
    },
    getRouteAccess(state) {
      return state.routeAccess;
    },
  },
  mutations: {
    GET_ROUTE_ACCESS(state, routes) {
      state.routeAccess = routes;
    },
  },
  actions: {
    async getRouteAccess({ commit }) {
      const routes = await getRouteAccessAPI();
      if (!routes.error) {
        routes && commit("GET_ROUTE_ACCESS", routes);
      }
    },
  },
};
