<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Тренера</h1>
    <div class="profile-page__trainer-cards">
      <div class="trainer-card" v-for="trainer in trainers" :key="trainer.id">
        <p class="trainer-card__title">{{ trainer.name }}</p>
        <img
          class="trainer-card__image"
          :src="require(`@/assets/images/trainers/${trainer.img}.png`)"
          :alt="trainer.imgAlt"
        />
        <button
          class="trainer-card__show-btn"
          @click="showTrainerInfo(trainer.id)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const trainers = computed(() => store.getters.getUsersByRole);
    // const showInfo = ref(null);

    const showTrainerInfo = (id) => {
      store.dispatch("showUserCard");
      store.dispatch(
        "selectUser",
        trainers.value.find((user) => user.id == id)
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
