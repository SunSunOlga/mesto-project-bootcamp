import "./index.css";

import { configValidation } from "../components/constants";

import { enableValidation } from "../components/validate";

import { createItem, buttonDeleteCard, deleteItem } from "../components/card";

import { addItem, itemSection } from "../components/section";

import {
  getCards,
  setCards,
  getProfileServer,
  patchProfile,
} from "../components/api";

import { changeProfileInfo, getProfileInfo } from "../components/profile";



let userId;

//нам нужно,что когда мы получили карточки,то профиль уже был.тк объект,который приходит с карточек,то нам нужно отличать свои карточки от чужих//будем сравнивать owner,id с id текущего пользователя
export function initialInfo() {
  //показываем,что оба запроса выполнились(успешно)//в массиве мб неограниченное кол-во запросов,которые будут выполняться в промисе
  //из запросов функций создаем массив
  //деструктиризация кода-когда сложный объект разбираешь на части сразу присваивая значения отдельным переменным
  //ф-ция,которая возвращает промис,потому вызыввем ф-ции внутри
  Promise.all([getCards(), getProfileServer()])
    //два результата также в массиве
    //then это функция(лямбда)
    .then(([cards, user, userId]) => {
      const { name, about, _id } = user;
      userId = user._id;
      changeProfileInfo(user);
      //cейчас получаем карточку
      cards.reverse().forEach((card) => {
        addItem({
          name: card.name,
          link: card.link,
          objectLikes: card["likes"],
          idCard: card["_id"],
          ownerCard: card["owner"],
          authorizedServer: user,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
initialInfo();

//включаем валидации,настройки передаем при вызове
enableValidation(configValidation);



/* ////используем модуль
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
 */


/* //выносим массив в секцию для карт
initialCards.forEach((arrayItem) => {
  const newItem = createItem(arrayItem);
  addItem(newItem);
}); */

/* //обработка необработанного отклонения промисов
window.addEventListener("unhandledrejection", (evt) => {
  console.error("Необработанная ошибка.\nМесто возникновения: ");
  console.error(evt.promise);
  console.error("Информация об ошибке:");
  console.error(evt.reason);
}); */
