<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Персонал</h1>
    <div class="profile-page__trainer-cards">
      <div class="trainer-card" v-for="staff in staffs" :key="staff.email">
        <p class="trainer-card__title">
          {{ staff.name + " " + staff.surname }}
        </p>
        <template v-if="staff.image">
          <img class="trainer-card__image" :src="staff.image" />
        </template>
        <template v-else> Нет изображения </template>
        <button
          class="trainer-card__show-btn"
          @click="showTrainerInfo(staff.email)"
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
    const staffs = computed(() => store.getters.getStaff);
    // const showInfo = ref(null);

    onBeforeMount(() => {
      if (!staffs.value) {
        store.dispatch("getStaff");
      }
    });

    const showTrainerInfo = (email) => {
      store.dispatch("showUserCard");
      store.dispatch(
        "selectUser",
        staffs.value.find((user) => user.email == email)
      );
      // showInfo.value === id ? (showInfo.value = null) : (showInfo.value = id);
    };

    const closeTrainerInfo = () => {
      store.dispatch("hideUserCard");
    };

    return {
      staffs,
      showTrainerInfo,
      closeTrainerInfo,
    };
  },
};
</script>

<style></style>
