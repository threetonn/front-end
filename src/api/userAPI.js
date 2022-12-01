import { errorNotify, successNotify } from "@/services/notifications";
import { $SERVICES } from "./api";

export const signUpUserAPI = async (userData) => {
  const response = await fetch(`${$SERVICES.API}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 200) {
    successNotify("Успешная регистрация!");
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return response.json();
};

export const signInUserAPI = async (user) => {
  const response = await fetch(`${$SERVICES.API}/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.status === 200) {
    successNotify("Успешная авторизация!");
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return response.json();
};

export const getProfileAPI = async (access_token) => {
  const response = await fetch(`${$SERVICES.API}/profile/me`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 200) {
    successNotify("Успешный вход!");
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return response.json();
};

export const getAccessTokenAPI = async (refresh_token) => {
  const response = await fetch(`${$SERVICES.API}/auth/refresh_token`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${refresh_token}`,
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

export const sendUserImageAPI = async (formData, access_token) => {
  const response = await fetch(`${$SERVICES.API}/profile/add_image`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: formData,
  });

  if (response.status === 200) {
    successNotify("Изображение сохранено!");
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return response.json();
};

export const sendNewUserDataAPI = async (newData, access_token) => {
  const response = await fetch(`${$SERVICES.API}/profile/edit`, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(newData),
  });

  if (response.status === 200) {
    successNotify("Данные изменены успешно!");
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return response.json();
};
