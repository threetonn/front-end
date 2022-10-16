import { createRouter, createWebHistory } from "vue-router";

const page = (path) => () => import(`@/${path}`).then((m) => m.default || m);

const routes = [
  {
    path: "/",
    name: "main",
    component: page("views/MainView.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: page("views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
