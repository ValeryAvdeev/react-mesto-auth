class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
    this._headers = {
      authorization: this._token,
      'Content-Type': 'application/json'
    };
  }

  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }

  getUser() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

  editAvatar(avatar) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
      .then(this._handleResponse)
  }

  deleteCard(_id) {
    return fetch(`${this._address}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

  editProfile({name, info}) {
    return fetch(`${this._address}/users/me`, {
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
    return fetch(`${this._address}/cards`, {
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

const api = new Api(
  {
    address: 'https://mesto.nomoreparties.co/v1/cohort-35',
    token: 'f1517d9d-d32e-439e-a468-1c652ea303d1'
  })

export default api;