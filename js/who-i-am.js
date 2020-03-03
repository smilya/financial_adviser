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
let blackout = document.querySelector('.slider-blackout');
let currentCase = 0;

switchCase(currentCase);

function switchCase(number) {
  blackout.classList.remove('hidden');
  setTimeout( () => {blackout.classList.add('hidden');}, 100)
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

function showDocument(innerHTML) {
  let modal = document.createElement('div');
  modal.innerHTML = innerHTML;
  document.querySelector('.who-i-am__certificates').prepend(modal);
  document.getElementById("blur-over").onclick = function() {modal.remove();};
  document.querySelector(".modal-window").onclick = function() {modal.remove();};
}

document.getElementById('showDiploma').onclick = function() {
  inner = '<div id="blur-over"></div><div class="modal-window modal-window--documents"><div class="close-cross close-cross-documents">×</div><img class="modal-window-image" src="../images/who-i-am/diploma.jpg" alt="document"></div>';
  showDocument(inner);
}

document.getElementById('showREU').onclick = function() {
  let inner = '<div id="blur-over"></div><div class="modal-window modal-window--documents"><div class="close-cross close-cross-documents">×</div><img class="modal-window-image" src="../images/who-i-am/diploma-REU.jpg" alt="document"></div>';
  showDocument(inner);
}

document.getElementById('showFSFR_1').onclick = function() {
  let inner = '<div id="blur-over"></div><div class="modal-window modal-window--documents modal-window--verticalDoc"><div class="close-cross close-cross-documents">×</div><img class="modal-window-image" src="../images/who-i-am/FSFR-1.jpg" alt="document"></div>';
  showDocument(inner);
}

document.getElementById('showFSFR_5').onclick = function() {
  let inner = '<div id="blur-over"></div><div class="modal-window modal-window--documents modal-window--verticalDoc"><div class="close-cross close-cross-documents">×</div><img class="modal-window-image" src="../images/who-i-am/FSFR-5.jpg" alt="document"></div>';
  showDocument(inner);
}

