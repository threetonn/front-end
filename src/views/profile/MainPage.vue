<template>
  <div class="profile">
    <div class="profile__wrapper">
      <div class="profile__routes-block">
        <ul class="profile__links">
          <li class="profile__link" v-for="tab in tabs" :key="tab">
            <template v-if="tab.access.length > 0">
              <router-link
                v-if="tab.access.includes(user.role)"
                active-class="profile__link--active"
                :to="{ name: 'profile.' + tab.route }"
                >{{ tab.name }}</router-link
              >
            </template>
            <template v-else>
              <router-link
                active-class="profile__link--active"
                :to="{ name: 'profile.' + tab.route }"
                >{{ tab.name }}</router-link
              >
            </template>
          </li>
          <li class="profile__link">
            <a @click="logout">Выйти</a>
          </li>
        </ul>
      </div>
      <div class="profile__content">
        <template v-if="showUserCard">
          <TTCardUserProfile
            :close="closeUserCard"
            :user="selectedUser"
          ></TTCardUserProfile>
        </template>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TTCardUserProfile from "@/components/TTCardUserProfile.vue";

export default {
  components: {
    TTCardUserProfile,
  },
  setup() {
    const store = useStore();
    const showUserCard = computed(() => store.getters.getShowUserCard);
    const selectedUser = computed(() => store.getters.getSelectedUser);
    const tabs = computed(() => store.getters.getRouteAccess);
    const user = computed(() => store.getters.getUser);
    const subscriptions = computed(() => store.getters.getSubscriptionCards);
    const workoutTypes = computed(() => store.getters.getWorkoutTypes);
    const workoutLocations = computed(() => store.getters.getWorkoutLocations);
    const trainers = computed(() => store.getters.getTrainers);
    const staff = computed(() => store.getters.getStaff);
    const clients = computed(() => store.getters.getClients);
    const scheduleEvents = computed(() => store.getters.getScheduleEvents);
    const routesAccess = computed(() => store.getters.getRouteAccess);

    const router = useRouter();

    onBeforeMount(() => {
      if (!user.value && localStorage.getItem("userLocal")) {
        const userLocal = JSON.parse(localStorage.getItem("userLocal"));
        store.dispatch("setUserWithToken", userLocal);
      }
      if (!subscriptions.value) {
        store.dispatch("getSubscriptionsList");
      }
      if (!workoutTypes.value) {
        store.dispatch("setWorkoutTypes");
      }
      if (!workoutLocations.value) {
        store.dispatch("setWorkoutLocations");
      }
      if (!trainers.value) {
        store.dispatch("getTrainers");
      }
      if (!staff.value) {
        store.dispatch("getStaff");
      }
      if (!clients.value) {
        store.dispatch("getClients");
      }
      if (!scheduleEvents.value.length > 0) {
        store.dispatch("getScheduleEvents");
      }
      if (!routesAccess.value) {
        store.dispatch("getRouteAccess");
      }
    });

    const closeUserCard = () => store.dispatch("hideUserCard");

    const logout = async () => {
      await store.dispatch("logoutUser");
      router.push("/");
    };

    return {
      tabs,
      user,
      selectedUser,
      showUserCard,
      logout,
      closeUserCard,
    };
  },
};
</script>

<style></style>
