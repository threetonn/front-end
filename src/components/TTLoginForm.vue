<template>
  <div
    class="login-form"
    :class="formType === 'signup' && 'login-form--height'"
  >
    <svg
      @click="handleClose"
      viewPort="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="1" y1="16" x2="16" y2="1" stroke="white" stroke-width="2" />
      <line x1="1" y1="1" x2="16" y2="16" stroke="white" stroke-width="2" />
    </svg>
    <p class="login-form__title">
      {{ formType === "signup" ? "Регистрация" : "Авторизация" }}
    </p>
    <template v-if="formType === 'signup'">
      <form class="login-form__form">
        <div class="login-form__inputs lf-inputs">
          <input
            class="lf-inputs__input"
            type="email"
            name="signup-email"
            id="signup-email"
            placeholder="Ваш Email-адрес"
            v-model="form.signup.email"
          />
          <input
            class="lf-inputs__input"
            type="password"
            name="signup-password"
            id="signup-password"
            placeholder="Ваш пароль"
            v-model="form.signup.password"
          />
          <input
            class="lf-inputs__input"
            type="password"
            name="signup-repassword"
            id="signup-repassword"
            placeholder="Повторите пароль"
            v-model="form.signup.repassword"
          />
        </div>
      </form>
    </template>
    <template v-else>
      <form class="login-form__form">
        <div class="login-form__inputs lf-inputs">
          <input
            class="lf-inputs__input"
            type="email"
            name="signin-email"
            id="signin-email"
            placeholder="Ваш Email-адрес"
            v-model="form.signin.email"
          />
          <input
            class="lf-inputs__input"
            type="password"
            name="signin-password"
            id="signin-password"
            placeholder="Ваш пароль"
            v-model="form.signin.password"
          />
        </div>
      </form>
    </template>
    <button
      class="lf-inputs__button"
      @click="formType === 'signup' ? signup : signin"
    >
      {{ formType === "signup" ? "Регистрация" : "Авторизация" }}
    </button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    formType: String,
  },
  setup() {
    const store = useStore();

    const form = reactive({
      signin: {
        email: "",
        password: "",
      },
      signup: {
        email: "",
        password: "",
        repassword: "",
      },
    });

    const handleClose = () => {
      clearForm();
      store.dispatch("hideActiveForm");
    };

    const clearForm = () => {
      for (const key in form.value) {
        if (Object.hasOwnProperty.call(form.value, key)) {
          form.value[key] = "";
        }
      }
    };

    return {
      form,
      handleClose,
    };
  },
};
</script>

<style></style>
