// itemName - класс элемента, в которых есть dropdown
// в каждом item-name имеется:
// dropdown__arrows: dropdown__arrowOpen & dropdown__arrowClosed, dropdown__body

function setDropdowns(itemName) {
  let items = document.querySelectorAll(`.${itemName}`);
  for (let item of items) {
    item.querySelector('.dropdown__arrows').addEventListener('click', () => {
      item.querySelector('.dropdown__arrowOpen').classList.toggle('hidden');
      item.querySelector('.dropdown__arrowClosed').classList.toggle('hidden');
      item.querySelector('.dropdown__body').classList.toggle('hidden');
    })
  }
}