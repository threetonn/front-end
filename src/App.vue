<template>
  <div>
    <router-view />
    <notifications position="bottom right" />
  </div>
</template>

<style lang="scss">
@import "./assets/sass/main.scss";
</style>

// Расписание // Кнопка записи для клиентов // Кнопка создания тренировки
(тренер, менеджер) -- форма (CRUD) // У тренера выбор 1го пользователя для
записи, у менеджера несколько
