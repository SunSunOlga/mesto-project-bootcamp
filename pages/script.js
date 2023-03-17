
const buttonEdit = document.querySelector('.js-edit-profile');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonLike = document.querySelector('.js-like-element');
const buttonClose = document.querySelector('.js-close-form');
const inputForm = document.querySelector('.form__field');
const blockPopup = document.querySelector('.popup');
const buttonSave = document.querySelector('.js-save-form');






//кнопка лайк меняет цвет
/*
buttonLike.addEventListener('click', PushLike)
function PushLike() {
buttonLike.classList.add('button-like_active');
}
*/

function VisibleForm() {
  blockPopup.classList.add('popup_opened');
}
buttonEdit.addEventListener('click', VisibleForm);

function closeForm() {
  blockPopup.classList.remove('popup_opened');
  blockForm.reset();
}
buttonClose.addEventListener('click', closeForm )


const blockForm = blockPopup.querySelector('.js-form');
const nameInput = blockForm.querySelector('.js-input-name');
const jobInput = blockForm.querySelector('.js-input-job');

function addForm(evt) {
  evt.preventDefautlt();

  nameInput.setAttribute('value');
  jobInput.setAttribute('value');

  const NewItemName = nameProfile.cloneNode(true);
  const NewItemJob = jobProfile.cloneNode(true);
  const nameProfile = document.querySelector('.js-name-profile');
  const jobProfile = document.querySelector('.js-job-profile');

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  nameProfile.append(NewItemName);
  jobProfile.append(NewItemJob);

}

buttonSave.addEventListener('click', addForm)


