import './index.css';

import { initialCards, configValidation }  from '../components/constants';

import { enableValidation } from '../components/validate';

import { createItem } from '../components/card';

import { addItem } from '../components/section';




//выносим массив в секцию для карт
initialCards.forEach((arrayItem) => {
  const newItem = createItem(arrayItem);
  addItem(newItem);
});

//включаем валидации,настройки передаем при вызове
enableValidation(configValidation);
