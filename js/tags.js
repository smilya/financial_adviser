'use strict'

function tags__layOutTags(tagsArr, tagsContainer) {
  tagsArr.sort();
  tagsArr.unshift('все темы');
  for (let tag of tagsArr) {
    let li = document.createElement('li');
    li.className = 'tag';
    li.innerHTML = `#${tag[0].toUpperCase()}${tag.slice(1)}`;
    tagsContainer.append(li);
  }
  document.querySelectorAll('.tag')[0].classList.add('active');
  return tagsArr;
}

function tags__filterDataOnTag(data, tag) {
  let result = [];
  for (let dataItem of data) {
    for (let dataTag of dataItem.tags) {
      if (dataTag === tag) {
        result.push(dataItem);
      }
    }
  }
  return result;
}

function tags__filterDataOnTags(data, tags) {
  let currentData = data;
  for (let tag of tags) {
    currentData = tags__filterDataOnTag(currentData, tag);    
  }
  return currentData;
}

function tags__setTagHandlers(data, layOutItemsFunction) {
  document.querySelector('.tags').addEventListener('click', (event) => {
    if (!event.target.classList.contains('tag')) return;
    tags__tagClickHandler(event.target, data, layOutItemsFunction);
  })
}

function tags__tagClickHandler(tagElem, data, layOutItemsFunction) {
  let allThemesTag = document.querySelectorAll('.tag')[0];
  if (tagElem === allThemesTag) {
    let activeTags = document.querySelectorAll('.tags .active');
    for (let tag of activeTags) {
      tag.classList.remove('active');
    }
    tagElem.classList.add('active');
    layOutItemsFunction(data);
  }
  else {
    allThemesTag.classList.remove('active');
    tagElem.classList.toggle('active');
    let activeTags = document.querySelectorAll('.tags .active');
    if (activeTags.length === 0) {
      allThemesTag.classList.add('active');
      layOutItemsFunction(data);
    }
    let activeTagsNames = [];
    for (let activeTag of activeTags) {
      activeTagsNames.push(getTagName(activeTag));
    }
    let currentData = tags__filterDataOnTags(data, activeTagsNames);
    layOutItemsFunction(currentData);
  }

  function getTagName(tagElem) {
    return tagElem.innerText.slice(1).toLowerCase();
  }

}