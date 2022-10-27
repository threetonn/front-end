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
      :on-event-click="onEventClick"
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
          <p class="card__text" v-html="selectedEvent.contentFull" />
          <div class="card__detail">
            <strong>Детали тренировки:</strong>
            <ul>
              <li>
                Начало в:
                {{ selectedEvent.start && selectedEvent.start.formatTime() }}
              </li>
              <li>
                Конец в:
                {{ selectedEvent.end && selectedEvent.end.formatTime() }}
              </li>
            </ul>
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
  },
  setup() {
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

      console.log(event);
      console.log(e);
      // console.log(selectedEvent.value);
    };

    return {
      onEventClick,
      showDialog,
      selectedEvent,
      handleClose,
    };
  },
};
</script>

<style></style>
