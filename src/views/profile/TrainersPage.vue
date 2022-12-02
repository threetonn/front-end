<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Тренера</h1>
    <div class="profile-page__trainer-cards">
      <div
        class="trainer-card"
        v-for="trainer in trainers"
        :key="trainer.email"
      >
        <p class="trainer-card__title">
          {{ trainer.name + " " + trainer.surname }}
        </p>
        <template v-if="trainer.image">
          <img class="trainer-card__image" :src="trainer.image" />
        </template>
        <template v-else> Нет изображения </template>
        <button
          class="trainer-card__show-btn"
          @click="showTrainerInfo(trainer.email)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";
export default {
  setup() {
    const store = useStore();
    const trainers = computed(() => store.getters.getTrainers);
    // const showInfo = ref(null);

    onBeforeMount(() => {
      if (!trainers.value) {
        store.dispatch("getTrainers");
      }
    });

    const showTrainerInfo = (email) => {
      store.dispatch("showUserCard");
      store.dispatch(
        "selectUser",
        trainers.value.find((user) => user.email == email)
      );
      // showInfo.value === id ? (showInfo.value = null) : (showInfo.value = id);
    };

    const closeTrainerInfo = () => {
      store.dispatch("hideUserCard");
    };

    return {
      trainers,
      showTrainerInfo,
      closeTrainerInfo,
    };
  },
};
</script>

<style></style>
