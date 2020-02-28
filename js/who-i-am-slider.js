let initialDataField = document.querySelector('.slider-who-i-am__initialData');
let recomendationsField = document.querySelector('.slider-who-i-am__recomendations');
let outcomeField = document.querySelector('.slider-who-i-am__outcome');
let paginationPanel = document.querySelector(".slider-pagination");
for (let i = 0; i < cases.length; i++) {
  let newDot = document.createElement('div');
  newDot.classList.add('slider-pagination-dot');
  paginationPanel.append(newDot);
}
let paginationDots = document.querySelectorAll('.slider-pagination-dot');
let currentCase = 0;

switchCase(currentCase);

function switchCase(number) {
  initialDataField.innerHTML = cases[number].initialData;
  recomendationsField.innerHTML = cases[number].recomendations;
  outcomeField.innerHTML = cases[number].outcome;
  for (let dot of paginationDots) {
    dot.classList.remove('active');
  }
  paginationDots[number].classList.add('active');
}

document.querySelector('.slider-button--right').onclick = function() {
  currentCase++;
  if (currentCase === cases.length) {
    currentCase = 0;
  }
  switchCase(currentCase);
}

document.querySelector('.slider-button--left').onclick = function() {
  currentCase--;
  if (currentCase ===-1) {
    currentCase = cases.length - 1;
  }
  switchCase(currentCase);
}
