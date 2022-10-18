import { createRouter, createWebHistory } from "vue-router";

const page = (path) => () => import(`@/${path}`).then((m) => m.default || m);

const routes = [
  {
    path: "/",
    name: "main",
    component: page("views/MainView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
