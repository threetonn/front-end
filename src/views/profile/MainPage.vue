<template>
  <div class="profile">
    <div class="profile__wrapper">
      <div class="profile__routes-block">
        <ul class="profile__links">
          <li class="profile__link" v-for="tab in tabs" :key="tab">
            <template v-if="tab.access.length > 0">
              <router-link
                v-if="tab.access.includes(user.role)"
                active-class="profile__link--active"
                :to="{ name: 'profile.' + tab.route }"
                >{{ tab.name }}</router-link
              >
            </template>
            <template v-else>
              <router-link
                active-class="profile__link--active"
                :to="{ name: 'profile.' + tab.route }"
                >{{ tab.name }}</router-link
              >
            </template>
          </li>
          <li class="profile__link">
            <a @click="logout">Выйти</a>
          </li>
        </ul>
      </div>
      <div class="profile__content">
        <template v-if="showUserCard">
          <TTCardUserProfile
            :close="closeUserCard"
            :user="selectedUser"
          ></TTCardUserProfile>
        </template>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TTCardUserProfile from "@/components/TTCardUserProfile.vue";

export default {
  components: {
    TTCardUserProfile,
  },
  setup() {
    // const tabs = ref([
    //   {
    //     icon: "user",
    //     name: "Профиль",
    //     route: "profile.account",
    //   },
    //   {
    //     icon: "user-edit",
    //     name: "Расписание",
    //     route: "profile.schedule",
    //   },
    //   {
    //     icon: "user-lock",
    //     name: "Абонементы",
    //     route: "profile.subscriptions",
    //   },
    //   {
    //     icon: "ruble-sign",
    //     name: "Тренера",
    //     route: "profile.trainers",
    //   },
    //   {
    //     icon: "ruble-sign",
    //     name: "Персонал",
    //     route: "profile.staff",
    //   },
    //   {
    //     icon: "hand-holding-usd",
    //     name: "Клиенты",
    //     route: "profile.users",
    //   },
    // ]);

    const store = useStore();
    const showUserCard = computed(() => store.getters.getShowUserCard);
    const selectedUser = computed(() => store.getters.getSelectedUser);
    const tabs = computed(() => store.getters.getRouteAccess);
    const user = computed(() => store.getters.getUser);

    const router = useRouter();

    // onMounted(() => {
    //   if (!store.getters.getUser) {
    //     router.push("/");
    //   }
    // });

    const closeUserCard = () => store.dispatch("hideUserCard");

    const logout = async () => {
      await store.dispatch("logoutUser");
      router.push("/");
    };

    return {
      tabs,
      user,
      selectedUser,
      showUserCard,
      logout,
      closeUserCard,
    };
  },
};
</script>

<style></style>
