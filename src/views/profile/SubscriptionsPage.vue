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
    const userSubscription = computed(() => store.getters.getUserSubscription);

    const activateSubscription = (id) => {
      // console.log(id);
      const selectedSubscription = subscriptionsCards.value.find(
        (card) => card.id === id
      );

      console.log("выбрано: ", selectedSubscription);

      console.log("текущая подписка: ", userSubscription);

      try {
        if (selectedSubscription.price > userSubscription.value.price) {
          store.dispatch("setUserSubscription", selectedSubscription);
          // console.log("Подписка обновлена");
          successNotify("Абонемент обновлен");
        } else {
          errorNotify("У вас уже имеется более лучший абонемент!");
          // console.log("У вас уже имеется более лучшая подписка!");
        }
      } catch (error) {
        errorNotify("Ошибка обновления абонемента!");
        // console.log("Ошибка обновления подписки");
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
