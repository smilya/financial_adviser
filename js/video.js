let items = document.querySelectorAll('.item');
let pagesNumber = Math.ceil(videos.length / 9);
let pageBar = document.querySelector('.pagination');
let anchor = "#video-anchor"

function fillItems(page, items) {
  for (let i of items) {
    i.classList.add('item--hidden');
  }

  for (let i = 0; i < 9; i++) {
    let item = items[i];
    let video = videos[page*9+i];
    if (!video) return;

    item.children[0].setAttribute('src', video.src);
    item.children[1].innerHTML = video.title; 
    item.classList.remove('item--hidden');    
  }
}

fillItems(0, items);

makePagination(pagesNumber, pageBar, fillItems, items, anchor);
document.querySelector(".pagination>div:first-of-type").className = "active";