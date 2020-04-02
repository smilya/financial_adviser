let menuElements = [
  document.querySelector('ul'),
  document.querySelector('.header__phone'),
  document.querySelector('.header__email'),
  document.querySelector('.header__button'),
  document.querySelector('.panel__socials')
];

let burger = document.querySelector('.burger');
let burgerSubstract = document.querySelector('.burgerSubstrat');
let burgerClosed = true;

burger.onclick = function() {
  if (!burgerSubstract.classList.contains('burgerSubstrat--inAction')) {
    burgerSubstract.classList.add("burgerSubstrat--inAction");
    document.querySelector('.burgerOpposite').classList.add('hidden');
    for (let elem of menuElements) {
      elem.classList.add('visible');
    }
  }
  else {
    for (let elem of menuElements) {
      elem.classList.remove('visible');
    }
    burgerSubstract.classList.remove("burgerSubstrat--inAction");
    document.querySelector('.burgerOpposite').classList.remove('hidden');
  }
}

document.getElementById('topLinkToIndex').addEventListener('click', () => {
  for (let elem of menuElements) {
    elem.classList.remove('visible');
  }
  burgerSubstract.classList.remove("burgerSubstrat--inAction");
  document.querySelector('.burgerOpposite').classList.remove('hidden');
})


// Скорее всего не нужно, но возможно понадобится при переходах на другие страницы
/* document.querySelector('menu ul').onclick = function(event) {
  if (document.body.clientWidth <= 1350) {
    for (let elem of menuElements) {
      elem.classList.remove('visible');
    }
    burgerSubstract.classList.remove("burgerSubstrat--inAction");
    document.querySelector('.burgerOpposite').classList.remove('hidden');
  }
} */

