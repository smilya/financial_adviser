let menuElements = [
  document.querySelector('ul'),
  document.querySelector('.header__phone'),
  document.querySelector('.header__email'),
  document.querySelector('.header__button'),
  document.querySelector('.panel__socials'),
];

let burger = document.querySelector('.burger');
let burgerSubstrat = document.querySelector('.burgerSubstrat');

let burgerClosed = true;

burger.onclick = function() {
  if (!burgerSubstrat.classList.contains('burgerSubstrat--inAction')) {
    burgerSubstrat.classList.add("burgerSubstrat--inAction");
    document.querySelector('.burgerOpposite').classList.add('hidden');
    for (let elem of menuElements) {     
      elem.classList.add('visible');    
    }
    addServiceMenu();
  }
  else {
    for (let elem of menuElements) {      
      elem.classList.remove('visible');    
    }
    burgerSubstrat.classList.remove("burgerSubstrat--inAction");
    document.querySelector('.burgerOpposite').classList.remove('hidden');
    removeServiceMenu();
  }
}

document.getElementById('topLinkToIndex').addEventListener('click', () => {
  for (let elem of menuElements) {
    elem.classList.remove('visible');
  }
  burgerSubstrat.classList.remove("burgerSubstrat--inAction");
  document.querySelector('.burgerOpposite').classList.remove('hidden');
})

function addServiceMenu() {
  let serviceMenu = document.querySelector('.service-menu');
  if (!serviceMenu) return;
  let menuItemElems = serviceMenu.querySelectorAll('.service-menu-item');
  let itemsDescriptions = [];
  for (let itemElem of menuItemElems) {
    let itemDescription = {};
    itemDescription.className = itemElem.className;
    itemDescription.innerText = itemElem.querySelector('p').innerText;
    itemDescription.href =  itemElem.querySelector('a').getAttribute('href');
    itemsDescriptions.push(itemDescription);
  }
  for (itemDescription of itemsDescriptions) {
    let newItem = document.createElement('a');
    newItem.className = itemDescription.className;
    newItem.classList.add('burger-service-item');
    newItem.setAttribute('href', itemDescription.href);
    newItem.innerText = itemDescription.innerText;
    document.querySelector('a[href="../pages/about-me.html"]').before(newItem);
  }
  return itemsDescriptions;
}

function removeServiceMenu() {
  let menuItems = document.querySelectorAll('.burger-service-item');
  if (!menuItems[0]) return;
  for (let item of menuItems) {
    item.remove();
  }
}

