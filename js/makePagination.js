function makePagination(pagesNumber, pageBar, fillFunc, sourceArr, items, anchor) {
  for (let i = 0; i < pagesNumber; i++) {
    let pageSquare = document.createElement("div");
    pageSquare.innerHTML = '<span>' + (i+1) + '</span>';
    pageBar.append(pageSquare);
  }

  let pageSquares = document.querySelectorAll(".pagination>div");

  for (let i = 0; i < pagesNumber; i++) {
    pageSquares[i].onclick = function() {
      for (let j of pageSquares) {
        j.classList.remove("active");
      }
  
      pageSquares[i].className = "active";
  
      fillFunc(i, items, sourceArr);    
      
      document.location = anchor;
    };
  }

}

function removePagination() {
  let pageSquares = document.querySelectorAll(".pagination>div");
  for (let i of pageSquares) {
    i.remove();
  }
}