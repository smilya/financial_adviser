"use strict"

let mediaItems = document.querySelectorAll('.publications .item');

for (let i=0; i<3; i++) {  
  mediaItems[i].children[0].setAttribute("src", ('./images/publications/' +  publications[i].image));
  mediaItems[i].children[1].children[0].innerHTML = publications[i].title;
  mediaItems[i].children[1].children[1].innerHTML = publications[i].synopsis;
  mediaItems[i].children[2].firstElementChild.setAttribute('href', publications[i].link)
}


let iframes = document.querySelectorAll("iframe");
iframes[0].src = videos[0].src;
iframes[1].src = videos[1].src;

let launchConsultation = document.getElementById('launchConsultation');
launchConsultation.onclick = function() {
  
  let form = document.getElementById('consultationForm');

  fetch('./php/consultation.php', {
    method: 'POST',
    body: new FormData(form),
  });
  
  alert("Спасибо за обращение!\r\n Мы свяжемся с вами вближайшее время.");
  form.reset();

}