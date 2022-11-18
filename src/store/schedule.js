export default {
  state: {
    scheduleEvents: [
      {
        id: 1,
        start: "2022-10-18 10:30",
        end: "2022-10-18 14:30",
        title: "Групповая тренировка",
        location: { id: 2, name: "Локация" },
        type: { id: 1, name: "Йога" },
        class: "split1",
      },
      {
        id: 2,
        start: "2022-10-20 10:30",
        end: "2022-10-20 12:30",
        title: "Йога",
        location: "",
        type: "",
        class: "split2",
      },
      {
        id: 3,
        start: "2022-10-18 15:30",
        end: "2022-10-18 18:30",
        title: "Персональные тренировки",
        location: "",
        type: "",
        class: "split3",
      },
      {
        id: 4,
        start: "2022-10-19 16:30",
        end: "2022-10-19 20:30",
        title: "Персональные тренировки",
        location: "",
        type: "",
        class: "split4",
      },
    ],
    scheduleEventsFormActive: false,
    scheduleSelectedEventID: null,
  },
  getters: {
    getScheduleEvents(state) {
      return state.scheduleEvents;
    },
    getScheduleEventsFormActive(state) {
      return state.scheduleEventsFormActive;
    },
    getScheduleSelectedEventID(state) {
      return state.scheduleSelectedEventID;
    },
  },
  mutations: {
    SHOW_SCHEDULE_EVENTS_FORM(state) {
      state.scheduleEventsFormActive = true;
    },
    HIDE_SCHEDULE_EVENTS_FORM(state) {
      state.scheduleEventsFormActive = false;
    },
    SET_SCHEDULE_SELECT_EVENT_ID(state, id) {
      state.scheduleSelectedEventID = id;
    },
    ADD_TRAIN_IN_SCHEDULE(state, train) {
      state.scheduleEvents.push({
        id: state.scheduleEvents.length + 1,
        start: train.trainStart,
        end: train.trainEnd,
        title: train.trainName,
      });
    },
    // eslint-disable-next-line no-unused-vars
    EDIT_TRAIN_IN_SCHEDULE(state, { train, id }) {
      const findedEvent = state.scheduleEvents.find((event) => event.id === id);
      findedEvent.start = train.trainStart;
      findedEvent.end = train.trainEnd;
      findedEvent.title = train.trainName;
    },
    DELETE_TRAIN_IN_SCHEDULE(state, id) {
      state.scheduleEvents = state.scheduleEvents.filter(
        (event) => event.id !== id
      );
    },
  },
  actions: {
    showScheduleEventsForm({ commit }) {
      commit("SHOW_SCHEDULE_EVENTS_FORM");
    },
    hideScheduleEventsForm({ commit }) {
      commit("HIDE_SCHEDULE_EVENTS_FORM");
    },
    setScheduleSelectEventId({ commit }, id) {
      commit("SET_SCHEDULE_SELECT_EVENT_ID", id);
    },
    addTrainInSchedule({ commit }, train) {
      commit("ADD_TRAIN_IN_SCHEDULE", train);
    },
    editTrainInSchedule({ commit }, payload) {
      commit("EDIT_TRAIN_IN_SCHEDULE", payload);
    },
    deleteTrainInSchedule({ commit }, id) {
      commit("DELETE_TRAIN_IN_SCHEDULE", id);
    },
  },
};
