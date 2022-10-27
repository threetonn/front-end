<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Расписание</h1>
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
    <TTBlockSchedule
      :events="selectedPersonalEvents ? scheduleEvents : scheduleEvents"
    ></TTBlockSchedule>
  </div>
</template>

<script>
import TTBlockSchedule from "@/components/TTBlockSchedule.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  components: { TTBlockSchedule },
  setup() {
    const store = useStore();
    const scheduleEvents = computed(() => store.getters.getScheduleEvents);
    // const schedulePersonalEvents = computed(
    //   () => store.getters.getPersonalScheduleEvents
    // );

    const selectedPersonalEvents = ref(false);

    return {
      scheduleEvents,
      selectedPersonalEvents,
    };
  },
};
</script>

<style></style>
