"use strict";

let mediaItems = document.querySelectorAll('.publications .item');

fetch("http://smilya.ru/finance/php/index-page.php")
// fetch("../php/index-page.php")
  .then(response => response.json())
  .then(obj => {
    let iframes = document.querySelectorAll("iframe");
    iframes[0].src = obj.videos[0];
    iframes[1].src = obj.videos[1];
    for (let i=0; i<obj.publications.length; i++) {  
      mediaItems[i].children[0].setAttribute("src", ('./images/publications/' +  obj.publications[i].image));
      mediaItems[i].children[1].children[0].setAttribute("src", ('./images/opinion/mass-media-' +  obj.publications[i].logo + '.jpg'));
      mediaItems[i].children[2].children[0].innerHTML = obj.publications[i].title;
      mediaItems[i].children[2].children[1].innerHTML = obj.publications[i].synopsis;
      mediaItems[i].children[3].firstElementChild.setAttribute('href', obj.publications[i].link)
    }    
  });
