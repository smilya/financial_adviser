"use strict";

let videoPanel = document.querySelector(".video-panel");
// let currentVideos = videos;

let itemInnerHTML = `
  <iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p></p>`;

function video__layOutVideos(videos, page=1) {
  clearVideoPanel();
  pagination.currentData = videos;
  let itemsOnPage = 9;
  pagination.totalPages= Math.ceil(videos.length / itemsOnPage);
  if (!pagination.totalPages) {
    pagination.currentPage = 0;
    return;
  }
  pagination.currentPage = page;
  for (let i = 0; i < itemsOnPage; i++) {
    if ((page - 1) * itemsOnPage + i >= videos.length) break;
    let newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = itemInnerHTML;
    document.querySelector('.item--dummy').before(newItem);
    newItem.querySelector('iframe').setAttribute('src', videos[(page - 1) * itemsOnPage + i].src) ;
    newItem.querySelector('p').innerText = videos[(page - 1) * itemsOnPage + i].title;
  }

  function clearVideoPanel() {
    let items = document.querySelectorAll('.item');
    for (let item of items) item.remove();
  }
}

function video__proceedVideos(callback) {
  fetch('http://smilya.ru/finance/php/getVideos_db.php')
    .then(response => response.json())
    .then(callback);
}