'use strict'

let pagination = {
  currentData: null,
  buttonLeft: document.querySelector('.pagination__button--left'),
  buttonRight: document.querySelector('.pagination__button--right'),
  set currentPage(value) {
    document.querySelector('.pagination__current').innerText = value;
    this.checkButtons();
  },
  get currentPage() {
    return + document.querySelector('.pagination__current').innerText;
  },
  set totalPages(value) {
    document.querySelector('.pagination__total').innerText = value;
    this.checkButtons();
  },
  get totalPages() {
    return + document.querySelector('.pagination__total').innerText;
  },
  
  checkButtons: function () {
    this.buttonLeft.classList.remove('pagination__button--disabled');
    this.buttonRight.classList.remove('pagination__button--disabled');
    if (this.currentPage <= 1) {
      this.buttonLeft.classList.add('pagination__button--disabled');
    }
    if (this.currentPage === this.totalPages) {
      this.buttonRight.classList.add('pagination__button--disabled');
    }
  },

  setButtonsHandler: function(layOutFunction) {
    document.querySelector('.pagination').addEventListener('click', (event) => {
      if (!event.target.classList.contains('pagination__button')) return;
      if (event.target.classList.contains('pagination__button--disabled')) return;
      let pageIncrease = 1;
      if (event.target.classList.contains('pagination__button--left')) {
        pageIncrease = -1;
      }
      let newPageNum = this.currentPage + pageIncrease;
      this.currentPage = newPageNum;
      layOutFunction(this.currentData, newPageNum);
      document.location = "#pagination-anchor";
    })
  }
};

function f(data, num) {
  console.log(`data: ${data}, pageNum: ${num}`);
}