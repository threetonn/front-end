<template>
  <div class="block-2--card">
    <img
      :src="require(`../assets/images/programs/${program.imageName}.png`)"
      :alt="program.imageAlt"
    />
    <div class="block-2--image-text">
      <p>{{ program.nameRU }}</p>

      <router-link to="subscriptions">
        <button class="default-btn">Записаться</button>
      </router-link>
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
