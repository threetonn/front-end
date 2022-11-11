<template>
  <div
    class="subscription-card"
    :class="`subscription-card--${subscription.type}`"
  >
    <div>
      <div class="subscription-card__text-block">
        <p class="subscription-card__title">{{ subscription.title }}</p>
        <p class="subscription-card__price-month">
          <span class="price">{{ subscription.price }}</span>
          <span>руб./день</span>
        </p>
        <div>
          <p class="subscription-card__price-year--description">
            При оплате за год:
          </p>
          <p class="subscription-card__price-year">
            <span class="price">
              {{
                subscriptioDiscountCalculation(
                  subscription.price * state.subscriptionDays
                )
              }}
            </span>
            <span>руб./за</span>
            <span class="days">{{ state.subscriptionDays }}</span>
            <span>{{
              getNoun(state.subscriptionDays, "день", "дня", "дней")
            }}</span>
          </p>
          <p class="discount">
            Скидка: <span>{{ (computedDiscount * 100).toFixed(2) }}%</span>
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
    <div>
      <div class="subscription-card__sub-date">
        <div>
          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.subStartDate.$errors.length }"
          >
            <span>Начало: </span>
            <input
              v-model="state.subStartDate"
              class="subscription-card__date-input"
              type="date"
            />
            <div
              class="input-errors"
              v-for="error of v$.subStartDate.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
        <!-- <p>Начало: {{ currentDate.toLocaleDateString() }}</p> -->
        <p>Конец: {{ endDate.toLocaleDateString() }}</p>
      </div>

      <div
        class="lf-inputs__wrapper"
        :class="{ error: v$.subscriptionDays.$errors.length }"
      >
        <input
          class="subscription-card__days-input"
          type="number"
          name="sub-data"
          autocomplete="off"
          placeholder="Дни абонемента"
          v-model.number="state.subscriptionDays"
        />
        <div
          class="input-errors"
          v-for="error of v$.subscriptionDays.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <button
        @click="activateSubscription(subscription.id)"
        class="subscription-card__button"
        :disabled="isValid"
        :class="isValid && 'disabled'"
      >
        Активировать
      </button>
    </div>
  </div>
</template>

<script>
// import { $SERVICES } from "@/services/api";
import { computed, ref, watch, reactive } from "vue";
import { getNoun } from "@/services/noun.js";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, between } from "@vuelidate/validators";
export default {
  props: {
    subscription: Object,
    callback: Function,
  },
  setup(props) {
    const state = reactive({
      subscriptionDays: 1,
      subscriptionDiscount: 0.05,
      subStartDate: null,
    });

    const computedDiscount = computed(
      () => (state.subscriptionDays * state.subscriptionDiscount) / 100
    );

    const subscriptioDiscountCalculation = (sum) => {
      return Math.round(sum - sum * computedDiscount.value);
    };

    const isValid = ref(false);

    const currentDate = new Date();
    const endDate = ref(
      new Date(
        new Date().setDate(new Date().getDate() + state.subscriptionDays)
      )
    );

    const maxDateValidator = (value) => {
      return (
        new Date(new Date().setDate(new Date().getDate() + 30)) >=
          new Date(value) && new Date(value) >= new Date()
      );
    };

    const rules = computed(() => {
      return {
        subscriptionDays: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
          between: helpers.withMessage(
            "Абонемент не может быть меньше 1 и больше 365 дней",
            between(1, 365)
          ),
        },
        subStartDate: {
          required: helpers.withMessage("Необходимо выбрать дату!", required),
          maxDateValidator: helpers.withMessage(
            "Максимально отложить дату можно на 30 дней!",
            maxDateValidator
          ),
          // maxValue: maxValue(
          //   new Date(new Date().setDate(new Date().getDate() + 30))
          // ),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    const checkSubscription = () => {
      // serverError.value = null;
      v$.value.$touch();

      if (v$.value.$errors.length) {
        isValid.value = true;
        return console.log("Невалидно");
      }

      isValid.value = false;
      return console.log("Валидно");
    };

    watch(
      () => [state.subscriptionDays, state.subStartDate],
      () => {
        checkSubscription();
        endDate.value = new Date(
          new Date(state.subStartDate).setDate(
            new Date(state.subStartDate).getDate() + state.subscriptionDays
          )
        );
      }
    );

    const activateSubscription = (id) => {
      props.callback(id);
    };

    // const filterSubscriptions = subscriptionsCards.value.filter(
    //   (card) => card.price > userSubscription.value.price
    // );

    return {
      state,
      v$,
      getNoun,
      currentDate,
      endDate,
      isValid,
      subscriptioDiscountCalculation,
      computedDiscount,
      activateSubscription,
    };
  },
};
</script>

<style></style>
