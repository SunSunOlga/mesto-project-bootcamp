import { configValidation } from "../components/constants";
import { openPopup } from "../components/modal";

//найдем спан,в котором показывает ошибку/выводим текст ошибки/передали .validationMessage
export function showError(formElement, inputElement, errorMessage, config) {
  const errorField = formElement.querySelector("#error-" + inputElement.id);
  errorField.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

//очищаем текст ошибки
export function hideError(formElement, inputElement, config) {
  const ErrorField = formElement.querySelector("#error-" + inputElement.id);
  ErrorField.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}
//проверям-есть поле или нет/принимаем в параметры форму(проброс функции через эту)
export function checkValid(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, config);
  } else {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    ); //взяли из инпута
  }
}

//проверем валидна форма или нет
export function toggleButton(formElement, buttonSubmitForm) {
  if (formElement.checkValidity()) {
    buttonSubmitForm.disabled = false;
  } else {
    buttonSubmitForm.disabled = true;
  }
}

export function setEventListener(formElement, config) {
  //проверяем инфу в момент реального времени,валидация полей/цикл,который вешает слушатель на любой инпут
  const inputList = formElement.querySelectorAll(config.inputFieldSelector);
  const buttonSubmitForm = formElement.querySelector(
    config.buttonSubmitSelector
  );
  toggleButton(formElement, buttonSubmitForm);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValid(formElement, inputElement, config);
      // записать функцию для активности доступа кнопки
      toggleButton(formElement, buttonSubmitForm);
    });
  });
}
//в эту функцию примем объект с настройками(конфигуратор)
export function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListener(formElement, config); //пробрасываем конфиг в дргуие функции
  });
}
