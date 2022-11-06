<template>
  <div class="base-inputs__password-inputs">
    <div
      class="base-inputs__wrapper"
      :class="{ error: v$.password.$errors.length }"
    >
      <input
        class="base-inputs__input"
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
      class="base-inputs__wrapper"
      :class="{ error: v$.repassword.$errors.length }"
    >
      <input
        class="base-inputs__input"
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
    <button
      class="base-inputs__button"
      @click.prevent="changeData"
      :disabled="!fieldValidated"
      :class="!fieldValidated && 'disabled'"
    >
      <img src="@/assets/images/icons/save.png" alt="save" />
    </button>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, minLength, helpers } from "@vuelidate/validators";

export default {
  props: {
    callback: Function,
  },
  setup(props) {
    const fieldValidated = ref(false);
    const state = reactive({
      password: "",
      repassword: "",
    });

    const rules = computed(() => {
      return {
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

    const checkValidation = () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return (fieldValidated.value = false);
      }
      fieldValidated.value = true;
    };

    watch(
      () => [state.password, state.repassword],
      () => checkValidation()
    );

    const changeData = () => {
      if (!v$.value.$invalid) {
        console.log("ZBS");
        console.log(props.callback());
      }
    };

    return {
      v$,
      state,
      fieldValidated,
      changeData,
    };
  },
};
</script>

<style></style>
