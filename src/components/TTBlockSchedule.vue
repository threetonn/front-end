<template>
  <div class="schedule">
    <VueCal
      locale="ru"
      active-view="week"
      :disable-views="['years', 'year', 'month']"
      style="height: 500px"
      :events="events"
      :time-from="8 * 60"
      :time-to="22 * 60"
      :on-event-click="!noEventClick ? onEventClick : null"
    ></VueCal>

    <div class="card-popup" v-if="showDialog">
      <div class="card">
        <svg
          @click="handleClose"
          viewPort="0 0 16 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="1" y1="16" x2="16" y2="1" stroke="white" stroke-width="2" />
          <line x1="1" y1="1" x2="16" y2="16" stroke="white" stroke-width="2" />
        </svg>
        <div class="card__title">
          <span>{{ selectedEvent.title }}</span>
          <strong>{{
            selectedEvent.start && selectedEvent.start.format("DD/MM/YYYY")
          }}</strong>
        </div>
        <div class="card__content">
          <div class="card__detail">
            <strong>Детали тренировки</strong>
            <ul>
              <li>
                Тренер:
                <b>
                  {{
                    selectedEvent.trainer &&
                    selectedEvent.trainer.name +
                      " " +
                      selectedEvent.trainer.surname
                  }}
                </b>
              </li>
              <li>
                Местоположение:<br />
                <b>
                  {{ selectedEvent.location && selectedEvent.location.address }}
                </b>
              </li>
              <li>
                Начало в:
                <b>
                  {{ selectedEvent.start && selectedEvent.start.formatTime() }}
                </b>
              </li>
              <li>
                Конец в:
                <b>
                  {{ selectedEvent.end && selectedEvent.end.formatTime() }}
                </b>
              </li>
            </ul>
          </div>
          <div class="card__buttons">
            <button
              class="card__btn card__btn--signUp"
              @click="signUpTrain(selectedEvent.id)"
              v-if="
                userRole === 'client' && !selectedEvent.clients.includes(userID)
              "
            >
              Записаться
            </button>
            <button
              class="card__btn card__btn--unSignUp"
              @click="unSignUpTrain(selectedEvent.id)"
              v-if="
                userRole === 'client' && selectedEvent.clients.includes(userID)
              "
            >
              Отписаться
            </button>
            <button
              class="card__btn card__btn--signUpUsers"
              @click="signUpUsersForTrain(selectedEvent.id)"
              v-if="userRole === 'manager'"
            >
              Записать клиентов
            </button>
            <button
              class="card__btn card__btn--edit"
              @click="editTrain(selectedEvent.id)"
              v-if="userRole !== 'client'"
            >
              Изменить
            </button>
            <button
              class="card__btn card__btn--delete"
              @click="deleteTrain(selectedEvent.id)"
              v-if="userRole !== 'client'"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { ref } from "vue";

export default {
  components: {
    VueCal,
  },
  props: {
    events: Object,
    noEventClick: Boolean,
    signUpTrainCallback: Function,
    unSignUpTrainCallback: Function,
    signUpUsersForTrainCallback: Function,
    editTrainCallback: Function,
    deleteTrainCallback: Function,
    userRole: String,
    userID: Number,
  },
  setup(props) {
    const selectedEvent = ref({});
    const showDialog = ref(false);

    const handleClose = () => {
      showDialog.value = false;
    };

    const onEventClick = (event, e) => {
      selectedEvent.value = event;
      showDialog.value = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
      // console.log(selectedEvent.value);
    };

    const signUpTrain = (eventID) => {
      props.signUpTrainCallback(eventID);
      handleClose();
    };

    const unSignUpTrain = (eventID) => {
      props.unSignUpTrainCallback(eventID);
      handleClose();
    };

    const signUpUsersForTrain = (eventID) => {
      props.signUpUsersForTrainCallback(eventID);
      handleClose();
    };

    const editTrain = (eventID) => {
      props.editTrainCallback(eventID);
      handleClose();
    };

    const deleteTrain = (eventID) => {
      props.deleteTrainCallback(eventID);
      handleClose();
    };

    return {
      onEventClick,
      showDialog,
      selectedEvent,
      handleClose,
      signUpTrain,
      unSignUpTrain,
      signUpUsersForTrain,
      editTrain,
      deleteTrain,
    };
  },
};
</script>

<style></style>
