const buttonMainSearch = document.querySelector('.button-main-search');

const searchForm = document.querySelector('.search-form');
const arrivalDate = searchForm.querySelector('[name=arrival-date]');
const dateOfDeparture = searchForm.querySelector('[name=date-of-departure]');
const adults = searchForm.querySelector('[name=adults]');
const children = searchForm.querySelector('[name=children]');
const searchFormClassActive = 'search-form-active';
const searchFormClassInactive = 'search-form-inactive';

let isStorageSupport = true;
let localStorageAdults;
let localStorageChildren;
try {
  localStorageAdults = localStorage.getItem('adults');
  localStorageChildren = localStorage.getItem('children');
} catch (e) {
  isStorageSupport = false;
}

if (localStorageAdults || localStorageChildren)  {
  adults.value = localStorageAdults;
  children.value = localStorageChildren;
}

searchForm.classList.remove(searchFormClassActive);
searchForm.classList.add(searchFormClassInactive);

buttonMainSearch.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (!searchForm.classList.contains(searchFormClassInactive)) {
    searchForm.classList.remove(searchFormClassActive);
    return searchForm.classList.add(searchFormClassInactive);
  }

  searchForm.classList.remove(searchFormClassInactive);
  searchForm.classList.add(searchFormClassActive);
  arrivalDate.focus();
});

searchForm.addEventListener("transitionend", function(e){
  arrivalDate.focus();
}, false);

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (searchForm.classList.contains(searchFormClassActive)) {
      evt.preventDefault();
      searchForm.classList.remove(searchFormClassActive);
      return searchForm.classList.add(searchFormClassInactive);
    }
  }
})

searchForm.addEventListener('submit', function (evt) {
  if (!arrivalDate.value || !dateOfDeparture.value ||
      !adults.value || !children.value) {
    return evt.preventDefault();
  }

  if (isStorageSupport) {
    localStorage.setItem('adults', adults.value);
    localStorage.setItem('children', children.value);
  }
});
