export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
  // return res.json().then((data) => {
  //   const {statusCode} = data;
  //   const {message} = data.message[0].messages[0]
  //   const error = new Error(message || 'Что-то пошло не так');
  //   error.status = statusCode;
  //   throw error;
  // });
}

export const registerUser = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}),
  })
    .then(checkResponse)
}

export const loginUser = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
}

export const getToken = (token) => {
  return fetch(`${BASE_URL}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    })
    .then(checkResponse)
}