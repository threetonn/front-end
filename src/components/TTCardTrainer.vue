<template>
  <div class="block-3--card">
    <div class="card-image">
      <img
        :src="require(`../assets/images/trainers/${trainer.img}.png`)"
        :alt="trainer.imgAlt"
      />
    </div>
    <div class="information">
      <p class="information--trainerName">{{ trainer.name }}</p>
      <p class="information--trainingType">
        Тип тренировки: <span>{{ trainer.trainingType }}</span>
      </p>
      <p class="information--trainerInfo">
        {{ trainer.trainerDesc }}
      </p>
      <button class="default-btn">Написать</button>
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
