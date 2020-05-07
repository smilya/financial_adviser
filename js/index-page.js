"use strict";

let mediaItems = document.querySelectorAll('.publications .item');

for (let i=0; i<3; i++) {  
  mediaItems[i].children[0].setAttribute("src", ('./images/publications/' +  publications[i].image));
  mediaItems[i].children[1].children[0].setAttribute("src", ('./images/opinion/mass-media-' +  publications[i].logo + '.jpg'));
  mediaItems[i].children[2].children[0].innerHTML = publications[i].title;
  mediaItems[i].children[2].children[1].innerHTML = publications[i].synopsis;
  mediaItems[i].children[3].firstElementChild.setAttribute('href', publications[i].link)
}

fetch("http://smilya.ru/finance/php/index-page.php")
  .then(response => response.json())
  .then(obj => {
    let iframes = document.querySelectorAll("iframe");
    iframes[0].src = obj.videos[0];
    iframes[1].src = obj.videos[1];
    // Еще тут принять из объекта obj данные по статьям и загрузить их
  });
