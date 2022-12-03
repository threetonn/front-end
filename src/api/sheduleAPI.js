import { errorNotify, successNotify } from "@/services/notifications";
import { $SERVICES } from "./api";

function normalizeEventsScheduleData(data) {
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  if (Array.isArray(data)) {
    return data.map((event) => {
      return {
        id: event.id,
        start: event.start_date.replace("T", " "),
        end: event.end_date.replace("T", " "),
        title: event.name,
        location: event.gym,
        type: event.workout_type,
        trainer: event.trainer,
        clients: event.clients,
        class: `split${randomInteger(1, 4)}`,
      };
    });
  }
  return {
    id: data.id,
    start: data.start_date.replace("T", " "),
    end: data.end_date.replace("T", " "),
    title: data.name,
    location: data.gym,
    type: data.workout_type,
    trainer: data.trainer,
    clients: data.clients,
    class: `split${randomInteger(1, 4)}`,
  };
}

export const getScheduleEventsAPI = async () => {
  const response = await fetch(`${$SERVICES.API}/workout/group`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });

  if (response.status === 200) {
    const resData = await response.json();
    const result = normalizeEventsScheduleData(resData);

    return result;
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};

export const getSchedulePesonalEventsAPI = async (data) => {
  let query = "";
  if (data.role === "trainer") {
    query = `${$SERVICES.API}/workout/trainer/me`;
  }
  if (data.role === "client") {
    query = `${$SERVICES.API}/workout/client/me`;
  }
  const response = await fetch(query, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  if (response.status === 200) {
    const resData = await response.json();
    const result = normalizeEventsScheduleData(resData);

    return result;
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};

export const addTrainInSheduleAPI = async (trainData) => {
  let query = "";
  if (trainData.role === "manager") {
    query = `${$SERVICES.API}/workout/manager/add`;
  }
  if (trainData.role === "trainer") {
    query = `${$SERVICES.API}/workout/trainer/personal/add`;
  }
  const response = await fetch(query, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${trainData.access_token}`,
    },
    body: JSON.stringify(trainData.train),
  });

  if (response.status === 200) {
    successNotify("Успешно!");
    const resData = await response.json();
    const result = normalizeEventsScheduleData(resData);

    return result;
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};

export const editTrainInSheduleAPI = async (trainData) => {
  let query = "";
  if (trainData.role === "manager") {
    query = `${$SERVICES.API}/workout/manager/${trainData.id}/edit`;
  }
  if (trainData.role === "trainer") {
    query = `${$SERVICES.API}/workout/trainer/${trainData.id}/edit`;
  }
  const response = await fetch(query, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${trainData.access_token}`,
    },
    body: JSON.stringify(trainData.train),
  });

  if (response.status === 200) {
    successNotify("Успешно!");
    const resData = await response.json();
    const result = normalizeEventsScheduleData(resData);

    return result;
  }

  if (response.status !== 200) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};

export const deleteTrainInSheduleAPI = async (trainData) => {
  let query = "";
  if (trainData.role === "manager") {
    query = `${$SERVICES.API}/workout/manager/${trainData.id}/delete`;
  }
  if (trainData.role === "trainer") {
    query = `${$SERVICES.API}/workout/trainer/${trainData.id}/delete`;
  }
  const response = await fetch(query, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${trainData.access_token}`,
    },
  });

  if (response.status === 202) {
    successNotify("Успешно!");
    return response.json();
  }

  if (response.status !== 202) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};

export const signUpUsersForTrainAPI = async (trainData) => {
  const response = await fetch(
    `${$SERVICES.API}/workout/manager/${trainData.id}/subscribe/`,
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${trainData.access_token}`,
      },
      body: JSON.stringify(trainData.clients),
    }
  );

  if (response.status === 201) {
    successNotify("Успешно!");

    return response.json();
  }

  if (response.status !== 201) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};

export const signUpClientInTrainAPI = async (trainData) => {
  const response = await fetch(
    `${$SERVICES.API}/workout/group/${trainData.id}/subscribe`,
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${trainData.access_token}`,
      },
    }
  );

  if (response.status === 201) {
    successNotify("Успешно!");

    return response.json();
  }

  if (response.status !== 201) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};

export const unSignUpClientInTrainAPI = async (trainData) => {
  const response = await fetch(
    `${$SERVICES.API}/workout/group/${trainData.id}/unsubscribe`,
    {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${trainData.access_token}`,
      },
    }
  );

  if (response.status === 202) {
    successNotify("Успешно!");

    return response.json();
  }

  if (response.status !== 202) {
    errorNotify("Не удалось соединиться с сервером!");
  }

  return { error: response.json() };
};
