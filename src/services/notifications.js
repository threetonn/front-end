import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification();
const notifyOptions = {
  duration: 3000,
};

export const successNotify = (title = "", text) => {
  notification.notify({
    title: title,
    text: text,
    type: "success",
    ...notifyOptions,
  });
};

export const errorNotify = (title = "", text) => {
  notification.notify({
    title: title,
    text: text,
    type: "error",
    ...notifyOptions,
  });
};
