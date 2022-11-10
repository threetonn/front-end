import { errorNotify, successNotify } from "@/services/notifications";
import { $SERVICES } from "./api";

export const getWorkoutTypesAPI = async () => {
  const response = await fetch(`${$SERVICES.API}/workouttypes`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });

  if (response.status === 200) {
    successNotify("Успешно!");
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return response.json();
};
