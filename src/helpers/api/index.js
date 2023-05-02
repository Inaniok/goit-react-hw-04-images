import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(value, page = 1) {
  const searchParams = new URLSearchParams({
    key: `33556347-34338037d24ce35911151359c`,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 12,
    q: value,
  });

  const response = await axios.get(`?${searchParams}`);
  return response.data;
}