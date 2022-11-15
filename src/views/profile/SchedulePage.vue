<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Расписание</h1>
    <div class="profile-page__toggle-shedule--buttons">
      <div class="profile-page__toggle-shedule">
        <button
          @click="selectedPersonalEvents = false"
          :class="{ 'toggle-btn--active': !selectedPersonalEvents }"
          class="toggle-btn"
        >
          Общее расписание
        </button>
        <button
          @click="selectedPersonalEvents = true"
          :class="{ 'toggle-btn--active': selectedPersonalEvents }"
          class="toggle-btn"
        >
          Личное расписание
        </button>
      </div>
      <button class="button" @click="isTrainFormActive = !isTrainFormActive">
        Добавить тренировку
      </button>
    </div>
    <div v-if="isTrainFormActive" class="profile-page__add-train-form">
      <div
        class="lf-inputs__wrapper"
        :class="{ error: v$.trainName.$errors.length }"
      >
        <input
          class="lf-inputs__input"
          type="text"
          name="trainName"
          id="trainName"
          placeholder="Название тренировки"
          v-model="state.trainName"
        />

        <div
          class="input-errors"
          v-for="error of v$.trainName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <div
        class="lf-inputs__wrapper"
        :class="{ error: v$.trainStart.$errors.length }"
      >
        <label class="shedule-label" for="trainStart"
          >Начало тренировки:
        </label>
        <input
          class="lf-inputs__input date-input"
          type="datetime-local"
          name="trainStart"
          id="trainStart"
          placeholder="Начало тренировки"
          v-model="state.trainStart"
        />

        <div
          class="input-errors"
          v-for="error of v$.trainStart.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <div
        class="lf-inputs__wrapper"
        :class="{ error: v$.trainDuration.$errors.length }"
      >
        <input
          class="lf-inputs__input"
          type="number"
          name="trainDuration"
          id="trainDuration"
          placeholder="Длительность тренировки"
          v-model="state.trainDuration"
        />

        <div
          class="input-errors"
          v-for="error of v$.trainDuration.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <div class="lf-inputs__wrapper">
        <label class="shedule-label" for="trainEnd">Конец тренировки</label>
        <p class="shedule-p">
          {{ endDate !== "" ? endDate.toLocaleString() : "-" }}
        </p>
      </div>

      <div
        class="lf-inputs__wrapper"
        :class="{ error: v$.trainLocation.$errors.length }"
      >
        <div class="shedule-select">
          <label for="location-select">Местоположение</label>
          <div class="custom-select">
            <select v-model="state.trainLocation" id="location-select">
              <option
                v-for="item in workoutLocations"
                :key="item.id"
                :value="item.id"
              >
                {{ item.description }}
              </option>
            </select>
          </div>
        </div>

        <div
          class="input-errors"
          v-for="error of v$.trainLocation.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div
        class="lf-inputs__wrapper"
        :class="{ error: v$.trainType.$errors.length }"
      >
        <div class="shedule-select">
          <label for="type-select">Тип тренировки</label>
          <div class="custom-select">
            <select v-model="state.trainType" id="type-select">
              <option
                v-for="item in workoutTypes"
                :key="item.id"
                :value="item.id"
              >
                {{ item.description }}
              </option>
            </select>
          </div>
        </div>

        <div
          class="input-errors"
          v-for="error of v$.trainType.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <button
        @click="addTrain"
        class="button shedule-button"
        :disabled="formIsValid"
        :class="formIsValid && 'disabled'"
      >
        Создать
      </button>
    </div>
    <TTBlockSchedule
      v-else
      :events="selectedPersonalEvents ? scheduleEvents : scheduleEvents"
    ></TTBlockSchedule>
  </div>
</template>

<script>
import TTBlockSchedule from "@/components/TTBlockSchedule.vue";
// eslint-disable-next-line no-unused-vars
import { computed, ref, reactive, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minValue, maxValue } from "@vuelidate/validators";
import { errorNotify, successNotify } from "@/services/notifications";

export default {
  components: { TTBlockSchedule },
  setup() {
    const store = useStore();
    const scheduleEvents = computed(() => store.getters.getScheduleEvents);
    const isTrainFormActive = ref(false);
    const selectedPersonalEvents = ref(false);
    const formIsValid = ref(false);
    // const schedulePersonalEvents = computed(
    //   () => store.getters.getPersonalScheduleEvents
    // );

    // const workoutTypes = computed(() => store.getters.getWorkoutTypes);

    // onBeforeMount(() => {
    //   if (!workoutTypes.value.length) {
    //     store.dispatch("setWorkoutTypes");
    //   }
    // });

    const workoutLocations = ref([
      { id: 1, description: "Location1" },
      { id: 2, description: "Location2" },
      { id: 3, description: "Location3" },
    ]);
    const workoutTypes = ref([
      { id: 1, description: "Йога" },
      { id: 2, description: "Чайхана" },
      { id: 3, description: "Групповая" },
    ]);

    const state = reactive({
      trainName: "",
      trainStart: "",
      trainEnd: "",
      trainLocation: "",
      trainType: "",
      trainDuration: 0,
    });

    // const currentDate = new Date();
    const endDate = computed(() => {
      if (state.trainStart) {
        return new Date(
          new Date(state.trainStart).setMinutes(
            new Date().getMinutes() + state.trainDuration
          )
        );
      }
      return "";
    });

    const maxDateValidator = (value) => {
      return (
        new Date(new Date().setDate(new Date().getDate() + 7)) >=
          new Date(value) && new Date(value) >= new Date()
      );
    };

    const rules = computed(() => {
      return {
        trainName: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
        },
        trainDuration: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
          minValue: helpers.withMessage(
            "Тренировка должна быть не менее 30 минут",
            minValue(30)
          ),
          maxValue: helpers.withMessage(
            "Тренировка должна быть не более 240 минут",
            maxValue(240)
          ),
        },
        trainStart: {
          required: helpers.withMessage("Необходимо выбрать дату!", required),
          maxDateValidator: helpers.withMessage(
            "Максимально отложить дату можно на 7 дней!",
            maxDateValidator
          ),
        },
        trainEnd: {
          required: helpers.withMessage("Необходимо выбрать дату!", required),
          maxDateValidator: helpers.withMessage(
            "Максимально отложить дату можно на 7 дней!",
            maxDateValidator
          ),
        },
        trainLocation: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
        },
        trainType: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    const checkValidations = () => {
      // serverError.value = null;
      v$.value.$touch();

      if (v$.value.$errors.length) {
        // formIsValid.value = true;
        return false;
      }

      // formIsValid.value = false;
      return true;
    };

    const clearForm = () => {
      state.trainName = "";
      state.trainStart = "";
      state.trainEnd = "";
      state.trainLocation = "";
      state.trainType = "";
      state.trainDuration = 0;
    };

    const addTrain = () => {
      state.trainEnd = new Date(endDate.value).toString();
      state.trainStart = new Date(state.trainStart).toString();

      if (checkValidations()) {
        store.dispatch("addTrainInSchedule", state);
        clearForm();
        isTrainFormActive.value = false;
        return successNotify("Тренировка добавлена!");
      } else {
        return errorNotify("Не удалось добавить тренировку");
      }
    };

    return {
      v$,
      state,
      scheduleEvents,
      selectedPersonalEvents,
      isTrainFormActive,
      addTrain,
      workoutLocations,
      workoutTypes,
      formIsValid,
      endDate,
    };
  },
};
</script>

<style></style>
