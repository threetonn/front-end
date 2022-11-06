<template>
  <div class="base-inputs__radio-wrapper">
    <div
      class="base-inputs__wrapper"
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
import { reactive, computed, ref, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
export default {
  props: {
    callback: Function,
  },
  setup(props) {
    const fieldValidated = ref(false);
    const state = reactive({
      gender: "",
    });

    const rules = computed(() => {
      return {
        gender: {
          required: helpers.withMessage("Не выбран пол", required),
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
      () => state.gender,
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
