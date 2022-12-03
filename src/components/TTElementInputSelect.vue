<template>
  <div
    class="base-inputs__wrapper"
    :class="{ error: v$.selected.$errors.length }"
  >
    <div class="base-inputs__input-wrapper">
      <VueMultiselect
        v-model="state.selected"
        :options="state.options"
        :multiple="true"
        :close-on-select="false"
        :placeholder="placeholder"
        :label="label"
        track-by="id"
        class="base-inputs__input base-inputs__input--multiselect"
        selectLabel="Нажмите Enter чтобы выбрать"
        deselectLabel="Нажмите Enter чтобы удалить"
        selectedLabel="Выбрано"
      ></VueMultiselect>
      <template v-if="specialButton">
        <button
          class="card__btn card__btn--signUp"
          @click.prevent="changeData"
          :disabled="!fieldValidated"
          :class="!fieldValidated && 'disabled'"
        >
          Записать
        </button>
      </template>
      <template v-else>
        <button
          class="base-inputs__button"
          @click.prevent="changeData"
          :disabled="!fieldValidated"
          :class="!fieldValidated && 'disabled'"
        >
          <img src="@/assets/images/icons/save.png" alt="save" />
        </button>
      </template>
    </div>

    <div
      class="input-errors"
      v-for="error of v$.selected.$errors"
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

import VueMultiselect from "vue-multiselect";

export default {
  components: {
    VueMultiselect,
  },
  props: {
    selected: String,
    fieldName: String,
    type: String,
    placeholder: String,
    callback: Function,
    rules: Array,
    options: Array,
    label: String,
    formType: String,
    specialButton: Boolean,
  },
  setup(props) {
    const fieldValidated = ref(false);
    const state = reactive({
      selected: props.selected || null,
      options: props.options || null,
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
        selected: {
          ...generateValidations(),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    const checkValidation = () => {
      v$.value.$touch();
      if (v$.value.$errors.length) {
        return (fieldValidated.value = false);
      }
      fieldValidated.value = true;
    };

    watch(
      () => state.selected,
      () => checkValidation()
    );

    const changeData = () => {
      if (!v$.value.$invalid) {
        if (props.formType === "workoutUsersSignUp") {
          return props.callback({ clients: state.selected });
        }
        const selectedList = [];
        state.selected.forEach((selectItem) => {
          selectedList.push(selectItem.name);
        });
        return props.callback({ [props.fieldName]: selectedList });
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

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
