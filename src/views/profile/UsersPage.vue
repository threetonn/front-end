<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Клиенты</h1>
    <div class="profile-page__trainer-cards">
      <div class="trainer-card" v-for="client in clients" :key="client.email">
        <p class="trainer-card__title">
          {{ client.name + " " + client.surname }}
        </p>
        <template v-if="client.image">
          <img class="trainer-card__image" :src="client.image" />
        </template>
        <template v-else> Нет изображения </template>
        <button
          class="trainer-card__show-btn"
          @click="showTrainerInfo(client.email)"
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
    const clients = computed(() => store.getters.getClients);
    console.log(clients);
    // const showInfo = ref(null);

    onBeforeMount(() => {
      if (!clients.value) {
        store.dispatch("getClients");
      }
    });

    const showTrainerInfo = (email) => {
      store.dispatch("showUserCard");
      store.dispatch(
        "selectUser",
        clients.value.find((user) => user.email == email)
      );
      // showInfo.value === id ? (showInfo.value = null) : (showInfo.value = id);
    };

    const closeTrainerInfo = () => {
      store.dispatch("hideUserCard");
    };

    return {
      clients,
      showTrainerInfo,
      closeTrainerInfo,
    };
  },
};
</script>

<style></style>
