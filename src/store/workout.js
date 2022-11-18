import { getWorkoutTypesAPI, getWorkoutLocationsAPI } from "@/api/workoutAPI";

export default {
  state: {
    workoutTypes: [
      { id: 1, description: "Йога" },
      { id: 2, description: "Чайхана" },
      { id: 3, description: "Групповая" },
    ],
    workoutLocations: [
      { id: 1, description: "Location1" },
      { id: 2, description: "Location2" },
      { id: 3, description: "Location3" },
    ],
  },
  getters: {
    getWorkoutTypes(state) {
      return state.workoutTypes;
    },
    getWorkoutLocations(state) {
      return state.workoutLocations;
    },
  },
  mutations: {
    SET_WORKOUT_TYPES(state, workoutTypes) {
      state.workoutTypes = workoutTypes;
    },
    SET_WORKOUT_LOCATIONS(state, workoutLocations) {
      state.workoutLocations = workoutLocations;
    },
  },
  actions: {
    async setWorkoutTypes({ commit }) {
      const workoutTypes = await getWorkoutTypesAPI();
      workoutTypes && commit("SET_WORKOUT_TYPES", workoutTypes);
    },
    async setWorkoutLocations({ commit }) {
      const workoutLocations = await getWorkoutLocationsAPI();
      workoutLocations && commit("SET_WORKOUT_LOCATIONS", workoutLocations);
    },
  },
};
