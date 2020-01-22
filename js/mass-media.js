"use strict";

let items = document.querySelectorAll('.publications .item');
let pageBar = document.querySelector('.pagination');
let pagesNumber = Math.ceil(publications.length / 6);

let dummyItem = document.createElement('div');
dummyItem.classList.add("item--dummy");
let itemsBox = document.querySelector(".items-box");

function fillItems(page) {

  for (let i of items) {
    i.classList.add('item--hidden');
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];    
    let unit = publications[6*(page) + i];
    if (unit == undefined) {
        item.classList.add("item--hidden");
        continue;
      }

    
   
    item.classList.remove('item--hidden');

    item.children[0].setAttribute("src", ('../images/publications/' +  unit.image));
    item.children[1].children[0].innerHTML = unit.title;
    item.children[1].children[1].innerHTML = unit.synopsis;
    item.children[2].children[0].innerHTML = unit.date;
    item.children[2].children[1].setAttribute('href', unit.link);
  }

} 

fillItems(0);

for (let i = 0; i < pagesNumber; i++) {
  let pageSquare = document.createElement("div");
  pageSquare.innerHTML = '<span>' + (i+1) + '</span>';
  pageBar.append(pageSquare);
}

document.querySelector(".pagination>div:first-of-type").className = "active";

let pageSquares = document.querySelectorAll(".pagination>div");

for (let i = 0; i < pagesNumber; i++) {
  pageSquares[i].onclick = function() {
    for (let j of pageSquares) {
      j.classList.remove("active");
    }

    pageSquares[i].className = "active";

    fillItems(i);    
    
    document.location = "#publications-anchor";
  };
}