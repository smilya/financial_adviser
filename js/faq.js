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
    }).then(response => response.text()).then(result => showResult(result));
        
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
      console.log(result);

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
        <div class="faq-item__arrows">
          <img class="faq-arrow-whenClosed" src="../images/faq/arrow-down.png" alt="arrow-down">
          <img class="faq-arrow-whenOpen hidden" src="../images/faq/arrow-up.png" alt="arrow-up">                
        </div>
      </div>
      <div class="faq-item__body hidden">
        <p class="faq-answer"></p> 
        <div class="faq-video-container">
          <iframe width="230" height="156" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <p class="faq-video-text"></p>
        </div>   
      </div>            
  `;

  let faqPanel = document.querySelector(".faq-panel");
  let tags = document.querySelectorAll('.faq-tags li');

  function putQuestions(questionsArr) {
    clearFaqPanel()    
    for (let questionObj of questionsArr) {
      let newFaqItem = document.createElement('div');
      newFaqItem.classList.add('faq-item');
      newFaqItem.innerHTML = faqItemHTML;
      faqPanel.append(newFaqItem);

      newFaqItem.querySelector('.faq-title').innerText = questionObj.title;
      newFaqItem.querySelector('.faq-answer').innerText = questionObj.answer;
      newFaqItem.querySelector('.faq-video-text').innerText = questionObj.videoText;
      newFaqItem.querySelector('iframe').src = questionObj.videoLink;
    }
    setOpenClose();
  }

  function clearFaqPanel() {
    let items = document.querySelectorAll('.faq-item');
    for (let i of items) i.remove();
  }

  function setOpenClose() {
  let arrowsBlocks = document.querySelectorAll(".faq-item__arrows");
  let questionBodies = document.querySelectorAll(".faq-item__body");
  
  for (let i = 0; i < arrowsBlocks.length; i++) {
    arrowsBlocks[i].onclick = function() {
      let arrows = arrowsBlocks[i].querySelectorAll('img');
      arrows[0].classList.toggle('hidden');
      arrows[1].classList.toggle('hidden');
      questionBodies[i].classList.toggle('hidden');
      }
    }
  }
  
 
  for (let tag of tags) {
    tag.onclick = function() {
      if (tag.classList.contains('active')) {
        tag.classList.remove('active');
        putQuestions(faqs);
      }
      else {
        tag.classList.add('active');
        let tagText = tag.innerText.slice(1).toLowerCase();
        let taggedQuestions = [];
        for (let question of faqs) {
          if (question.tags.includes(tagText)) {
            taggedQuestions.push(question);
          }
        }
        putQuestions(taggedQuestions); 
      }

     
    }
  }

  putQuestions(faqs);