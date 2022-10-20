<template>
  <div class="header-main">
    <header class="header">
      <router-link :to="{ name: 'main' }" class="header-link--logo"
        >3Тонн</router-link
      >
      <div class="middle-links">
        <a
          v-for="link in links"
          :key="link.id"
          :href="'#' + link.hashLink"
          class="header-link"
        >
          {{ link.nameRU }}
        </a>
        <!-- <a href="/" class="header-link">Главная</a>
        <a href="#program" class="header-link">Программы</a>
        <a href="#timetable" class="header-link">Расписание</a>
        <a href="#trainers" class="header-link">Тренера</a> -->
      </div>
      <template v-if="user">
        <div>
          <a class="header-link--auth">{{ user.name }}</a>
        </div>
      </template>
      <template v-else>
        <div>
          <a @click="displaySignInForm" class="header-link--auth">Войти</a>
          |
          <a @click="displaySignUpForm" class="header-link--reg">Регистрация</a>
        </div>
      </template>
    </header>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const links = computed(() => store.getters.getLinks);

    const displaySignInForm = () => {
      store.dispatch("displayActiveForm", "signin");
    };

    const displaySignUpForm = () => {
      store.dispatch("displayActiveForm", "signup");
    };

    const user = computed(() => store.getters.getUser);
    console.log(user);

    return {
      links,
      displaySignInForm,
      displaySignUpForm,
      user,
    };
  },
};
</script>

<style></style>
