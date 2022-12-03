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
          v-if="user.role !== 'manager'"
          @click="selectedPersonalEvents = true"
          :class="{ 'toggle-btn--active': selectedPersonalEvents }"
          class="toggle-btn"
        >
          Личное расписание
        </button>
      </div>
      <button
        v-if="user.role === 'manager' || user.role === 'trainer'"
        class="button"
        :class="isTrainFormActive && 'button--active'"
        @click="addTrain"
      >
        {{ isTrainFormActive ? "Переключить обратно" : "Добавить тренировку" }}
      </button>
    </div>
    <template v-if="isTrainFormActive">
      <TTFormWorkout
        :eventID="scheduleSelectedEventID"
        :eventName="scheduleSelectedEventName"
        :eventType="selectedPersonalEvents ? 'personal' : 'group'"
      ></TTFormWorkout>
    </template>
    <TTBlockSchedule
      v-else
      :events="selectedPersonalEvents ? personalEvents : scheduleEvents"
      :signUpTrainCallback="signUpTrain"
      :unSignUpTrainCallback="unSignUpTrain"
      :signUpUsersForTrainCallback="signUpUsersForTrain"
      :editTrainCallback="editTrain"
      :deleteTrainCallback="deleteTrain"
      :userRole="user.role"
      :userID="user.id"
    ></TTBlockSchedule>
    <template v-if="showUsersSignUpDialog">
      <div class="card-popup">
        <div class="card">
          <svg
            @click="handleCloseUsersSignUpDialog"
            viewPort="0 0 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="16"
              x2="16"
              y2="1"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="1"
              y1="1"
              x2="16"
              y2="16"
              stroke="white"
              stroke-width="2"
            />
          </svg>
          <div class="card__title">
            <span>Записать клиентов</span>
          </div>
          <div class="card__content">
            <div class="card__detail">
              <TTElementInputSelect
                fieldName="clients"
                type="text"
                label="email"
                formType="workoutUsersSignUp"
                placeholder="Клиенты"
                :callback="(userData) => sendSignUpUsersForTrain(userData)"
                :rules="[]"
                :options="clients"
                specialButton
              ></TTElementInputSelect>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TTBlockSchedule from "@/components/TTBlockSchedule.vue";
import TTFormWorkout from "@/components/TTFormWorkout.vue";
import TTElementInputSelect from "@/components/TTElementInputSelect.vue";

import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { errorNotify, successNotify } from "@/services/notifications";
import {
  signUpUsersForTrainAPI,
  signUpClientInTrainAPI,
  unSignUpClientInTrainAPI,
} from "@/api/sheduleAPI";

export default {
  components: { TTBlockSchedule, TTFormWorkout, TTElementInputSelect },
  setup() {
    const store = useStore();

    const scheduleEvents = computed(() => store.getters.getScheduleEvents);
    const personalEvents = computed(() => store.getters.getPersonalEvents);
    const tokens = computed(() => store.getters.getTokens);
    const user = computed(() => store.getters.getUser);
    const clients = computed(() => store.getters.getClients);

    const scheduleSelectedEventID = computed(
      () => store.getters.getScheduleSelectedEventID
    );

    const isTrainFormActive = computed(
      () => store.getters.getScheduleEventsFormActive
    );

    const selectedPersonalEvents = ref(false);
    const formIsValid = ref(false);
    const scheduleSelectedEventName = ref("create");

    const showUsersSignUpDialog = ref(false);
    const selectedEventShedule = ref(null);

    const handleCloseUsersSignUpDialog = () => {
      showUsersSignUpDialog.value = false;
    };

    const updateShedule = () => {
      const data = {
        access_token: tokens.value.access_token,
        role: user.value.role,
      };
      store.dispatch("getSchedulePesonalEvents", data);
    };

    watch(
      () => selectedPersonalEvents.value,
      () => {
        updateShedule();
      }
    );

    const sendSignUpUsersForTrain = (data) => {
      const clientsID = data.clients.map((client) => {
        return client.id;
      });
      const sendData = {
        id: selectedEventShedule.value,
        access_token: tokens.value.access_token,
        clients: clientsID,
      };
      signUpUsersForTrainAPI(sendData).then(() =>
        handleCloseUsersSignUpDialog()
      );
    };

    const toggleActiveEventsForm = () => {
      isTrainFormActive.value
        ? store.dispatch("hideScheduleEventsForm")
        : store.dispatch("showScheduleEventsForm");
    };

    const signUpTrain = (eventID) => {
      if (user.value.role === "client") {
        return signUpClientInTrainAPI({
          id: eventID,
          access_token: tokens.value.access_token,
        }).then(() => {
          updateShedule();
          successNotify("Успешная регистрация!");
        });
      }
      return errorNotify("Данное действие доступно только для клиентов!");
    };

    const unSignUpTrain = (eventID) => {
      if (user.value.role === "client") {
        return unSignUpClientInTrainAPI({
          id: eventID,
          access_token: tokens.value.access_token,
        }).then(() => {
          updateShedule();
          successNotify("Успешная отписка!");
        });
      }
      return errorNotify("Данное действие доступно только для клиентов!");
    };

    const signUpUsersForTrain = (eventID) => {
      if (user.value.role === "manager") {
        showUsersSignUpDialog.value = true;
        selectedEventShedule.value = eventID;

        return console.log(eventID);
      }
      return errorNotify("Данное действие доступно только для менеджеров!");
    };

    const addTrain = () => {
      scheduleSelectedEventName.value = "create";
      toggleActiveEventsForm();
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
      const concateItems = [...scheduleEvents.value, ...personalEvents.value];
      const event = concateItems.find((e) => e.id === eventID);
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
      personalEvents,
      isTrainFormActive,
      signUpTrain,
      unSignUpTrain,
      signUpUsersForTrain,
      addTrain,
      editTrain,
      deleteTrain,
      formIsValid,
      toggleActiveEventsForm,
      scheduleSelectedEventID,
      scheduleSelectedEventName,
      user,
      sendSignUpUsersForTrain,
      clients,
      showUsersSignUpDialog,
      handleCloseUsersSignUpDialog,
    };
  },
};
</script>

<style></style>
