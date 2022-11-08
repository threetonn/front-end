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
    <div class="login-form__wrapper" v-if="formType === 'signup'">
      <form @submit.prevent="signup" class="login-form__form">
        <div class="login-form__inputs lf-inputs">
          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.email.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="email"
              name="signup-email"
              id="signup-email"
              placeholder="Ваш Email-адрес"
              v-model="state.signup.email"
            />

            <div
              class="input-errors"
              v-for="error of v$.signup.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.name.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="text"
              name="signup-name"
              id="signup-name"
              placeholder="Вашe имя"
              v-model="state.signup.name"
            />

            <div
              class="input-errors"
              v-for="error of v$.signup.name.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.surname.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="text"
              name="signup-surname"
              id="signup-surname"
              placeholder="Фамилия"
              v-model="state.signup.surname"
            />

            <div
              class="input-errors"
              v-for="error of v$.signup.surname.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.patronymic.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="text"
              name="signup-patronymic"
              id="signup-patronymic"
              placeholder="Отчество (необязательно)"
              v-model="state.signup.patronymic"
            />

            <div
              class="input-errors"
              v-for="error of v$.signup.patronymic.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.birthday.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="date"
              name="signup-birthday"
              id="signup-birthday"
              placeholder="Дата рождения"
              v-model="state.signup.birthday"
            />

            <div
              class="input-errors"
              v-for="error of v$.signup.birthday.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.phone.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="text"
              name="signup-phone"
              id="signup-phone"
              placeholder="Номер телефона"
              v-model="state.signup.phone"
            />

            <div
              class="input-errors"
              v-for="error of v$.signup.phone.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.password.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="password"
              name="signup-password"
              id="signup-password"
              placeholder="Ваш пароль"
              autocomplete="off"
              v-model="state.signup.password"
            />

            <div
              class="input-errors"
              v-for="error of v$.signup.password.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.repassword.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="password"
              name="signup-repassword"
              id="signup-repassword"
              placeholder="Повторите пароль"
              autocomplete="off"
              v-model="state.signup.repassword"
            />

            <div
              class="input-errors"
              v-for="error of v$.signup.repassword.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signup.gender.$errors.length }"
          >
            <div class="gender">
              <span class="gender__text">Пол:</span>
              <div class="gender__group">
                <input
                  class="gender__input"
                  type="radio"
                  id="male"
                  name="radio-group"
                  value="male"
                  v-model="state.signup.gender"
                />
                <label for="male">Муж.</label>
              </div>
              <div class="gender__group">
                <input
                  class="gender__input"
                  type="radio"
                  id="female"
                  name="radio-group"
                  value="female"
                  v-model="state.signup.gender"
                />
                <label for="female">Жен.</label>
              </div>
            </div>

            <div
              class="input-errors"
              v-for="error of v$.signup.gender.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div v-if="serverError" class="error-msg">{{ serverError }}</div>
        </div>
      </form>
    </div>
    <div class="login-form__wrapper" v-else>
      <form @submit.prevent="signin" class="login-form__form">
        <div class="login-form__inputs lf-inputs">
          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signin.email.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="email"
              name="signin-email"
              id="signin-email"
              placeholder="Ваш Email-адрес"
              v-model="state.signin.email"
            />
            <div
              class="input-errors"
              v-for="error of v$.signin.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div
            class="lf-inputs__wrapper"
            :class="{ error: v$.signin.password.$errors.length }"
          >
            <input
              class="lf-inputs__input"
              type="password"
              name="signin-password"
              id="signin-password"
              placeholder="Ваш пароль"
              autocomplete="off"
              v-model="state.signin.password"
            />
            <div
              class="input-errors"
              v-for="error of v$.signin.password.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div v-if="serverError" class="error-msg">{{ serverError }}</div>
        </div>
      </form>
    </div>
    <button
      class="lf-inputs__button"
      @click.prevent="formType === 'signup' ? signup() : signin()"
      :disabled="isLoading"
      :class="isLoading && 'disabled'"
    >
      {{ formType === "signup" ? "Регистрация" : "Авторизация" }}
    </button>
  </div>
</template>

<script>
// import { $SERVICES } from "@/services/api";
import { $ERRORS_LIST } from "@/services/errors";
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  minLength,
  sameAs,
} from "@vuelidate/validators";

export default {
  props: {
    formType: String,
  },
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const serverError = ref(null);

    const state = reactive({
      signin: {
        email: "",
        password: "",
      },
      signup: {
        email: "",
        name: "",
        surname: "",
        patronymic: "",
        birthday: "",
        phone: "",
        gender: "",
        password: "",
        repassword: "",
      },
    });

    const phoneValidator = (str) => {
      const regExp =
        // eslint-disable-next-line no-useless-escape
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      const result = regExp.exec(str);
      return result;
    };

    const rules = computed(() => {
      return {
        signin: {
          email: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
            email: helpers.withMessage("Почта неверно заполнена", email),
          },
          password: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
          },
        },
        signup: {
          email: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
            email: helpers.withMessage("Почта неверно заполнена", email),
          },
          name: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
          },
          surname: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
          },
          patronymic: "",
          birthday: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
          },
          phone: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
            phoneValidator: helpers.withMessage(
              "Неверный формат номера",
              phoneValidator
            ),
          },
          gender: {
            required: helpers.withMessage("Не выбран пол", required),
          },
          password: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
            minLength: helpers.withMessage(
              "Пароль меньше 8 символов",
              minLength(8)
            ),
          },
          repassword: {
            required: helpers.withMessage(
              "Поле обязательно для заполнения",
              required
            ),
            sameAs: helpers.withMessage(
              "Пароли не совпадают",
              sameAs(state.signup.password)
            ),
          },
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    const handleClose = () => {
      clearForm();
      store.dispatch("hideActiveForm");
    };

    const clearForm = () => {
      for (const key in state.value) {
        if (Object.hasOwnProperty.call(state.value, key)) {
          state.value[key] = "";
        }
      }
    };

    const signup = () => {
      serverError.value = null;
      isLoading.value = true;
      v$.value.signup.$touch();

      if (v$.value.signup.$errors.length) {
        isLoading.value = false;
        return console.log("Невалидно");
      }

      try {
        store.dispatch("signUpUser", state.signup);
        isLoading.value = false;
        store.dispatch("hideActiveForm");
      } catch (error) {
        console.log(error);
        return (isLoading.value = false);
      }

      // const sendFormData = async () => {
      //   const rawResponse = await fetch(`${$SERVICES.API}/auth/signup`, {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(state.signup),
      //   });
      //   const content = await rawResponse.json();

      //   console.log(content);
      //   isLoading.value = false;
      // };

      // sendFormData();

      return console.log("Валидно");
    };

    const signin = () => {
      serverError.value = null;
      isLoading.value = true;
      v$.value.signin.$touch();

      if (v$.value.signin.$errors.length) {
        isLoading.value = false;
      }

      try {
        store.dispatch("signInUser", state.signin);
        isLoading.value = false;
        store.dispatch("hideActiveForm");
      } catch (error) {
        isLoading.value = false;
        serverError.value = $ERRORS_LIST.NOT_CONNECTED;
        throw new Error(error);
      }

      // const sendFormData = async () => {
      //   try {
      //     const rawResponse = await fetch(`${$SERVICES.API}/auth/signin`, {
      //       method: "POST",
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(state.signin),
      //     });
      //     const content = await rawResponse.json();
      //     content && store.dispatch("setToken", content);
      //     getUser();
      //   } catch (error) {
      //     isLoading.value = false;
      //     serverError.value = $ERRORS_LIST.NOT_CONNECTED;
      //     throw new Error(error);
      //   }

      // const getUser = async () => {
      //   try {
      //     const tokens = store.getters.getTokens;
      //     const rawResponse = await fetch(`${$SERVICES.API}/me`, {
      //       method: "GET",
      //       headers: {
      //         Accept: "*/*",
      //         Authorization: `Bearer ${tokens.accessToken}`,
      //       },
      //     });
      //     const content = await rawResponse.json();

      //     content && store.dispatch("setUser", content);

      //     store.dispatch("hideActiveForm");

      //     isLoading.value = false;
      //   } catch (error) {
      //     isLoading.value = false;
      //     serverError.value = $ERRORS_LIST.NOT_USER_FIND;
      //     throw new Error(error);
      //   }
      // };
      // };

      // sendFormData();
    };

    // console.log(v$.value);

    return {
      state,
      v$,
      handleClose,
      signup,
      signin,
      isLoading,
      serverError,
    };
  },
};
</script>

<style></style>
