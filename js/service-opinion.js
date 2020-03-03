let arrowsList = document.querySelectorAll('.consult-stages__arrows');
let additionsList = document.querySelectorAll('.consult-stages-addition');
// Открыть когда будет описание подпунктов
/* for (let i = 0; i < arrowsList.length; i++) {
  arrowsList[i].onclick = function() {
    arrowsList[i].querySelector('.service-arrow-whenOpen').classList.toggle('hidden');
    arrowsList[i].querySelector('.service-arrow-whenClosed').classList.toggle('hidden');
    additionsList[i].classList.toggle('hidden');
  }
} */

let pagination = document.querySelector('.slider-pagination');
for (let i = 0; i < cases.length; i++) {
  let dot = document.createElement('div');
  dot.classList.add('slider-pagination-dot');
  pagination.append(dot);
}

let caseNumber = 0;
fillSlider(caseNumber);

function fillSlider(num) {
  let dots = document.querySelectorAll('.slider-pagination-dot');
  for (let dot of dots) {
    dot.classList.remove('active');
  }
  let blackout = document.querySelector('.slider-blackout');
  blackout.classList.remove('hidden');
  setTimeout(() => blackout.classList.add('hidden'), 100);
  document.querySelector('.slider-service-opinion__container h4').innerText = cases[num].title;
  document.querySelector('.slider-service-opinion__container p').innerText = cases[num].text;
  document.getElementById('link-analytics').href = '../data/for_download/' + cases[num].analytics;
  document.getElementById('link-report').href = '../data/for_download/' + cases[num].report;
  dots[num].classList.add('active');
}

document.querySelector('.slider-button--right').onclick = function() {
  if(caseNumber < cases.length - 1) { caseNumber++ }
  else { caseNumber = 0; }
  fillSlider(caseNumber);
}

document.querySelector('.slider-button--left').onclick = function() {
  if(caseNumber > 0) { caseNumber-- }
  else { caseNumber = cases.length - 1; }
  fillSlider(caseNumber);
}