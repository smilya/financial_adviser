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
  if (numOfPages) {
    makePagination(numOfPages, pageBar, fillItems, filteredArr, items, anchor);
    document.querySelector(".pagination>div:first-of-type").className = "active";
  }
  
}

function highlightTag(tagNum) {
  for (let i of tags) {
    i.classList.remove("active");
  }
  tags[tagNum].classList.add("active");
}

function onTagClick(tagNum, tag) {
  if (tags[tagNum].classList.contains('active')) {
    tags[tagNum].classList.remove('active');
    fillItems(0, items, videos);
    return;
  }

  fillFilteredPage(tag);
  highlightTag(tagNum);
}

let tags = document.querySelectorAll('.tags>li');

tags[0].onclick = function(){ onTagClick(0, "Финансы") };
tags[1].onclick = function(){ onTagClick(1, "Консультации") };
tags[2].onclick = function(){ onTagClick(2, "Деньги") };
tags[3].onclick = function(){ onTagClick(3, "Планирование") };
tags[4].onclick = function(){ onTagClick(4, "Инвестиции") };
tags[5].onclick = function(){ onTagClick(5, "Недвижимость") };
