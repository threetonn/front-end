<template>
  <div class="profile">
    <div class="profile__wrapper">
      <div class="profile__routes-block">
        <ul class="profile__links">
          <li class="profile__link" v-for="tab in tabs" :key="tab">
            <router-link
              active-class="profile__link--active"
              :to="{ name: tab.route }"
              >{{ tab.name }}</router-link
            >
          </li>
          <li class="profile__link">
            <a>Выйти</a>
          </li>
        </ul>
      </div>
      <div class="profile__content">
        <template v-if="showUserCard">
          <TTCardUserProfile :user="selectedUser"></TTCardUserProfile>
        </template>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import TTCardUserProfile from "@/components/TTCardUserProfile.vue";

export default {
  components: {
    TTCardUserProfile,
  },
  setup() {
    const tabs = ref([
      {
        icon: "user",
        name: "Профиль",
        route: "profile.account",
      },
      {
        icon: "user-edit",
        name: "Расписание",
        route: "profile.schedule",
      },
      {
        icon: "user-lock",
        name: "Абонементы",
        route: "profile.subscriptions",
      },
      {
        icon: "ruble-sign",
        name: "Тренера",
        route: "profile.trainers",
      },
      {
        icon: "ruble-sign",
        name: "Персонал",
        route: "profile.staff",
      },
      {
        icon: "hand-holding-usd",
        name: "Клиенты",
        route: "profile.users",
      },
    ]);

    const store = useStore();
    const showUserCard = computed(() => store.getters.getShowUserCard);
    const selectedUser = computed(() => store.getters.getSelectedUser);

    return {
      tabs,
      selectedUser,
      showUserCard,
    };
  },
};
</script>

<style></style>
