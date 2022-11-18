<template>
  <div class="profile-page__add-train-form">
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
      <label class="shedule-label" for="trainStart">Начало тренировки: </label>
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
      <label class="shedule-label" for="trainDuration"
        >Длительность тренировки (мин.):
      </label>
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
            <option disabled value="">Выберите один из вариантов</option>
            <option
              v-for="item in workoutLocations"
              :selected="item.id === state.trainLocation"
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
            <option disabled value="">Выберите один из вариантов</option>
            <option
              v-for="item in workoutTypes"
              :selected="item.id === state.trainLocation"
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
      @click="onClickScheduleButton"
      class="button shedule-button"
      :disabled="formIsValid"
      :class="[
        'shedule-button--' + buttonStyle.class,
        formIsValid && 'disabled',
      ]"
    >
      {{ buttonStyle ? buttonStyle.name : "Отправить" }}
    </button>
  </div>
</template>

<script>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minValue, maxValue } from "@vuelidate/validators";
import { errorNotify, successNotify } from "@/services/notifications";

export default {
  props: {
    eventID: Number,
    eventName: String,
  },
  setup(props) {
    const store = useStore();
    const scheduleEvents = computed(() => store.getters.getScheduleEvents);
    const workoutTypes = computed(() => store.getters.getWorkoutTypes);
    const workoutLocations = computed(() => store.getters.getWorkoutLocations);

    // const user = computed(() => store.getters.getUser);
    const isTrainFormActive = ref(false);
    // const selectedPersonalEvents = ref(false);
    const formIsValid = ref(false);

    const scheduleEventByID = computed(() => {
      if (props.eventID) {
        return scheduleEvents.value.find((event) => event.id === props.eventID);
      }
      return null;
    });

    const calcMinutes = (start, finish) => {
      return (new Date(finish).getTime() - new Date(start).getTime()) / 60000;
    };

    const calcTrainDuration = computed(() => {
      return calcMinutes(
        scheduleEventByID.value.start,
        scheduleEventByID.value.end
      );
    });

    const buttonStyle = computed(() => {
      if (props.eventName === "create") {
        return { name: "Создать тренировку", class: "add" };
      }
      if (props.eventName === "update") {
        return { name: "Изменить тренировку", class: "edit" };
      }
      if (props.eventName === "delete") {
        return { name: "Удалить тренировку", class: "delete" };
      }
      return { name: "Отправить", class: "" };
    });

    const state = reactive({
      trainName: props.eventID ? scheduleEventByID.value.title : "",
      trainStart: props.eventID ? scheduleEventByID.value.start : "",
      trainEnd: props.eventID ? scheduleEventByID.value.end : "",
      trainLocation: props.eventID ? scheduleEventByID.value.location.id : "",
      trainType: props.eventID ? scheduleEventByID.value.type.id : "",
      trainDuration: props.eventID ? calcTrainDuration.value : 0,
    });

    console.log(state);

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

    const onClickScheduleButton = () => {
      if (props.eventName === "create") {
        return addTrain();
      }
      if (props.eventName === "update") {
        return editTrain();
      }
      // if (props.eventName === "delete") {
      //   return deleteTrain();
      // }
      return errorNotify("Невозможно выполнить действие");
    };

    const addTrain = () => {
      state.trainEnd = new Date(endDate.value).toString();
      state.trainStart = new Date(state.trainStart).toString();

      if (checkValidations()) {
        store.dispatch("addTrainInSchedule", state);
        clearForm();
        isTrainFormActive.value = false;
        successNotify("Тренировка добавлена!");
        return store.dispatch("hideScheduleEventsForm");
      } else {
        return errorNotify("Не удалось добавить тренировку");
      }
    };

    const editTrain = () => {
      state.trainEnd = new Date(endDate.value).toString();
      state.trainStart = new Date(state.trainStart).toString();

      if (checkValidations()) {
        const data = {
          id: props.eventID,
          train: state,
        };
        store.dispatch("editTrainInSchedule", data);
        clearForm();
        isTrainFormActive.value = false;
        successNotify("Тренировка обновлена!");
        return store.dispatch("hideScheduleEventsForm");
      } else {
        return errorNotify("Не удалось обновить тренировку");
      }
    };

    // const deleteTrain = () => {
    //   try {
    //     store.dispatch("deleteTrainInSchedule", props.eventID);
    //     isTrainFormActive.value = false;
    //     successNotify("Тренировка удалена!");
    //     return store.dispatch("hideScheduleEventsForm");
    //   } catch (error) {
    //     return errorNotify("Не удалось удалить тренировку");
    //   }
    // };

    return {
      v$,
      state,
      onClickScheduleButton,
      workoutLocations,
      workoutTypes,
      endDate,
      buttonStyle,
      formIsValid,
    };
  },
};
</script>

<style></style>
