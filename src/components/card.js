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
export function deleteItem(event) {
  event.target.closest('.element').remove();
}

//перенос объектов из модального окна и образование карточек
export function createItem(card, user) {
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

  if (user["_id"] === card.owner["_id"]) {
    buttonDeleteCard.addEventListener("click", (evt) => {
      const currentCard = evt.target
        .closest(".element")
        .querySelector(".element__picture").id;
      deleteItem(currentCard).then(deleteItem(evt)).catch(console.dir);
    });
  } else {
    buttonDeleteCard.remove();
  }

  //слушатели на карточке
  buttonLikeCard.addEventListener("click", toggleLike);
  //слушатели на фотографии
  itemPicture.addEventListener("click", openItem);

  return newItemCard;
}

//itemSection.append(cardNewElement)
