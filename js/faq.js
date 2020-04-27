"use strict";
//Блок кода работы с формой "Задать вопрос"
{
  let modalAskQuestion = document.getElementById("modal-askQuestion");  
  let nameField = document.querySelector(".modal-window__main input[name='name']");
  let emailField = document.querySelector(".modal-window__main input[name='email']");
  let questionField = document.querySelector(".modal-window__main textarea");

  document.getElementById('close-info').onclick = function () {
    modalAskQuestion.classList.add('hidden');
    nameField.value = '';
    nameField.classList.remove('error');
    emailField.value = '';
    emailField.classList.remove('error');
    questionField.value = '';
    questionField.classList.remove('error');
  }

  document.getElementById("openAskQuestion").onclick = function () {
    modalAskQuestion.classList.remove('hidden');
  } 

  document.getElementById("launchAskQuestion").onclick = function () {
    let errorFlag = false;

    nameField.classList.remove("error");
    emailField.classList.remove("error");
    questionField.classList.remove("error");
    
    if (nameField.value.trim() == '') {
      errorFlag = true;
      nameField.classList.add('error');
    }
    
    if (questionField.value.trim() == '') {
      errorFlag = true;
      questionField.classList.add('error');
    }
    
    let emailArr = emailField.value.trim().split("@");
    if(!emailArr[1] || !emailArr[0] ) {
      emailField.classList.add("error");
      errorFlag = true;
    }
    if (emailArr[1]) {
      let mailDomain = emailArr[1].split('.');
      if (!mailDomain[0] || !mailDomain[1]) {
        emailField.classList.add("error");
        errorFlag = true;
      }
    }
    
    if (errorFlag) return;

    let body = document.querySelector("body");
    let form = document.querySelector("form");
    fetch("../php/ask-question.php", {
      method: "POST",
      body: new FormData(form),
    }).then(response => response.json())
      .then(result => showResult(result), () => showResult(false));
        
    let askQuestionConfirm = `
      <div id="askQuestionInfo">
        <div id="blur-over"></div>
        <div class="modal-window modal-info">
          <div class="close-cross__container"><div class="close-cross" id="close-info-2">×</div></div>
          <div class="modal-window__main">
            <h3>Спасибо, ваш<br>вопрос отправлен!</h3>
            <h6>Я отвечу на него как можно скорее</h6>
          </div>
        </div>
      </div>
    `;
    let askQuestionFail = `
      <div id="askQuestionInfo">
        <div id="blur-over"></div>
        <div class="modal-window modal-info">
          <div class="close-cross__container"><div class="close-cross" id="close-info-2">×</div></div>
          <div class="modal-window__main">
            <h3>Что-то пошло не так...</h3>
            <h6>В настоящее время сервер не работает.<br>Попробуйте повторить позже</h6>
          </div>
        </div>
      </div>
    `;

    function showResult(result) {
      modalAskQuestion.classList.add('hidden');

      if (result) {
        body.insertAdjacentHTML('afterbegin', askQuestionConfirm);
      }
      else {
        body.insertAdjacentHTML('afterbegin', askQuestionFail);
      }
  
      document.getElementById('close-info-2').onclick = function() {
        document.getElementById("askQuestionInfo").remove();
        nameField.value = '';
        emailField.value = '';
        questionField.value = '';
      }
    }
  }
}

// Выведение вопросов из базы в панель и фильтрация по тегам

  let faqItemHTML = `
      <div class="faq-item__header">
        <p class="faq-title"></p>
        <div class="faq-item__arrows dropdown__arrows">
          <img class="faq-arrow-whenClosed dropdown__arrowClosed" src="../images/faq/arrow-down.png" alt="arrow-down">
          <img class="faq-arrow-whenOpen dropdown__arrowOpen hidden" src="../images/faq/arrow-up.png" alt="arrow-up">                
        </div>
      </div>
      <div class="faq-item__body dropdown__body hidden">
        <p class="faq-answer"></p> 
        <div class="faq-video-container">
          <iframe width="230" height="156" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <p class="faq-video-text"></p>
        </div>   
      </div>            
  `;

  function faq__putQuestions(questionsArr, page=1) {
    clearFaqPanel();
    pagination.currentData = questionsArr;
    let itemsOnPage = 7;
    pagination.totalPages= Math.ceil(questionsArr.length / itemsOnPage); 
    if (!pagination.totalPages) {
      pagination.currentPage = 0;
      return;
    }
    pagination.currentPage = page;
    for (let i = 0; i < itemsOnPage; i++) {
      if ((page - 1) * itemsOnPage + i >= questionsArr.length) break;
      let newFaqItem = document.createElement('div');
      newFaqItem.classList.add('faq-item');
      newFaqItem.innerHTML = faqItemHTML;
      document.querySelector(".faq-panel").append(newFaqItem);

      newFaqItem.querySelector('.faq-title').innerText = questionsArr[(page - 1) * itemsOnPage + i].title;
      newFaqItem.querySelector('.faq-answer').innerText = questionsArr[(page - 1) * itemsOnPage + i].answer;
      newFaqItem.querySelector('.faq-video-text').innerText = questionsArr[(page - 1) * itemsOnPage + i].videoText;
      newFaqItem.querySelector('iframe').src = questionsArr[(page - 1) * itemsOnPage + i].videoLink;
    }
    setDropdowns('faq-item');

    function clearFaqPanel() {
      let items = document.querySelectorAll('.faq-item');
      for (let i of items) i.remove();
    }  
  }


  