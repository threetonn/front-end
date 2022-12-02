<template>
  <div class="user-profile-card--wrapper">
    <div class="user-profile-card">
      <svg
        class="close-svg"
        @click="close"
        viewPort="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="1" y1="16" x2="16" y2="1" stroke="white" stroke-width="2" />
        <line x1="1" y1="1" x2="16" y2="16" stroke="white" stroke-width="2" />
      </svg>
      <div class="user-profile-card__info">
        <template v-if="user.image">
          <img
            class="user-profile-card__image"
            :src="user.image"
            alt="user photo"
          />
        </template>
        <template v-else>
          <div class="no-image">Нет изображения</div>
        </template>
      </div>
      <div class="user-profile-card__content">
        <div class="user-profile-card__about-user">
          <p>{{ user.surname + " " + user.name }}</p>
          <!-- <p class="user-profile-card--text-block" v-if="user.patronymic">
            <span class="user-profile-card--span-block">Отчество:</span>&nbsp;
            {{ user.patronymic }}
          </p> -->
        </div>
        <div>
          <div v-if="user.bio" class="user-profile-card__bio">
            <span class="user-profile-card--span-block">Биография</span>&nbsp;
            <div class="user-profile-card--bio-block">
              <p>{{ user.bio }}</p>
            </div>
          </div>
          <div class="user-profile-card__workouts" v-if="user.workout_type">
            <span class="user-profile-card--span-block"
              >Проводимые тренировки</span
            >&nbsp;
            <p class="user-profile-card--workout-list">{{ workouts }}</p>
            <!-- <ul class="user-profile-card--trainingTypeList">
              <li v-for="(training, idx) in user.workout_type" :key="idx">
                <span>{{ training }}</span>
              </li>
            </ul> -->
          </div>
        </div>
        <div class="user-profile-card__contact">
          <p class="user-profile-card--text-block">
            <span class="user-profile-card--span-block">Email:</span>&nbsp;
            {{ user.email }}
          </p>
          <p class="user-profile-card--text-block">
            <span class="user-profile-card--span-block">Телефон:</span>&nbsp;
            {{ user.phone }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    user: Object,
    close: Function,
  },
  setup(props) {
    const workouts = computed(() => props.user.workout_type.join(", "));

    return {
      workouts,
    };
  },
};
</script>

<style></style>
