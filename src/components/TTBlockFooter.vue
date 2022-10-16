<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <div class="footer-block">
        <p class="footer-block--title footer-link">
          <router-link :to="{ name: 'main' }">3 ТОНН</router-link>
        </p>
        <div class="footer-block--text">
          <p>
            Независимо от вашей текущей формы, после посещения наших сеансов вы
            будете в лучшей физической форме!
          </p>
        </div>
      </div>
      <div class="footer-block">
        <p class="footer-block--title">НАВИГАЦИЯ</p>
        <nav class="footer-block--navigation">
          <a
            v-for="link in links"
            :key="link.id"
            :href="'#' + link.hashLink"
            class="header-link"
          >
            {{ link.nameRU }}
          </a>
        </nav>
      </div>
      <div class="footer-block">
        <p class="footer-block--title">КОНТАКТЫ</p>
        <div class="footer-block--text">
          <p>
            Адрес: просп. Наставников, 19, корп. 1, Санкт-Петербург<br />
            Почта: threetonn@rambler.ru<br />
            Телефон: +7 8182 69-44-69
          </p>
        </div>
      </div>
      <div class="footer-block">
        <p class="footer-block--title">МЫ ОТКРЫТЫ</p>
        <div class="footer-block--text">
          <p>
            ПН-СР: с 10:00 до 22:00<br />ЧТ-ПТ: с 12:00 до 21:00<br />СБ: с 9:00
            до 16:00
          </p>
        </div>
      </div>
    </div>
  </footer>
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
