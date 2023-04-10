import {
  openFormCards,
  closePopup,
  cardItem,
  itemSection,
  openPhoto,
} from "./modal";
import { toggleButton } from "./validate";
import { deleteCards } from "./api";

const itemTemplate = document
  .querySelector(".item-template")
  .content.querySelector(".element");

//функции для лайка-дизлайка/удаления фото
export function toggleLike(event) {
  event.target.classList.toggle("element__button-like_active");
}

//будет попадатьь id карточки ,в которой сработал слушатель
export function deleteItem(id, card) {
  deleteItem(id)
    //ничего не получаем,тк карточка удалаяется
    .then(() => {
      //элемент card должны удалить
      card.remove();
    })
    //catch получает параметр(ошибку) и её выводит в консоль
    .catch((err) => {
      console.log(err);
    });
}

//перенос объектов из модального окна и образование карточек
export function createItem(card) {
  const newItemCard = itemTemplate.cloneNode(true);
  const itemName = newItemCard.querySelector(".element__caption");
  const itemPicture = newItemCard.querySelector(".element__picture");
  const buttonLikeCard = newItemCard.querySelector(".js-like-element");
  const buttonDeleteCard = newItemCard.querySelector(".js-delete-element");


  //делаем контейнер и перенос данных
  itemName.textContent = card.name;
  itemPicture.src = card.link;
  itemPicture.alt = card.name;
  itemPicture.id = card.cardId;

  function openItem(evt) {
    openPhoto({ name: evt.target.alt, link: evt.target.src });
  }

  //слушатели на карточке
  buttonLikeCard.addEventListener("click", toggleLike);
  //используем стрелочную функцию и передаем айтем с айди//в параметры добавили 2ой параметр -наш готовый элемент
  buttonDeleteCard.addEventListener("click", () =>
    deleteItem(card.id, newItemCard)
  );
  //слушатели на фотографии
  itemPicture.addEventListener("click", openItem);

  return newItemCard;
}

//itemSection.append(cardNewElement)
