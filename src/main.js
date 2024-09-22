import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loader = document.querySelector('.loader');
let query = '';
let page = 1;

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  clearGallery();
  showLoader();

  fetchImages(query, page)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        renderImages(data.hits);
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

iziToast.settings({
  position: 'topRight'
});

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}