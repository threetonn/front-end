<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Абонементы</h1>
    <div class="profile-page__subscriptions">
      <TTCardSubscription
        v-for="subscription in subscriptionsCards"
        :key="subscription.id"
        :subscription="subscription"
      ></TTCardSubscription>
    </div>
  </div>
</template>

<script>
import TTCardSubscription from "@/components/TTCardSubscription.vue";

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    TTCardSubscription,
  },
  setup() {
    const store = useStore();

    const subscriptionsCards = computed(
      () => store.getters.getSubscriptionCards
    );

    return {
      subscriptionsCards,
    };
  },
};
</script>

<style></style>
