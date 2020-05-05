"use strict";

let body = document.querySelector('body');

// Проверяем, запущен скрипт с главной страницы (index.html) или нет
let indexFlag = Boolean(document.querySelector('.intro'));

// Код для модального окна в зависимости от того, с главной ли страницы работает скрипт
let modalCallMe;

if (indexFlag) {
  modalCallMe = `
  <div id="modalCallMe">
    <div id="blur-over"></div>
    <div class="modal-window modal-callMe">
      <div class="close-cross__container"><div class="close-cross" id="close-callMe">×</div></div>
      <form class="modal-window__main">
        <h4>Добро пожаловать!</h4>
        <p>Оставьте номер, я Вам перезвоню!</p>
        <input type="text" name="modal-name" id="modal-name" placeholder="Ваше имя">
        <input type="text" name="modal-phone" id="modal-phone" placeholder="Ваш телефон">
        <div class="link-banner" id="modalCallMeLaunch">
          <span>заказать звонок</span>
          <img src="./images/banners/arrow-next-white.png" alt="arrow-next">
        </div>
      </form>
    </div>
  </div>
`;
}
if (!indexFlag) {
  modalCallMe = `
  <div id="modalCallMe">
    <div id="blur-over"></div>
    <div class="modal-window modal-callMe">
      <div class="close-cross__container"><div class="close-cross" id="close-callMe">×</div></div>
      <form class="modal-window__main">
        <h4>Добро пожаловать!</h4>
        <p>Оставьте номер, я Вам перезвоню!</p>
        <input type="text" id="modal-name"  name="modal-name" placeholder="Ваше имя">
        <input type="text" id="modal-phone" name="modal-phone" placeholder="Ваш телефон">
        <div class="link-banner" id="modalCallMeLaunch">
          <span>заказать звонок</span>
          <img src="../images/banners/arrow-next-white.png" alt="arrow-next">
        </div>
      </form>
    </div>
  </div>
`;
}

document.querySelector('.header__button').onclick = function() {
  body.insertAdjacentHTML('afterbegin', modalCallMe);
  
  document.getElementById('close-callMe').onclick = function() {
    document.getElementById("modalCallMe").remove();
  }

  document.getElementById("modalCallMeLaunch").onclick = function() {
    // Проверки
    let errorFlag = false;
    let name = document.getElementById('modal-name');
    let phone =  document.getElementById('modal-phone');
    name.classList.remove('error');
    phone.classList.remove('error');

    if (!(name.value)) {
      errorFlag = true;
      name.classList.add('error');
    }

    let phoneArr = phone.value.trim().split("");
    if (phoneArr[0] == '8') phoneArr.shift();
    if (phoneArr[0] == "+" && phoneArr[1] == "7") {
      phoneArr.shift();
      phoneArr.shift();
    }
    phoneArr = phoneArr.filter( item => isFinite(item) && item != " ");
    if (phoneArr.length != 10) {
      errorFlag = true;
      phone.classList.add("error");
    }

    if (errorFlag) return;

    // Отправка данных формы, ожидание ответа
    let form = document.querySelector(".modal-window__main");
    let phpPath;
    if (indexFlag) {
      phpPath = "./php/call-me-back_db.php";
    }
    if (!indexFlag) {
      phpPath = "../php/call-me-back_db.php";
    }
    fetch(phpPath, {
      method: "POST",
      body: new FormData(form)
    }).then(response => response.json())
    .then(result => feedback(result), () => feedback(false));

    function feedback(result) {
     document.getElementById("modalCallMe").remove();
      if (result) {
        body.insertAdjacentHTML("afterbegin", callMeBackConfirm);
      }
      else {
        body.insertAdjacentHTML("afterbegin", callMeBackFail);
      }
      document.getElementById("close-info").onclick = function() {
        document.getElementById('subscribeInfo').remove();
      }      
    }    
  }
}

let callMeBackConfirm = `
  <div id="subscribeInfo">
    <div id="blur-over"></div>
    <div class="modal-window modal-info">
      <div class="close-cross__container"><div class="close-cross" id="close-info">×</div></div>
      <div class="modal-window__main">
        <h3>Спасибо, Ваш<br>запрос отправлен!</h3>
        <h6>Я перезвоню Вам как можно скорее</h6>
      </div>
    </div>
  </div>
`;
let callMeBackFail = `
  <div id="subscribeInfo">
    <div id="blur-over"></div>
    <div class="modal-window modal-info">
      <div class="close-cross__container"><div class="close-cross" id="close-info">×</div></div>
      <div class="modal-window__main">
        <h3>Что-то пошло не так...</h3>
        <h6>В данный момент сервер не работает.<br>Пожалуйста, попробуйте повторить запрос позже.</h6>
      </div>
    </div>
  </div>
`;

//=================================================
// Подписка на рассылку
document.getElementById("subscribe-button").onclick = function () {
  //Проверки  
  let  emailField = document.getElementById("subscribe-email");
  emailField.oninput = function() {
    emailField.classList.remove('error');
  };
  let emailArr = emailField.value.trim().split("@");
  if(!emailArr[1]) {
    emailField.classList.add("error");
    return;
  }
  let mailDomain = emailArr[1].split('.');
  if (!emailArr[0] || !mailDomain[0] || !mailDomain[1]) {
    emailField.classList.add("error");
    return;
  }
  emailField.oninput = '';
  //На сервер, путь зависит от того, с какой страницы запущена функция
  let phpPath;
    if (indexFlag) {
      phpPath = "./php/subscribe_db.php";
    }
    if (!indexFlag) {
      phpPath = "../php/subscribe_db.php";
    }

    fetch(phpPath, {
      method: "POST",
      body: emailField.value,
    }).then(response => response.json())
    .then(result => onAnswer(result), () => onAnswer(false)); 

    function onAnswer(answer) {
      if (answer) {
        body.insertAdjacentHTML('afterbegin', subscribeConfirm);
      }
      else {
        body.insertAdjacentHTML('afterbegin', subscribeFail);
      }

      document.getElementById('close-info').onclick = function() {
        document.getElementById("subscribeInfo").remove();
        emailField.value = '';
      }
    }

}

let subscribeConfirm = `
  <div id="subscribeInfo">
    <div id="blur-over"></div>
    <div class="modal-window modal-info">
      <div class="close-cross__container"><div class="close-cross" id="close-info">×</div></div>
      <div class="modal-window__main">
        <h3>Спасибо!</h3>
        <h6>Вы успешно подписаны на рассылку</h6>
      </div>
    </div>
  </div>
`;

let subscribeFail = `
  <div id="subscribeInfo">
    <div id="blur-over"></div>
    <div class="modal-window modal-info">
      <div class="close-cross__container"><div class="close-cross" id="close-info">×</div></div>
      <div class="modal-window__main">
        <h3>Что-то пошло не так...</h3>
        <h6>В данный момент служба подписки не работает.<br>Пожалуйста, попробуйте подписаться позже.</h6>
      </div>
    </div>
  </div>
`;

function sendMail(email) {
  fetch('http://smilya.ru/finance/php/subscribe_db.php', {
    method: "POST",
    body: email,
  }).then(response => response.json()).then(console.log);
}