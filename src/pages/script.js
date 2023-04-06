import "./index.css";

import { configValidation } from "../components/constants";

import { enableValidation } from "../components/validate";

import { createItem } from "../components/card";

import { addItem } from "../components/section";

import {
  getCards,
  setCards,
  getProfileServer,
  patchProfile,
} from "../components/api";

import { changeProfileInfo, getProfileInfo } from "../components/profile";

/* //выносим массив в секцию для карт
initialCards.forEach((arrayItem) => {
  const newItem = createItem(arrayItem);
  addItem(newItem);
}); */

/* function initialInfo() {
  //показываем,что оба запроса выполнились(успешно)//в массиве мб неограниченное кол-во запросов,которые будут выполняться в промисе
  //из запросов функций создаем массив
  Promise.all([getCards(), getProfileServer()])
    //два результата также в массиве
    .then(([res, user]) => {
      const { name, about, __id } = user;
      changeProfileInfo(user);
      setCards(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
initialInfo(); */

//включаем валидации,настройки передаем при вызове
enableValidation(configValidation);

//используем модуль
getCards()
  //нужно подождать данные прежде,чем получить-выполнить действие только, когда сервер вернет данные
  .then((res) => {
    //console.log(res)
    //массив рес//перебрали каждый элемент,взяли из объектов name и link и передали ф-цию createItem
    res.forEach((arrayItem) => {
      const newItem = createItem({
        name: arrayItem.name,
        link: arrayItem.link,
      });
      addItem(newItem);
    });
  });
