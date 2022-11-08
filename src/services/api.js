export const $SERVICES = {
  API: "http://172.28.31.169:8000",
};

export const signUpUserAPI = async (userData) => {
  const response = await fetch(`${$SERVICES.API}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

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

  return response.json();
};
