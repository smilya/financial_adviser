"use strict";

let launchConsultation = document.getElementById('launchConsultation');
let nameField = document.querySelector('#consultationForm>input[name="name"]');
let emailField = document.querySelector('#consultationForm>input[name="email"]');
let textField = document.querySelector('#consultationForm>textarea[name="text"]');

// Снимаем класс ошибки с полей, когда в них вводятся данные
  nameField.oninput = function () {
    nameField.classList.remove("error");
  }
  emailField.oninput = function () {
    emailField.classList.remove("error");
  }
  textField.oninput = function () {
    textField.classList.remove("error");
  }

launchConsultation.onclick = function() { 

  // Блок проверок
  {
    // Флаг сигнализирующий, что обнаружена ошибка в полях
    let errorFlag = false;
    
    if (nameField.value == '') {
      nameField.classList.add('error');
      errorFlag = true;
    }
    
    if (emailField.value == '') {
      emailField.classList.add('error');
      errorFlag = true;
    }

    let emailArr = emailField.value.split('@');
    if (emailArr[1] == undefined) {
      emailField.classList.add('error');
      errorFlag = true;
    }
    else {
      let zone = emailArr[1].split('.')[1];
      if (zone == undefined) {
        emailField.classList.add('error');
        errorFlag = true;
      }
    }
    
    if (textField.value == '') {
      textField.classList.add('error');
      errorFlag = true;
    }

    if (errorFlag == true) {
      errorFlag = false;
      return;
    }
  }

  let form = document.getElementById('consultationForm');

  // Проверяем, вызвана ли функция с главной страницы (index.html)
  let indexFlag = document.querySelector('.intro');
  let phpPath;
  if (indexFlag) {
    phpPath = "./php/consultations_db.php";
  }
  else {
    phpPath = "../php/consultations_db.php";
  }

  fetch(phpPath, {
    method: 'POST',
    body: new FormData(form),
  }).then(response => response.json())
  .then(result => feedback(result), () => feedback(false)); 
 
  function feedback(result) {
    let body = document.querySelector('body');

    if (result) {
      body.insertAdjacentHTML("afterbegin", consultatinConfirm);
    }
    else {
      body.insertAdjacentHTML("afterbegin", consultationFail);
    }

    document.getElementById("close-info").onclick = function() {
      document.getElementById('consultationInfo').remove();
    }

    form.reset();
  }

} 
   let consultatinConfirm = `
    <div id="consultationInfo">
      <div id="blur-over"></div>
      <div class="modal-window modal-info">
        <div class="close-cross__container"><div class="close-cross" id="close-info">×</div></div>
        <div class="modal-window__main">
          <h3>Спасибо, Ваш<br>запрос отправлен!</h3>
          <h6>Я свяжусь с Вами как можно скорее</h6>
        </div>
      </div>
    </div>
   `;

   let consultationFail = `
    <div id="consultationInfo">
      <div id="blur-over"></div>
      <div class="modal-window modal-info">
        <div class="close-cross__container"><div class="close-cross" id="close-info">×</div></div>
        <div class="modal-window__main">
          <h3>Что-то пошло не так...</h3>
          <h6>В настоящее время сервер не работает.<br>Попробуйте отправить заявку позже.</h6>
        </div>
      </div>
    </div>
   `;
  
