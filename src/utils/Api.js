class Api {
  constructor (config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }
  

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`
      },
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  updateUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  updateUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`
      },
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  deleteCard(data, token) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
      })
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if(isLiked) {
      return this.disLikeCard(cardId, token);
    }
    else {
      return this.likeCard(cardId, token);
    }
  }

  likeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`
      },
    }).then((res) => {
      return this._getResponseData(res);
    })
  }

  disLikeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`
      },
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
}

const api = new Api({
  baseUrl: 'https://api.kiprin.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;