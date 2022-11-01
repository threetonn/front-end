<template>
  <div class="user-profile-card--wrapper">
    <div class="user-profile-card">
      <div class="user-profile-card__info">
        <template v-if="user.img">
          <img
            class="user-profile-card__image"
            :src="require(`@/assets/images/trainers/${user.img}.png`)"
            :alt="user.imgAlt"
          />
        </template>
        <template v-else>
          <div class="no-image"></div>
        </template>
        <div class="user-profile-card__about-user">
          <p>{{ user.surname }}</p>
          <p>{{ user.name }}</p>
          <p v-if="user.patronymic">{{ user.patronymic }}</p>
        </div>
      </div>
      <p class="user-profile-card__other-title">Дополнительная информация:</p>
      <div class="user-profile-card__content">
        <div v-if="user.bio" class="user-profile-card__bio">
          <p>{{ user.bio }}</p>
        </div>
        <div class="user-profile-card__contact">
          <p>{{ user.phone }}</p>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
};
</script>

<style></style>
