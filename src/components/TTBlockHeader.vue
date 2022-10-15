<template>
  <div class="header-main">
    <header class="header">
      <router-link to="main" class="header-link--logo">3Тонн</router-link>
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
      <div>
        <router-link to="signin" class="header-link--auth">Войти</router-link> |
        <router-link to="signup" class="header-link--reg"
          >Регистрация</router-link
        >
      </div>
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

    return {
      links,
    };
  },
};
</script>

<style></style>
