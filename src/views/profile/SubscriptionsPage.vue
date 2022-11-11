<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Абонементы</h1>
    <div class="profile-page__subscriptions">
      <TTCardSubscription
        v-for="subscription in subscriptionsCards"
        :key="subscription.id"
        :subscription="subscription"
        :callback="(id) => activateSubscription(id)"
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
    const userSubscription = computed(
      () => store.getters.getUserSubscriptionID
    );

    const activateSubscription = (id) => {
      // console.log(id);
      const selectedSubscription = subscriptionsCards.value.find(
        (card) => card.id === id
      );

      console.log("выбрано: ", selectedSubscription);

      const currentUserSubscription = subscriptionsCards.value.find(
        (card) => card.id === userSubscription.value
      );

      console.log("текущая подписка: ", currentUserSubscription);

      try {
        if (selectedSubscription.price > currentUserSubscription.price) {
          store.dispatch("setUserSubscription");
          console.log("Подписка обновлена");
        } else {
          console.log("У вас уже имеется более лучшая подписка!");
        }
      } catch (error) {
        console.log("Ошибка обновления подписки");
        throw new Error(error);
      }
    };

    return {
      subscriptionsCards,
      activateSubscription,
    };
  },
};
</script>

<style></style>
