export default {
  state: {
    scheduleEvents: [
      {
        start: "2022-10-18 10:30",
        end: "2022-10-18 14:30",
        title: "Групповая тренировка",
        class: "split1",
      },
      {
        start: "2022-10-20 10:30",
        end: "2022-10-20 12:30",
        title: "Йога",
        class: "split2",
      },
      {
        start: "2022-10-18 15:30",
        end: "2022-10-18 18:30",
        title: "Персональные тренировки",
        class: "split3",
      },
      {
        start: "2022-10-19 16:30",
        end: "2022-10-19 20:30",
        title: "Персональные тренировки",
        class: "split4",
      },
    ],
  },
  getters: {
    getScheduleEvents(state) {
      return state.scheduleEvents;
    },
  },
  mutations: {},
  actions: {},
};
