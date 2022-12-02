<template>
  <div class="block-3--card">
    <div class="block-3--bg"></div>
    <div class="card-image">
      <template v-if="trainer.image"><img :src="trainer.image" /></template>
      <template v-else>Нет изображения</template>
    </div>
    <div class="information">
      <p class="information--trainerName">
        {{ trainer.name + " " + trainer.surname }}
      </p>
      <div>
        <p class="information--trainingType">Тренировки:</p>
        <ul class="information--trainingTypeList">
          <li v-for="(training, idx) in trainer.workout_type" :key="idx">
            <span>{{ training }}</span>
          </li>
        </ul>
      </div>
      <p class="information--trainerInfo">
        {{ trainer.bio }}
      </p>
      <!-- <button class="default-btn">Написать</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trainer: Object,
  },
};
</script>

<style></style>
