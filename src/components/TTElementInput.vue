<template>
  <div
    class="base-inputs__wrapper"
    :class="{ error: v$.formField.$errors.length }"
  >
    <div class="base-inputs__input-wrapper">
      <input
        class="base-inputs__input"
        :type="type"
        :placeholder="placeholder"
        v-model="state.formField"
      />
      <button
        class="base-inputs__button"
        @click.prevent="changeData"
        :disabled="!fieldValidated"
        :class="!fieldValidated && 'disabled'"
      >
        <img src="@/assets/images/icons/save.png" alt="save" />
      </button>
    </div>

    <div
      class="input-errors"
      v-for="error of v$.formField.$errors"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import * as vuelidate from "@vuelidate/validators";

import { $VALIDATORS_MESSAGE } from "@/services/validatorsMessage";
export default {
  props: {
    field: String,
    type: String,
    placeholder: String,
    callback: Function,
    rules: Array,
  },
  setup(props) {
    const fieldValidated = ref(false);
    const state = reactive({
      formField: props.field || null,
    });

    // eslint-disable-next-line no-unused-vars
    const generateValidations = () => {
      const validatorsList = [];

      const errorMessage = (rule) => {
        if (rule.params !== "") {
          if (rule.errorMessage) {
            return String(rule.errorMessage + " " + rule.params.join(" и "));
          }
          return String(
            $VALIDATORS_MESSAGE[rule.name] + " " + rule.params.join(" и ")
          );
        } else {
          if (rule.errorMessage) {
            return String(rule.errorMessage);
          }
          return String($VALIDATORS_MESSAGE[rule.name]);
        }
      };

      const setValidator = (rule) => {
        if (rule.params !== "") {
          if (rule.customValidator) {
            return rule.customValidator(...rule.params);
          }
          return vuelidate[rule.name](...rule.params);
        } else {
          if (rule.customValidator) {
            return rule.customValidator;
          }
          return vuelidate[rule.name];
        }
      };

      for (let i = 0; i < props.rules.length; i++) {
        const rule = props.rules[i];

        const validator = vuelidate.helpers.withMessage(
          errorMessage(rule),
          setValidator(rule)
        );
        validatorsList.push(validator);
      }
      return validatorsList;
    };

    const rules = computed(() => {
      return {
        formField: {
          ...generateValidations(),
        },
      };
    });

    // const phoneVal = (str) => {
    //   console.log(str);
    //   const regExp =
    //     // eslint-disable-next-line no-useless-escape
    //     /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    //   const result = regExp.exec(str);
    //   return result;
    // };

    const v$ = useVuelidate(rules, state);

    const checkValidation = () => {
      v$.value.$touch();
      if (v$.value.$errors.length) {
        return (fieldValidated.value = false);
      }
      fieldValidated.value = true;
    };

    watch(
      () => state.formField,
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
