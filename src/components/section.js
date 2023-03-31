export const itemSection = document.querySelector(".elements-grid");

export function addItem(newItem) {
  itemSection.prepend(newItem);
}
