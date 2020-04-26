"use strict";

function mmedia__fillItems(publications, page=1) {
  let items = document.querySelectorAll('.publications .item');
  pagination.currentData = publications;
  let itemsOnPage = 6;
  pagination.totalPages= Math.ceil(publications.length / itemsOnPage); 
  if (!pagination.totalPages) {
    pagination.currentPage = 0;
    return;
  }
  pagination.currentPage = page;

  for (let i of items) {
    i.classList.add('item--hidden');
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];    
    let unit = publications[itemsOnPage*(page-1) + i];
    if (!unit) return;    
   
    item.classList.remove('item--hidden');

    item.children[0].setAttribute("src", ('../images/publications/' +  unit.image));
    item.children[1].children[0].setAttribute('src', ('../images/opinion/mass-media-' +  unit.logo + '.jpg'));
    item.children[2].children[0].innerHTML = unit.title;
    item.children[2].children[1].innerHTML = unit.synopsis;
    item.children[3].children[0].innerHTML = unit.date;
    item.children[3].children[1].setAttribute('href', unit.link);
  }
} 