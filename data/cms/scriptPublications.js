let dateObj = new Date();
let thisMonth = dateObj.getMonth() + 1;
if (thisMonth<10) {thisMonth = "0" + thisMonth};
let today = `${dateObj.getDate()}.${thisMonth}.${dateObj.getFullYear()}`;

let submitBtn = document.getElementById('submitBtn');
let removeBtn = document.getElementById('removeBtn');

let dateField = document.getElementById('date');
dateField.value = today;
let titleField = document.getElementById('title');
let linkField = document.getElementById("link");
let synopsisField = document.getElementById("syn");
let fileField = document.getElementById('fileLoader');
let articleNumField = document.getElementById('articleNum');

function correctDate(date) {
  let ddmmyyyy = date.split('.');
  let dd = ddmmyyyy[0];
  if (!(dd.length == 2 && 0 < +dd && +dd < 32)) return false;
  
  let mm = ddmmyyyy[1];
  if (!(mm.length == 2 && 0 < +mm && +mm < 13)) return false;
  
  let yyyy = ddmmyyyy[2];
  if (!(yyyy.length == 4 && 2019 < +yyyy)) return false;

  return true;
}

function ifFilled() {
  if (!linkField.value || !titleField.value || !synopsisField.value) return false;
  return true;
}

function fileName(path, defaultFileName) {
  let pathArr = path.split('\\');
  let name = pathArr[pathArr.length-1];

  if (!name) return defaultFileName;
  return name;
}

function ArticleObj(date, title, synopsis, link, image) {
  this.date = date;
  this.title = title;
  this.synopsis = synopsis;
  this.link = link;
  this.image = image;
}

function amendPublications(publications) {
  let str = JSON.stringify(publications);

  fetch('./publicationsWriter.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: str,
  });
  
}

removeBtn.onclick = function() {
  let num = +articleNumField.value - 1;

  if (num < 0 || num > publications.length-1) {
    alert("Данные некорректны");
    return;
  }

  let publication = publications[num];
  let publicationStr = `
    Дата: ${publication.date}
    Имя: ${publication.title}`;

  if (confirm(`Удалить статью: ${publicationStr}`)) {
    publications.splice(num, 1);
    amendPublications(publications);
    articleNumField.value = '1';

    fetch('./imageRemover.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: publication['image'],
    });
  }

  setTimeout(() => {
    window.location.reload(true);
  }, 2000);
  
}


submitBtn.onclick = function() {
    if (!ifFilled() || !correctDate(today)) {
      alert("Данные некорректны");
      return;
    }
    

    let imageName = fileName(fileField.value, "2019-11-07.jpg");
   
    let newPublication = new ArticleObj(today, titleField.value, synopsisField.value, linkField.value, imageName);
    publications.unshift(newPublication);

    amendPublications(publications);

    alert("Новая статья добавлена на сайт");

    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
}