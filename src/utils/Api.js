class Api {
  constructor (config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(isLiked) {
      return this.disLikeCard(cardId);
    }
    else {
      return this.likeCard(cardId);
    }
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  disLikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  }

  /*getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }*/
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'a3935a49-8230-429f-9fab-7d2d6f416793',
    'Content-Type': 'application/json'
  }
});

export default api;