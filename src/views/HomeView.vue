<template>
  <div class="home">
    <button @click="addIncrement">Counter++ {{ counter }}</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const counter = computed(() => store.getters.getCounter);

    function addIncrement() {
      store.dispatch("increment", 1);
    }

    return {
      addIncrement,
      counter,
    };
  },
};
</script>
