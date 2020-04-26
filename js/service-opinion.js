'use strict'

/* let caseNumber = 2;
fillSlider(cases, caseNumber); */

function serviceOpinion__fillSlider(cases, number=1) {
  pagination.currentData = cases;
  pagination.totalPages= cases.length; 
  if (!pagination.totalPages) {
    pagination.currentPage = 0;
    return;
  }
  pagination.currentPage = number;

  let blackout = document.querySelector('.slider-blackout');
  blackout.classList.remove('hidden');
  setTimeout(() => blackout.classList.add('hidden'), 100);
  document.querySelector('.slider-service-opinion__container h4').innerText = cases[number-1].title;
  document.querySelector('.slider-service-opinion__container p').innerText = cases[number-1].text;
  document.getElementById('link-analytics').href = '../data/for_download/' + cases[number-1].analytics;
  document.getElementById('link-report').href = '../data/for_download/' + cases[number-1].report;
  
}
