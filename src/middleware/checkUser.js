import store from "@/store";

export default function checkUser({ next, router }) {
  if (!store.getters.getUser) {
    return router.push({ name: "main" });
  }

  return next();
}
