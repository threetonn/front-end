<template>
  <div class="block-3--card">
    <div class="block-3--bg"></div>
    <div class="card-image">
      <img
        :src="require(`../assets/images/trainers/${trainer.img}.png`)"
        :alt="trainer.imgAlt"
      />
    </div>
    <div class="information">
      <p class="information--trainerName">{{ trainer.name }}</p>
      <div>
        <p class="information--trainingType">Тренировки:</p>
        <ul class="information--trainingTypeList">
          <li v-for="(training, idx) in trainer.trainingType" :key="idx">
            <span>{{ training }}</span>
          </li>
        </ul>
      </div>
      <p class="information--trainerInfo">
        {{ trainer.trainerDesc }}
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
