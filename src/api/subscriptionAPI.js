import { errorNotify, successNotify } from "@/services/notifications";
import { $SERVICES } from "./api";

export const getSubscriptionsAPI = async () => {
  const response = await fetch(`${$SERVICES.API}/subscriptions`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });

  // if (response.status === 200) {
  //   successNotify("Успешно!");
  // }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return response.json();
};

export const setUserSubscriptionAPI = async (subscribtionData) => {
  const response = await fetch(
    `${$SERVICES.API}/subscriptions/${subscribtionData.id}/subscribe`,
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${subscribtionData.access_token}`,
      },
      body: JSON.stringify(subscribtionData, ["start_date", "day_count"]),
    }
  );

  if (response.status === 200) {
    successNotify("Успешно!");
    return response.json();
  }

  if (response.status !== 200) {
    errorNotify("Ошибка отправки запроса!");
  }

  return { error: response.json() };
};
