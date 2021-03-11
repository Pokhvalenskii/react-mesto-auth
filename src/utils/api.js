class Api {
  constructor(date){
    this._urlApi = date.urlApi;
    this._token = date.token; // 8675e632-7ad1-4f28-9202-69cb55994239
    this._groupId = date.groupId; // cohort-19
  }

  _checkRes(res){
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._urlApi}${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkRes).catch(error => console.log(`${error}`));
  }

  getInitialUser() {
    return fetch(`${this._urlApi}${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkRes).catch(error => console.log(`${error}`));
  }

  editProfile(name, status) {
    return fetch(`${this._urlApi}${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token, //8675e632-7ad1-4f28-9202-69cb55994239
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: status
      })
    })
      .then(this._checkRes).catch(error => console.log(`${error}`));
  }

  addCard(name, link) {
    return fetch(`${this._urlApi}${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(this._checkRes).catch(error => console.log(`${error}`));
  }

  deleteCard(cardId) {
    return fetch(`${this._urlApi}${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkRes).catch(error => console.log(`${error}`));
  }

  like(cardId) {
    return fetch(`${this._urlApi}${this._groupId}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkRes).catch(error => console.log(`${error}`));
  }
  removeLike(cardId) {
    return fetch(`${this._urlApi}${this._groupId}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkRes).catch(error => console.log(`${error}`));
  }

  editAvatar(linkAvatar) {
    return fetch(`${this._urlApi}${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: linkAvatar,
      })
    })
      .then(this._checkRes).catch(error => console.log(`${error}`));
  }
}

const api = new Api({
  urlApi: 'https://mesto.nomoreparties.co/v1/',
  token: '8675e632-7ad1-4f28-9202-69cb55994239',
  groupId: 'cohort-19'
})

export default api;
///test





