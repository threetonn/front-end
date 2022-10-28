<template>
  <div
    class="subscription-card"
    :class="`subscription-card--${subscription.type}`"
  >
    <div>
      <div class="subscription-card__text-block">
        <p class="subscription-card__title">{{ subscription.title }}</p>
        <p class="subscription-card__price-month">
          <span class="price">{{ subscription.priceM }}</span>
          <span>руб./месяц</span>
        </p>
        <div>
          <p class="subscription-card__price-year--description">
            При оплате за год:
          </p>
          <p class="subscription-card__price-year">
            <span class="price">
              {{ Math.floor(subscription.priceY / 12) }}
            </span>
            <span>руб./месяц</span>
          </p>
        </div>
      </div>
      <ul class="subscription-card__list">
        <li
          class="subscription-card__list-item"
          v-for="(item, idx) in subscription.list"
          :key="idx"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L10 18L20 6"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <button
      @click="activateSubscription(subscription.id)"
      class="subscription-card__button"
    >
      Активировать
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    subscription: Object,
  },
  setup() {
    const store = useStore();

    const subscriptionsCards = computed(
      () => store.getters.getSubscriptionCards
    );
    const userSubscription = computed(
      () => store.getters.getUserSubscriptionID
    );

    // const filterSubscriptions = subscriptionsCards.value.filter(
    //   (card) => card.price > userSubscription.value.price
    // );

    const activateSubscription = (id) => {
      const selectedSubscription = subscriptionsCards.value.find(
        (card) => card.id === id
      );

      const currentUserSubscription = subscriptionsCards.value.find(
        (card) => card.id === userSubscription.value
      );

      if (selectedSubscription.price > currentUserSubscription.price) {
        try {
          store.dispatch("setUserSubscription");
          console.log("Подписка обновлена");
        } catch (error) {
          console.log("Ошибка обновления подписки");
          throw new Error(error);
        }
      } else {
        console.log("У вас уже имеется более лучшая подписка!");
      }
    };

    return {
      activateSubscription,
    };
  },
};
</script>

<style></style>
