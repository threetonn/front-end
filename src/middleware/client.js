import store from "@/store";

export default function auth({ next, router }) {
  const user = store.getters.getUser;
  if (user.role === "client") {
    return next();
  }

  return router.push({ name: "main" });
}
