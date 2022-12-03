<template>
  <div class="main">
    <div class="login-from-wrapper" v-if="loginForm.showForm">
      <TTLoginForm :formType="loginForm.formType"></TTLoginForm>
    </div>
    <TTBlockHeader></TTBlockHeader>
    <TTBlockMain></TTBlockMain>
    <TTBlockTitle hashLink="program" titleName="Наши программы"></TTBlockTitle>
    <div class="block-2">
      <TTCardProgram
        v-for="program in workoutTypes"
        :key="program.id"
        :program="program"
      ></TTCardProgram>
    </div>
    <TTBlockTitle hashLink="trainers" titleName="Наши тренера"></TTBlockTitle>
    <div class="block-3">
      <carousel
        v-if="trainers"
        itemsToShow="2.5"
        :wrapAround="true"
        :transition="500"
      >
        <slide v-for="(trainer, idx) in trainers" :key="idx">
          <TTCardTrainer :trainer="trainer"></TTCardTrainer>
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
    <TTBlockTitle
      hashLink="timetable"
      titleName="Расписание тренировок"
    ></TTBlockTitle>
    <div class="block-4">
      <TTBlockSchedule
        style="width: 80%"
        noEventClick
        :events="scheduleEvents"
      ></TTBlockSchedule>
    </div>
    <TTBlockFooter></TTBlockFooter>
  </div>
</template>

<script>
import TTBlockHeader from "@/components/TTBlockHeader.vue";
import TTBlockMain from "@/components/TTBlockMain.vue";
import TTBlockFooter from "@/components/TTBlockFooter.vue";
import TTBlockSchedule from "@/components/TTBlockSchedule.vue";
import TTBlockTitle from "@/components/TTBlockTitle.vue";
import TTCardProgram from "@/components/TTCardProgram.vue";
import TTCardTrainer from "@/components/TTCardTrainer.vue";
import TTLoginForm from "@/components/TTLoginForm.vue";

import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  components: {
    TTBlockHeader,
    TTBlockMain,
    TTBlockFooter,
    TTBlockSchedule,
    TTBlockTitle,
    TTCardProgram,
    TTCardTrainer,
    TTLoginForm,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {
    const store = useStore();
    const trainers = computed(() => store.getters.getTrainers);
    const scheduleEvents = computed(() => store.getters.getScheduleEvents);
    const loginForm = computed(() => store.getters.getActiveForm);
    const workoutTypes = computed(() => store.getters.getWorkoutTypes);

    onBeforeMount(() => {
      if (!trainers.value) {
        store.dispatch("getTrainers");
      }
      if (scheduleEvents.value.length === 0) {
        store.dispatch("getScheduleEvents");
      }
      if (!workoutTypes.value) {
        store.dispatch("setWorkoutTypes");
      }
    });

    return {
      trainers,
      scheduleEvents,
      loginForm,
      workoutTypes,
    };
  },
};
</script>

<style></style>
