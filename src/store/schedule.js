import {
  addTrainInSheduleAPI,
  deleteTrainInSheduleAPI,
  editTrainInSheduleAPI,
  getScheduleEventsAPI,
  getSchedulePesonalEventsAPI,
} from "@/api/sheduleAPI";

export default {
  state: {
    scheduleEvents: [],
    schedulePersonalEvents: [],
    scheduleEventsFormActive: false,
    scheduleSelectedEventID: null,
  },
  getters: {
    getScheduleEvents(state) {
      return state.scheduleEvents;
    },
    getPersonalEvents(state) {
      return state.schedulePersonalEvents;
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
    GET_SHEDULE_EVENTS(state, events) {
      state.scheduleEvents = events;
    },
    ADD_TRAIN_IN_SCHEDULE(state, train) {
      if (train.type === "personal") {
        return state.schedulePersonalEvents.push(train);
      }
      return state.scheduleEvents.push(train);
    },
    // eslint-disable-next-line no-unused-vars
    EDIT_TRAIN_IN_SCHEDULE(state, train) {
      if (train.type === "personal") {
        const filteredEvents = state.schedulePersonalEvents.filter(
          (event) => event.id !== train.id
        );
        return (state.schedulePersonalEvents = [...filteredEvents, train]);
      }
      const filteredEvents = state.scheduleEvents.filter(
        (event) => event.id !== train.id
      );
      return (state.scheduleEvents = [...filteredEvents, train]);
    },
    DELETE_TRAIN_IN_SCHEDULE(state, id) {
      const concateItems = [
        ...state.scheduleEvents,
        ...state.schedulePersonalEvents,
      ];
      const findItem = concateItems.find((item) => item.id === id);
      if (findItem.type === "personal") {
        state.schedulePersonalEvents = state.schedulePersonalEvents.filter(
          (event) => event.id !== id
        );
      }
      state.scheduleEvents = state.scheduleEvents.filter(
        (event) => event.id !== id
      );
    },
    GET_SHEDULE_PERSONAL_EVENTS(state, events) {
      state.schedulePersonalEvents = events;
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
    async getSchedulePesonalEvents({ commit }, data) {
      const events = await getSchedulePesonalEventsAPI(data);
      if (!events.error) {
        events && commit("GET_SHEDULE_PERSONAL_EVENTS", events);
      }
    },
    async getScheduleEvents({ commit }) {
      const events = await getScheduleEventsAPI();
      if (!events.error) {
        events && commit("GET_SHEDULE_EVENTS", events);
      }
    },
    async addTrainInSchedule({ commit }, trainData) {
      const train = await addTrainInSheduleAPI(trainData);
      if (!train.error) {
        train && commit("ADD_TRAIN_IN_SCHEDULE", train);
      }
    },
    async editTrainInSchedule({ commit }, trainData) {
      const train = await editTrainInSheduleAPI(trainData);
      if (!train.error) {
        train && commit("EDIT_TRAIN_IN_SCHEDULE", train);
      }
    },
    async deleteTrainInSchedule({ commit }, trainData) {
      const train = await deleteTrainInSheduleAPI(trainData);
      if (!train.error) {
        train && commit("DELETE_TRAIN_IN_SCHEDULE", trainData.id);
      }
    },
  },
};
