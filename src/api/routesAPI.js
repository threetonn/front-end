// eslint-disable-next-line no-unused-vars
import { errorNotify, successNotify } from "@/services/notifications";
import { $SERVICES } from "./api";

export const getRouteAccessAPI = async () => {
  const response = await fetch(`${$SERVICES.API}/access`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });

  if (response.status === 200) {
    return response.json();
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};
