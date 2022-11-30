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
import { errorNotify, successNotify } from "@/services/notifications";

export default {
  components: {
    TTCardSubscription,
  },
  setup() {
    const store = useStore();

    const subscriptionsCards = computed(
      () => store.getters.getSubscriptionCards
    );
    const tokens = computed(() => store.getters.getTokens);
    const userSubscription = computed(() => store.getters.getUserSubscription);

    const activateSubscription = (subscriptionCard) => {
      // console.log(id);
      const selectedSubscription = subscriptionsCards.value.find(
        (card) => card.id === subscriptionCard.id
      );

      console.log("выбрано: ", selectedSubscription);

      console.log("текущая подписка: ", userSubscription);

      try {
        const sendData = {
          id: subscriptionCard.id,
          access_token: tokens.value.access_token,
          start_date: subscriptionCard.start_date,
          day_count: subscriptionCard.day_count,
        };
        console.log(sendData);
        if (userSubscription.value) {
          if (selectedSubscription.price > userSubscription.value.price) {
            store.dispatch("setUserSubscription", sendData);
            successNotify("Абонемент обновлен");
          } else {
            errorNotify("У вас уже имеется более лучший абонемент!");
          }
        } else {
          store.dispatch("setUserSubscription", sendData);
          successNotify("Абонемент обновлен");
        }
      } catch (error) {
        errorNotify("Ошибка обновления абонемента!");
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
