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
      <TTCardTrainer
        v-for="trainer in trainers"
        :key="trainer.id"
        :trainer="trainer"
      ></TTCardTrainer>
    </div>
    <TTBlockTitle
      hashLink="timetable"
      titleName="Расписание тренировок"
    ></TTBlockTitle>
    <div class="block-4">
      <TTBlockSchedule :events="scheduleEvents"></TTBlockSchedule>
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
  },
  setup() {
    const store = useStore();
    const programs = computed(() => store.getters.getProgramCards);
    const trainers = computed(() => store.getters.getTrainerCards);
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
