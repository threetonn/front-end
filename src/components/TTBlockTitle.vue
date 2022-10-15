<template>
  <div class="block-title">
    <p class="block-title--title"><a :name="hashLink"></a>{{ titleName }}</p>
    <div class="block-title--line"></div>
  </div>
</template>

<script>
export default {
  props: {
    hashLink: String,
    titleName: String,
  },
};
</script>

<style></style>
