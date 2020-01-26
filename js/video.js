let items = document.querySelectorAll('.item');
let pagesNumber = Math.ceil(videos.length / 9);
let pageBar = document.querySelector('.pagination');
let anchor = "#video-anchor"

function fillItems(page, items, videoArr) {
  for (let i of items) {
    i.classList.add('item--hidden');
  }

  for (let i = 0; i < 9; i++) {
    let item = items[i];
    let video = videoArr[page*9+i];
    if (!video) return;

    item.children[0].setAttribute('src', video.src);
    item.children[1].innerHTML = video.title; 
    item.classList.remove('item--hidden');    
  }
}

fillItems(0, items, videos);

makePagination(pagesNumber, pageBar, fillItems, videos, items, anchor);
document.querySelector(".pagination>div:first-of-type").className = "active";

//==========================================

function filterVideos(tag) {
  let arr = [];

  for (let i = 0; i < videos.length; i++) {
    let tags = videos[i].tags;
    for (let j=0; j<tags.length; j++) {
      if (tags[j] == tag) arr.push(videos[i]);
    }    
  }

  return arr;
}


function fillFilteredPage(tag) {
  let filteredArr = filterVideos(tag);
  fillItems(0, items, filteredArr);
  removePagination();
  numOfPages = Math.ceil(filteredArr.length / 9);
  makePagination(numOfPages, pageBar, fillItems, filteredArr, items, anchor);
  document.querySelector(".pagination>div:first-of-type").className = "active";
}

let tags = document.querySelectorAll('.tags>li');

function highlightTag(tagNum) {
  for (let i of tags) {
    i.classList.remove("active");
  }
  tags[tagNum].classList.add("active");
}

tags[0].onclick = function(){fillFilteredPage("Финансы");highlightTag(0);};
tags[1].onclick = function(){fillFilteredPage("Консультации");highlightTag(1);};
tags[2].onclick = function(){fillFilteredPage("Деньги");highlightTag(2);};
tags[3].onclick = function(){fillFilteredPage("Планирование");highlightTag(3);};
tags[4].onclick = function(){fillFilteredPage("Инвестиции");highlightTag(4);};
tags[5].onclick = function(){fillFilteredPage("Недвижимость");highlightTag(5);};
