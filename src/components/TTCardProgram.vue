<template>
  <div class="block-2--card">
    <img :src="program.image" />
    <div class="block-2--image-text">
      <p>{{ program.description }}</p>

      <!-- <button class="default-btn">Записаться</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    program: Object,
  },
};
</script>

<style></style>
