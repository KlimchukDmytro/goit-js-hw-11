// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const API_KEY = '46078376-453970e5bd186575301de3a15';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 12) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length === 0) {
      throw new Error("No images found");
    }

    return data.hits;
  } catch (error) {
    throw error;
  }
}