<template>
  <div class="profile-page">
    <h1 class="profile-page__title">Профиль</h1>
    <div class="profile-page__tabs">
      <button
        @click="selectedChangeTab = false"
        :class="{ 'toggle-btn--active': !selectedChangeTab }"
        class="toggle-btn"
      >
        Профиль
      </button>
      <button
        @click="selectedChangeTab = true"
        :class="{ 'toggle-btn--active': selectedChangeTab }"
        class="toggle-btn"
      >
        Изменить данные
      </button>
    </div>
    <template v-if="selectedChangeTab">
      <div class="profile-page__inputs">
        <div class="profile-photo-group">
          <div class="profile-photo">
            <label
              :style="`opacity: ${imagePreview ? 0 : 1}`"
              class="profile-photo__label"
              for="profile-input"
            >
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
            <input @change="onFileChange" id="profile-input" type="file" />

            <img
              v-if="imagePreview"
              class="profile-photo__preview"
              :src="imagePreview"
            />
          </div>
          <p v-if="photoErrorMessage" class="error-msg">
            {{ photoErrorMessage }}
          </p>
          <button @click.prevent="sendImage" class="profile-inputs__button">
            Сохранить
          </button>
        </div>
        <div class="profile-inputs">
          <div class="profile-inputs__wrapper">
            <input
              class="profile-inputs__input"
              type="email"
              name="signup-email"
              id="signup-email"
              :value="user.email"
              disabled
              placeholder="Ваш Email-адрес"
            />
          </div>
          <div class="profile-inputs__wrapper">
            <input
              class="profile-inputs__input"
              type="date"
              :value="user.birthday"
              name="signup-birthday"
              id="signup-birthday"
              placeholder="Дата рождения"
              disabled
            />
          </div>
          <TTElementInput
            :field="user.name"
            fieldName="name"
            type="text"
            placeholder="Ваше имя"
            :callback="(userData) => sendUserData(userData)"
            :rules="[{ name: 'required', params: '' }]"
          ></TTElementInput>

          <TTElementInput
            :field="user.surname"
            fieldName="surname"
            type="text"
            placeholder="Ваша фамилия"
            :callback="(userData) => sendUserData(userData)"
            :rules="[{ name: 'required', params: '' }]"
          ></TTElementInput>

          <TTElementInput
            :field="user.patronymic"
            fieldName="patronymic"
            type="text"
            placeholder="Ваше отчество"
            :callback="(userData) => sendUserData(userData)"
            :rules="[{ name: 'required', params: '' }]"
          ></TTElementInput>

          <TTElementInput
            :field="user.phone"
            fieldName="phone"
            type="text"
            placeholder="Ваш номер телефона"
            :callback="(userData) => sendUserData(userData)"
            :rules="[
              {
                name: 'customValidator',
                params: '',
                errorMessage: 'Неверный формат номера',
                customValidator: phoneValidator,
              },
            ]"
          ></TTElementInput>

          <template v-if="user.role === 'trainer'">
            <TTElementInputTextarea
              :field="user.bio"
              fieldName="bio"
              type="text"
              placeholder="Ваша биография"
              :callback="(userData) => sendUserData(userData)"
              :rules="[
                { name: 'required', params: '' },
                { name: 'maxLength', params: [800] },
              ]"
            ></TTElementInputTextarea>

            <TTElementInputSelect
              :selected="user.workout_type"
              fieldName="workout_type"
              type="text"
              placeholder="Проводимые тренировки"
              :callback="(userData) => sendUserData(userData)"
              :rules="[{ name: 'required', params: '' }]"
              :options="workoutTypes"
            ></TTElementInputSelect>
          </template>

          <TTElementInputPassword
            :callback="(userData) => sendUserData(userData)"
            fieldName="password"
          ></TTElementInputPassword>

          <TTElementInputRadio
            :gender="user.gender"
            fieldName="gender"
            :callback="(userData) => sendUserData(userData)"
          ></TTElementInputRadio>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="profile-page-info">
        <div class="profile-page-info__image-wrapper">
          <template v-if="user?.image">
            <img
              class="profile-page-info__image"
              :src="user.image"
              alt="profile-photo"
            />
          </template>
          <template v-else>
            <div class="no-image">Нет изображения</div>
          </template>
        </div>
        <div class="profile-page-info__content profile-content">
          <template v-if="user.role === 'client'">
            <div
              class="profile-content__group"
              :class="`profile-subscription profile-subscription--${
                user.subscription && user.subscription.type
              }`"
            >
              <span class="group-title">Активная подписка</span>
              <span>{{
                user.subscription ? user.subscription.title : "нет"
              }}</span>
            </div>
          </template>
          <div class="profile-content__group">
            <span class="group-title">Имя</span>
            <span>{{ user.name }}</span>
          </div>
          <div class="profile-content__group">
            <span class="group-title">Фамилия</span>
            <span>{{ user.surname }}</span>
          </div>
          <div class="profile-content__group">
            <span class="group-title">Отчество</span>
            <span>{{ user.patronymic }}</span>
          </div>
          <div class="profile-content__group">
            <span class="group-title">Email-адрес</span>
            <span>{{ user.email }}</span>
          </div>
          <div class="profile-content__group">
            <span class="group-title">Номер телефона</span>
            <span>{{ user.phone }}</span>
          </div>
          <div class="profile-content__group">
            <span class="group-title">Пол</span>
            <span>{{ user.gender?.ru }}</span>
          </div>
          <template v-if="user.role === 'trainer'">
            <div class="profile-content__group">
              <span class="group-title">Биография</span>
              <span>{{ user.bio }}</span>
            </div>
            <div class="profile-content__group">
              <span class="group-title">Проводимые тренировки</span>
              <ul>
                <li v-for="(workout, idx) in user.workout_type" :key="idx">
                  <span>
                    {{ workout.description }}
                  </span>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </template>

    <div v-if="serverError" class="error-msg">{{ serverError }}</div>
  </div>
</template>

<script>
// import { $SERVICES } from "@/services/api";
// import { $ERRORS_LIST } from "@/services/errors";
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

import TTElementInput from "@/components/TTElementInput.vue";
import TTElementInputPassword from "@/components/TTElementInputPassword.vue";
import TTElementInputRadio from "@/components/TTElementInputRadio.vue";
import TTElementInputTextarea from "@/components/TTElementInputTextarea.vue";
import TTElementInputSelect from "@/components/TTElementInputSelect.vue";

export default {
  components: {
    TTElementInput,
    TTElementInputPassword,
    TTElementInputRadio,
    TTElementInputTextarea,
    TTElementInputSelect,
  },
  setup() {
    const store = useStore();

    const user = computed(() => store.getters.getUser);
    const tokens = computed(() => store.getters.getTokens);
    const workoutTypes = computed(() => store.getters.getWorkoutTypes);

    onBeforeMount(() => {
      if (!workoutTypes.value.length) {
        store.dispatch("setWorkoutTypes");
      }
    });

    const isLoading = ref(false);
    const serverError = ref(null);
    const selectedChangeTab = ref(false);
    const userImage = ref(null);
    const imagePreview = ref(null);
    const photoErrorMessage = ref(null);

    const phoneValidator = (str) => {
      const regExp =
        // eslint-disable-next-line no-useless-escape
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      const result = regExp.exec(str);
      return result;
    };

    const photoValidator = (photo) => {
      photoErrorMessage.value = null;

      const validators = {
        maxImageSize: 2048,
        types: ["jpg", "png", "jpeg"],
      };

      if (photo.size / 1024 > validators.maxImageSize) {
        return (photoErrorMessage.value = `Изображение не может быть больше ${(
          validators.maxImageSize / 1024
        ).toFixed(2)} Мб`);
      }

      const validatorsTypesCheck = validators.types.filter(
        (type) => type === photo.type.split("/")[1]
      );

      if (!validatorsTypesCheck.length) {
        return (photoErrorMessage.value =
          "Данный формат изображения не поддерживается!");
      }

      return photoErrorMessage.value;
    };

    const onFileChange = (e) => {
      userImage.value = e.target.files[0];
      if (!photoValidator(userImage.value)) {
        return (imagePreview.value = window.URL.createObjectURL(
          userImage.value
        ));
      }
    };

    const sendImage = () => {
      if (userImage.value) {
        const formData = new FormData();
        formData.append("image", userImage.value);

        store.dispatch("uploadImage", {
          formData: formData,
          access_token: tokens.value.access_token,
        });

        userImage.value = null;

        selectedChangeTab.value = false;
      }
    };

    const sendUserData = async (userData) => {
      await store.dispatch("changeUserData", {
        data: userData,
        access_token: tokens.value.access_token,
      });

      selectedChangeTab.value = false;
    };

    return {
      user,
      isLoading,
      serverError,
      selectedChangeTab,
      phoneValidator,
      sendImage,
      userImage,
      onFileChange,
      imagePreview,
      photoErrorMessage,
      sendUserData,
      workoutTypes,
    };
  },
};
</script>

<style></style>
