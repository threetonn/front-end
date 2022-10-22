<template>
  <div class="profile">
    <div class="profile__wrapper">
      <div class="profile__routes-block">
        <ul class="profile__links">
          <li class="profile__link" v-for="tab in tabs" :key="tab">
            <router-link :to="{ name: tab.route }">{{ tab.name }}</router-link>
          </li>
          <li>
            <a class="profile__link">Выйти</a>
          </li>
        </ul>
      </div>
      <div class="profile__content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
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
        icon: "hand-holding-usd",
        name: "Участники",
        route: "profile.users",
      },
    ]);

    return {
      tabs,
    };
  },
};
</script>

<style></style>
