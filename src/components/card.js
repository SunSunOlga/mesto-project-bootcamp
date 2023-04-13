import {
  openFormCards,
  closePopup,
  itemSection,
  openPhoto,
  cardItem,
} from "./modal";
import { toggleButton } from "./validate";
import { deleteCards, deleteLike, setLike } from "./api";
import { userId, initialInfo } from "../pages/script";

const itemTemplate = document
  .querySelector(".item-template")
  .content.querySelector(".element");

//удаление карточки
export function deleteItem(event) {
  event.target.closest(".element").remove();
}

//перенос объектов из модального окна и образование карточек
export function createItem(card, userId) {
  //template для карточек и разметка для них
  const cardItem = document.querySelector(".element");
  //const cardNewElement = itemTemplate.cloneNode(true);
  const newItemCard = itemTemplate.cloneNode(true);
  const itemName = newItemCard.querySelector(".element__caption");
  const itemPicture = newItemCard.querySelector(".element__picture");
  const buttonLikeCard = newItemCard.querySelector(".js-like-element");
  const buttonDeleteCard = newItemCard.querySelector(".js-delete-element");
  const itemNumberLike = newItemCard.querySelector(".element__number-like");


  //делаем контейнер и перенос данных
  itemName.textContent = card.name;
  itemPicture.src = card.link;
  itemPicture.alt = card.name;
  itemPicture.id = card.cardId;
  //возвращаем вол-во элементов в массиве
  itemNumberLike.textContent = card.likes.length;


  function openItem(evt) {
    openPhoto({ name: evt.target.alt, link: evt.target.src });
  }

  if (userId === card.owner["_id"]) {
    buttonDeleteCard.addEventListener("click", (evt) => {
      const currentIdCard = evt.target.closest(".element").querySelector(".element__picture").id;
      deleteCards(currentIdCard).then(deleteItem(evt)).catch(console.dir);
    })
  } else {
    buttonDeleteCard.remove();
  }

/* const massivLikes = card.likes;
massivLikes.array.forEach(element => {
  if (element._id === userId)
});
 */
buttonLikeCard.likes = card.likes.map((el) =>{ return el._id})

if (containLikesMy(buttonLikeCard.likes)) buttonLikeCard.classList.toggle("element__button-like_active");

  function containLikesMy(likes) {
    //используем метод includes,чтобы убедитьсяб,что объект находится в массиве
    return likes.includes(userId);
  }

  buttonLikeCard.addEventListener("click", (event) => {
    //здесь мы берем результат(res) и из него по новой запрашиваем сколько у нас лайков и проставляем кол-во
    function changeLikeSection(res) {
      event.target.likes = res.likes.map((el) => {
        return el._id;
      });
      event.target.classList.toggle("element__button-like_active");
      itemNumberLike.textContent = event.target.likes.length;
    }

    //установка или удаление лайков как запрос из апи,в then прописываем обновление самого лайка
    if (containLikesMy(event.target.likes)) {
      deleteLike(card._id)
      //в then всегда получаем новый массив,поэтому в ф-ции changeLikeSection
        .then(changeLikeSection)
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLike(card._id)
        .then(changeLikeSection)
        .catch((err) => {
          console.log(err);
        });
    }
  });

  //слушатели на фотографии
  itemPicture.addEventListener("click", openItem);

  return newItemCard;
}

//itemSection.append(cardNewElement)
