<template>
  <div class="main">
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
      <div class="schedule">
        <VueCal
          locale="ru"
          active-view="week"
          :disable-views="['years', 'year', 'month']"
          style="height: 500px"
          :events="scheduleEvents"
          :time-from="8 * 60"
          :time-to="22 * 60"
        ></VueCal>
      </div>

      <!-- <TTBlockSchedule></TTBlockSchedule> -->
    </div>
    <TTBlockFooter></TTBlockFooter>
  </div>
</template>

<script>
import TTBlockHeader from "@/components/TTBlockHeader.vue";
import TTBlockMain from "@/components/TTBlockMain.vue";
import TTBlockFooter from "@/components/TTBlockFooter.vue";
// import TTBlockSchedule from "@/components/TTBlockSchedule.vue";
import TTBlockTitle from "@/components/TTBlockTitle.vue";
import TTCardProgram from "@/components/TTCardProgram.vue";
import TTCardTrainer from "@/components/TTCardTrainer.vue";

import { computed } from "vue";
import { useStore } from "vuex";

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: {
    TTBlockHeader,
    TTBlockMain,
    TTBlockFooter,
    // TTBlockSchedule,
    TTBlockTitle,
    TTCardProgram,
    TTCardTrainer,
    VueCal,
  },
  setup() {
    const store = useStore();
    const programs = computed(() => store.getters.getProgramCards);
    const trainers = computed(() => store.getters.getTrainerCards);
    const scheduleEvents = computed(() => store.getters.getScheduleEvents);

    // console.log(programs.value);

    return {
      programs,
      trainers,
      scheduleEvents,
    };
  },
};
</script>

<style></style>
