//модуль,отвечающий за работу с сервером

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-7',
  headers: {
    authorization: '5c0ea949-1e0d-409c-aab2-ad8dda3585dc',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
    //получили ответ,если ок,то взяли json==>на этом апи заканчивается,берет json/общение между нами и сервером
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис//возвращаем промисы через которые then получаем данные
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET",
  })
  .then(checkResponse)
}

export const setCards = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify(data)
      //чтобы передеать данные нам нужны обратные действия,т.е нужно наш объект преобразовать в строку(тот объект,который сервер поймет)
  })
    .then(checkResponse);
}

 //для удаления нужно id,чтобы понимать что именно удалять
export const deleteCards = (id) => {
  //если операции с одним каким-то элементом ,то в путь добавляем его id
  return fetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: "DELETE"
  })
  .then(checkResponse)
}


export const getProfileServer = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET",
  })
  .then(checkResponse)
}

export function patchProfile(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify(data)
})
.then(checkResponse)
}

export function setLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "PUT",
})
.then(checkResponse)
}

export function deleteLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "DELETE",
})
.then(checkResponse)
}

export function patchAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify(data)
})
.then(checkResponse)
}






