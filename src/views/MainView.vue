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
        v-for="program in programs"
        :key="program.id"
        :program="program"
      ></TTCardProgram>
    </div>
    <TTBlockTitle hashLink="trainers" titleName="Наши тренера"></TTBlockTitle>
    <div class="block-3">
      <carousel :itemsToShow="2.5" :wrapAround="true" :transition="500">
        <slide v-for="trainer in trainers" :key="trainer.id">
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

import { computed } from "vue";
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
    const programs = computed(() => store.getters.getProgramCards);
    const trainers = computed(() => store.getters.getUsersByRole("trainer"));
    const scheduleEvents = computed(() => store.getters.getScheduleEvents);
    const loginForm = computed(() => store.getters.getActiveForm);

    // console.log(loginForm.value);

    return {
      programs,
      trainers,
      scheduleEvents,
      loginForm,
    };
  },
};
</script>

<style></style>
