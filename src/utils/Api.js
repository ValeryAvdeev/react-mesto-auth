import {BASE_URL} from "./auth";

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    // this._headers = {
    //   authorization: this._token,
    //   'Content-Type': 'application/json'
    // };
  }

  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }

  _checkResponseAuth = (res) => {
    if (res.ok) {
      return res.json();
    }
    // return Promise.reject(res.status);
    return res.json().then((data) => {
      const {statusCode} = data;
      const {message} = data.message[0].messages[0]
      const error = new Error(message || 'Что-то пошло не так');
      error.status = statusCode;
      throw error;
    });
  }

  registerUser(email, password){
    return fetch(`${this._baseUrl}/signup`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
      .then(this._checkResponseAuth)
  }

  loginUser(email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
      .then(this._checkResponseAuth)
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
      .then(this._handleResponse)
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  editProfile({name, info}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: info
      })
    })
      .then(this._handleResponse)
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(this._handleResponse)
  }
}

export const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
    headers: {
      authorization: 'f1517d9d-d32e-439e-a468-1c652ea303d1',
      'Content-Type': 'application/json',
    },
  });

export const auth = new Api(
  {
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  }
)
