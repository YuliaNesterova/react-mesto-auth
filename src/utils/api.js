class Api {
    constructor({baseUrl, authorization, contentType}) {
        this._baseUrl = baseUrl;
        this._authorization = authorization;
        this._contentType = contentType;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(console.log(`Ошибка ${res.status}`));
        }
        return res.json();
    }

    getInitialCards() {
           return fetch(`${this._baseUrl}/cards`, {
                headers: {
                    authorization: `${this._authorization}`
                }
            })
               .then((res) => this._getResponseData(res));
        }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `${this._authorization}`
            }
        })
            .then((res) => this._getResponseData(res));
    }

    changeUserInfo(object) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: object.name,
                about: object.about
            })
        })
            .then((res) => this._getResponseData(res));
    }

    addNewCard(object) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: object.description,
                link: object.image
            })
        })
            .then((res) => this._getResponseData(res));
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': this._contentType
            },
        })
            .then((res) => this._getResponseData(res));
    }

    getNewUserPic(object) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                avatar: object.avatar
            })
        })
            .then((res) => this._getResponseData(res));
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked) {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: `${this._authorization}`,
                    'Content-Type': this._contentType
                }
            })
                .then((res) => this._getResponseData(res));
        } else {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this._authorization}`,
                    'Content-Type': this._contentType
                }
            })
                .then((res) => this._getResponseData(res));
        }
    }
    }

    const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
        authorization: '04df758b-41ec-45dd-81f7-1b0f03936357', contentType: 'application/json'})

export default api;