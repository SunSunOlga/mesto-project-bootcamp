export const itemSection = document.querySelector(".elements-grid");

export function addItem(createItem(card, userId)) {
  itemSection.prepend(card);
}
 import { createItem } from "./card";
