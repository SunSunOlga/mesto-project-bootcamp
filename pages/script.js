
const buttonEdit = document.querySelector('.js-edit-profile');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonLike = document.querySelector('.js-like-element');
const buttonClose = document.querySelector('.js-close-form');
const formBlock = document.querySelector('.popup');
const inputForm = document.querySelector('.form__field');




//кнопка лайк меняет цвет
/*
buttonLike.addEventListener('click', PushLike)
function PushLike() {
buttonLike.classList.add('button-like_active');
}
*/

function VisibleForm() {
  formBlock.classList.add('popup_opened');
}
buttonEdit.addEventListener('click', VisibleForm);



function HiddenForm(evt) {
  formBlock.classList.remove('popup_opened');
  const basikForm = document.querySelector('.js-form');
  basikForm.reset();
}
buttonClose.addEventListener('click', HiddenForm )




/*
const nameInput = document.querySelector('.js-input-name');
const jobInput = document.querySelector('.js-input-job');
 const basikForm = document.querySelector('.js-form');
const buttonSave = document.querySelector('.js-save-form');
 const itemInput = document.querySelector('.form__field');


function addForm(evt) {
  evt.preventDefautlt();
  nameInput.textContent = input.value;
  jobInput.textContent = input.value;

}

buttonSave.addEventListener('click', addForm)
*/

