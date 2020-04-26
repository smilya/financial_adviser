'use strict'

function whoIAm__switchCase(cases, number=1) {
  let initialDataField = document.querySelector('.slider-who-i-am__initialData');
  let recomendationsField = document.querySelector('.slider-who-i-am__recomendations');
  let outcomeField = document.querySelector('.slider-who-i-am__outcome');
  let blackout = document.querySelector('.slider-blackout');

  pagination.currentData = cases;
  pagination.totalPages= cases.length; 
  if (!pagination.totalPages) {
    pagination.currentPage = 0;
    return;
  }
  pagination.currentPage = number;

  blackout.classList.remove('hidden');
  setTimeout( () => {blackout.classList.add('hidden');}, 100)
  initialDataField.innerHTML = cases[number-1].initialData;
  recomendationsField.innerHTML = cases[number-1].recomendations;
  outcomeField.innerHTML = cases[number-1].outcome;
}

function showDocument(innerHTML) {
  let modal = document.createElement('div');
  modal.innerHTML = innerHTML;
  document.querySelector('.who-i-am__certificates').prepend(modal);
  document.querySelector('.container-forAction').onclick = function() {modal.remove();};
}

document.getElementById('showDiploma').onclick = function() {
  inner = '<div class="container-forAction"><div id="blur-over"></div><div class="modal-window modal-window--documents"><div class="close-cross close-cross-documents">×</div><img class="modal-window-image" src="../images/who-i-am/diploma.jpg" alt="document"></div></div>';
  showDocument(inner);
}

document.getElementById('showREU').onclick = function() {
  let inner = '<div class="container-forAction"><div id="blur-over"></div><div class="modal-window modal-window--documents"><div class="close-cross close-cross-documents">×</div><img class="modal-window-image" src="../images/who-i-am/diploma-REU.jpg" alt="document"></div></div>';
  showDocument(inner);
}

document.getElementById('showFSFR_1').onclick = function() {
  let inner = '<div class="container-forAction"><div id="blur-over"></div><div class="modal-window modal-window--documents"><div class="close-cross close-cross-documents">×</div><img class="modal-window-image" src="../images/who-i-am/FSFR-1.jpg" alt="document"></div></div>';
  showDocument(inner);
}

document.getElementById('showFSFR_5').onclick = function() {
  let inner = '<div class="container-forAction"><div id="blur-over"></div><div class="modal-window modal-window--documents"><div class="close-cross close-cross-documents">×</div><img class="modal-window-image" src="../images/who-i-am/FSFR-5.jpg" alt="document"></div></div>';
  showDocument(inner);
}

