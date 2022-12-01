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
      <button
        v-if="user.role === 'manager'"
        class="button"
        :class="isTrainFormActive && 'button--active'"
        @click="toggleActiveEventsForm"
      >
        {{ isTrainFormActive ? "Переключить обратно" : "Добавить тренировку" }}
      </button>
    </div>
    <template v-if="isTrainFormActive">
      <TTFormWorkout
        :eventID="scheduleSelectedEventID"
        :eventName="scheduleSelectedEventName"
      ></TTFormWorkout>
    </template>
    <TTBlockSchedule
      v-else
      :events="selectedPersonalEvents ? scheduleEvents : scheduleEvents"
      :signUpTrainCallback="signUpTrain"
      :editTrainCallback="editTrain"
      :deleteTrainCallback="deleteTrain"
    ></TTBlockSchedule>
  </div>
</template>

<script>
import TTBlockSchedule from "@/components/TTBlockSchedule.vue";
import TTFormWorkout from "@/components/TTFormWorkout.vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";
import { errorNotify } from "@/services/notifications";

export default {
  components: { TTBlockSchedule, TTFormWorkout },
  setup() {
    const store = useStore();

    const scheduleEvents = computed(() => store.getters.getScheduleEvents);
    const user = computed(() => store.getters.getUser);

    const scheduleSelectedEventID = computed(
      () => store.getters.getScheduleSelectedEventID
    );

    const isTrainFormActive = computed(
      () => store.getters.getScheduleEventsFormActive
    );
    const tokens = computed(() => store.getters.getTokens);

    const selectedPersonalEvents = ref(false);
    const formIsValid = ref(false);
    const scheduleSelectedEventName = ref("create");

    const toggleActiveEventsForm = () => {
      isTrainFormActive.value
        ? store.dispatch("hideScheduleEventsForm")
        : store.dispatch("showScheduleEventsForm");
    };

    const signUpTrain = (eventID) => {
      if (user.value.role === "client") {
        return console.log(eventID);
      }
      return errorNotify("Данное действие доступно только для клиентов!");
    };

    const editTrain = (eventID) => {
      if (user.value.role === "trainer") {
        scheduleSelectedEventName.value = "update";
        toggleActiveEventsForm();
        return store.dispatch("setScheduleSelectEventId", eventID);
      }
      if (user.value.role === "manager") {
        scheduleSelectedEventName.value = "update";
        toggleActiveEventsForm();
        return store.dispatch("setScheduleSelectEventId", eventID);
      }
      return errorNotify(
        "Данное действие доступно только для тренеров и менеджеров!"
      );
    };

    const deleteTrain = (eventID) => {
      const event = scheduleEvents.value.find((e) => e.id === eventID);
      if (user.value.role === "trainer") {
        if (
          event.trainer.email === user.value.email &&
          event.type === "personal"
        ) {
          let isConfirm = confirm("Удалить данную тренировку?");
          isConfirm &&
            store.dispatch("deleteTrainInSchedule", {
              id: eventID,
              role: user.value.role,
              access_token: tokens.value.access_token,
            });
        } else {
          return errorNotify("Удалить можно только персональные тренировки!");
        }
      }
      if (user.value.role === "manager") {
        if (event.type === "group") {
          let isConfirm = confirm("Удалить данную тренировку?");
          isConfirm &&
            store.dispatch("deleteTrainInSchedule", {
              id: eventID,
              role: user.value.role,
              access_token: tokens.value.access_token,
            });
        } else {
          return errorNotify("Удалить можно только групповые тренировки!");
        }
      }
      // return errorNotify(
      //   "Данное действие доступно только для тренеров и менеджеров!"
      // );
    };

    return {
      scheduleEvents,
      selectedPersonalEvents,
      isTrainFormActive,
      signUpTrain,
      editTrain,
      deleteTrain,
      formIsValid,
      toggleActiveEventsForm,
      scheduleSelectedEventID,
      scheduleSelectedEventName,
      user,
    };
  },
};
</script>

<style></style>
