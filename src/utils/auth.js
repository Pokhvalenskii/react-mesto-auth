export const BASE_URL = 'https://auth.nomoreparties.co';
const token = '8675e632-7ad1-4f28-9202-69cb55994239';
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        "password" : password,
        "email" : email,
      },
    )
  })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    })
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        "password" : password,
        "email" : email,
      },
    )
  })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    })
}

export const validityJWT = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    }
  })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    })
}