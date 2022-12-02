// eslint-disable-next-line no-unused-vars
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
    // successNotify("Успешно!");
    return response.json();
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};

export const getWorkoutLocationsAPI = async () => {
  const response = await fetch(`${$SERVICES.API}/gym`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });

  if (response.status === 200) {
    // successNotify("Успешно!");
    return response.json();
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};
