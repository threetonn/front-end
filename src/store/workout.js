import { getWorkoutTypesAPI } from "@/api/workoutAPI";

export default {
  state: {
    workoutTypes: [],
  },
  getters: {
    getWorkoutTypes(state) {
      return state.workoutTypes;
    },
  },
  mutations: {
    SET_WORKOUT_TYPES(state, workoutTypes) {
      state.workoutTypes = workoutTypes;
    },
  },
  actions: {
    async setWorkoutTypes({ commit }) {
      const workoutTypes = await getWorkoutTypesAPI();
      workoutTypes && commit("SET_WORKOUT_TYPES", workoutTypes);
    },
  },
};
