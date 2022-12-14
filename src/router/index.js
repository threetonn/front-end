/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";

import client from "@/middleware/client";
import checkUser from "@/middleware/checkUser.js";

const page = (path) => () => import(`@/${path}`).then((m) => m.default || m);

const routes = [
  {
    path: "/",
    name: "main",
    component: page("views/MainView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: page("views/profile/MainPage.vue"),
    redirect: { name: "profile.account" },
    children: [
      {
        path: "account",
        name: "profile.account",
        component: page("views/profile/AccountPage.vue"),
        // meta: {
        //   middleware: checkUser,
        // },
      },
      {
        path: "schedule",
        name: "profile.schedule",
        component: page("views/profile/SchedulePage.vue"),
      },
      {
        path: "subscriptions",
        name: "profile.subscriptions",
        component: page("views/profile/SubscriptionsPage.vue"),
      },
      {
        path: "trainers",
        name: "profile.trainers",
        component: page("views/profile/TrainersPage.vue"),
      },
      {
        path: "users",
        name: "profile.users",
        component: page("views/profile/UsersPage.vue"),
      },
      {
        path: "staff",
        name: "profile.staff",
        component: page("views/profile/StaffPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
