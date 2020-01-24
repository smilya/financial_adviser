'use strict'

let dateObj = new Date();
let thisMonth = dateObj.getMonth() + 1;
if (thisMonth<10) {thisMonth = "0" + thisMonth};
let today = `${dateObj.getDate()}.${thisMonth}.${dateObj.getFullYear()}`;

let addBtn = document.getElementById('addBtn');
let removeBtn = document.getElementById('removeBtn');

let dateField = document.getElementById('date');
dateField.value = today;
let titleField = document.getElementById('title');
let tagsField = document.getElementById("tags");
let srcField = document.getElementById("src");
let videoNumField = document.getElementById('videoNum');


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
  if (!tagsField.value || !titleField.value || !srcField.value) return false;
  return true;
}


function VideoObj (date, title, tags, src) {
  this.date = date;
  this.title = title;
  this.src = src;
  this.tags = tags;
}

function amendVideos(videos) {
  let str = JSON.stringify(videos);

  fetch('./videosWriter.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: str,
  });
  
}


addBtn.onclick = function() {

  if(!ifFilled() || !correctDate(today)) return;

  let date = dateField.value;
  let title = titleField.value;

  let tagsArr = tagsField.value.split(' ');
  for (let i = 0; i < tagsArr.length; i++) {
    tagsArr[i] = tagsArr[i].toLowerCase();
    let strArr = tagsArr[i].split('');
    strArr[0] = strArr[0].toUpperCase();
    tagsArr[i] = strArr.join(''); 
  }  
      
  let tags = tagsArr; 
  
  let src = srcField.value;

  if ( !(correctDate(date)) || !(ifFilled()) ) {
    alert("Данные некорректны");
    return;
  }

  let newVideoObj = new VideoObj(date, title, tags, src); 

  videos.unshift(newVideoObj);
  
  amendVideos(videos);

  alert("Новое видео добавлено на сайт");

  dateField.value = '';
  titleField.value = '';
  tagsField.value = '';
  srcField.value = '';

  setTimeout(() => {
    window.location.reload(true);
  }, 2000);
}

removeBtn.onclick = function() {
  let num = +videoNumField.value - 1;

  if (num < 0 || num > videos.length-1) {
    alert("Данные некорректны");
    return;
  }

  let video = videos[num];

  let videoStr = `
    Дата: ${video.date}
    Имя: ${video.title}`;

  if (confirm(`Удалить видео: ${videoStr}`)) {
    videos.splice(num, 1);
    amendVideos(videos);
    videoNumField.value = '1';
  }
  
  setTimeout(() => {
    window.location.reload(true);
  }, 2000);

}