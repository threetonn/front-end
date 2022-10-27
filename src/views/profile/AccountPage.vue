<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Профиль</h1>
    <div class="profile-page__inputs">
      <div class="profile-photo">
        <label class="profile-photo__label" for="profile-input">
          <span>Выберите фото</span>
          <svg
            width="54"
            height="46"
            viewBox="0 0 54 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M49 7.5H40.5L38.475 1.825C38.3351 1.43668 38.0787 1.10101 37.7409 0.86386C37.4031 0.626709 37.0003 0.499636 36.5875 0.500001H17.4125C16.5688 0.500001 15.8125 1.03125 15.5312 1.825L13.5 7.5H5C2.2375 7.5 0 9.7375 0 12.5V41C0 43.7625 2.2375 46 5 46H49C51.7625 46 54 43.7625 54 41V12.5C54 9.7375 51.7625 7.5 49 7.5ZM49.5 41C49.5 41.275 49.275 41.5 49 41.5H5C4.725 41.5 4.5 41.275 4.5 41V12.5C4.5 12.225 4.725 12 5 12H16.6688L17.7375 9.0125L19.1688 5H34.825L36.2562 9.0125L37.325 12H49C49.275 12 49.5 12.225 49.5 12.5V41ZM27 16C21.475 16 17 20.475 17 26C17 31.525 21.475 36 27 36C32.525 36 37 31.525 37 26C37 20.475 32.525 16 27 16ZM27 32C23.6875 32 21 29.3125 21 26C21 22.6875 23.6875 20 27 20C30.3125 20 33 22.6875 33 26C33 29.3125 30.3125 32 27 32Z"
              fill="black"
            />
          </svg>
        </label>
        <input id="profile-input" type="file" />
      </div>
      <div class="profile-inputs">
        <div class="profile-inputs__wrapper">
          <input
            class="profile-inputs__input"
            type="email"
            name="signup-email"
            id="signup-email"
            disabled
            placeholder="Ваш Email-адрес"
          />
        </div>
        <div class="profile-inputs__wrapper">
          <input
            class="profile-inputs__input"
            type="date"
            name="signup-birthday"
            id="signup-birthday"
            placeholder="Дата рождения"
            disabled
          />
        </div>
        <div
          class="profile-inputs__wrapper"
          :class="{ error: v$.name.$errors.length }"
        >
          <input
            class="profile-inputs__input"
            type="text"
            name="signup-name"
            id="signup-name"
            placeholder="Ваше имя"
            v-model="state.name"
          />

          <div
            class="input-errors"
            v-for="error of v$.name.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div
          class="profile-inputs__wrapper"
          :class="{ error: v$.surname.$errors.length }"
        >
          <input
            class="profile-inputs__input"
            type="text"
            name="signup-surname"
            id="signup-surname"
            placeholder="Ваша фамилия"
            v-model="state.surname"
          />

          <div
            class="input-errors"
            v-for="error of v$.surname.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div
          class="profile-inputs__wrapper"
          :class="{ error: v$.patronymic.$errors.length }"
        >
          <input
            class="profile-inputs__input"
            type="text"
            name="signup-patronymic"
            id="signup-patronymic"
            placeholder="Ваше отчество"
            v-model="state.patronymic"
          />

          <div
            class="input-errors"
            v-for="error of v$.patronymic.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div
          class="profile-inputs__wrapper"
          :class="{ error: v$.phone.$errors.length }"
        >
          <input
            class="profile-inputs__input"
            type="text"
            name="signup-phone"
            id="signup-phone"
            placeholder="Ваш номер телефона"
            v-model="state.phone"
          />

          <div
            class="input-errors"
            v-for="error of v$.phone.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div
          class="profile-inputs__wrapper"
          :class="{ error: v$.password.$errors.length }"
        >
          <input
            class="profile-inputs__input"
            type="password"
            name="signup-password"
            id="signup-password"
            placeholder="Новый пароль"
            v-model="state.password"
          />

          <div
            class="input-errors"
            v-for="error of v$.password.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div
          class="profile-inputs__wrapper"
          :class="{ error: v$.repassword.$errors.length }"
        >
          <input
            class="profile-inputs__input"
            type="password"
            name="signup-repassword"
            id="signup-repassword"
            placeholder="Повторите пароль"
            v-model="state.repassword"
          />

          <div
            class="input-errors"
            v-for="error of v$.repassword.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div
          class="profile-inputs__wrapper"
          :class="{ error: v$.gender.$errors.length }"
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
                v-model="state.gender"
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
                v-model="state.gender"
              />
              <label for="female">Жен.</label>
            </div>
          </div>

          <div
            class="input-errors"
            v-for="error of v$.gender.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <button
          class="profile-inputs__button"
          @click.prevent="changeUserData"
          :disabled="isLoading"
          :class="isLoading && 'disabled'"
        >
          Изменить
        </button>
      </div>
    </div>
    <div v-if="serverError" class="error-msg">{{ serverError }}</div>
    <!-- <p>Фото</p>
    <p>ФИО инпуты</p>
    <p>Дата рождения</p>
    <p>Email залоченный инпут</p>
    <p>Номер телефона инпут</p>
    <p>Пароль инпут</p>
    <p>Пол инпуты</p> -->
  </div>
</template>

<script>
import { $SERVICES } from "@/services/api";
import { $ERRORS_LIST } from "@/services/errors";
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minLength, sameAs } from "@vuelidate/validators";

export default {
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const serverError = ref(null);

    const state = reactive({
      email: "",
      name: "",
      surname: "",
      patronymic: "",
      birthday: "",
      phone: "",
      gender: "",
      password: "",
      repassword: "",
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
            sameAs(state.password)
          ),
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

    const changeUserData = () => {
      serverError.value = null;
      isLoading.value = true;
      v$.value.$touch();

      if (v$.value.signup.$errors.length) {
        isLoading.value = false;
        return console.log("Невалидно");
      }

      const sendFormData = async () => {
        try {
          const rawResponse = await fetch(`${$SERVICES.API}/signup`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(state.signup),
          });
          const content = await rawResponse.json();

          content && store.dispatch("setUser", content);

          isLoading.value = false;
        } catch (error) {
          isLoading.value = false;
          serverError.value = $ERRORS_LIST.NOT_CONNECTED;
          throw new Error(error);
        }
      };

      sendFormData();

      return console.log("Валидно");
    };

    return {
      state,
      v$,
      handleClose,
      changeUserData,
      isLoading,
      serverError,
    };
  },
};
</script>

<style></style>
