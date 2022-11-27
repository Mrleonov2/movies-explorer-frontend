import { BASE_URL } from "./constants";

const checkResponse = (response) => {
  console.log("response ok: ", response);
  if (response.ok) {
    return response.json();
  }

  return response.json().then((err) => {
    throw err;
  });
};
export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ password, email, name }),
  }).then(checkResponse);
};
export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};
export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  }).then(checkResponse);
};
