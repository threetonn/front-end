import { getSubscriptionsAPI } from "@/api/subscriptionAPI";

export default {
  state: {
    subscriptionCards: null,
  },
  getters: {
    getSubscriptionCards(state) {
      return state.subscriptionCards;
    },
  },
  mutations: {
    SET_SUBSCRIPTIONS_CADRS(state, subscriptions) {
      state.subscriptionCards = subscriptions;
    },
  },
  actions: {
    async getSubscriptionsList({ commit }) {
      const subscriptions = await getSubscriptionsAPI();
      subscriptions && commit("SET_SUBSCRIPTIONS_CADRS", subscriptions);
    },
  },
};
