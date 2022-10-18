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
    ></VueCal>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: {
    VueCal,
  },
  props: {
    events: Object,
  },
};
</script>

<style></style>
