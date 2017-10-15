import api from '@/api/api';

export default {
  getAll() {
    return api.get('books/').then(response => response.data);
  },
  get(id) {
    return api.get(`books/id/${id}`).then(response => response.data);
  },
  getFromSlug(slug) {
    return api.get(`books/slug/${slug}`).then(response => response.data);
  },
  getFromIsbn(isbn) {
    return api.get(`books/isbn/${isbn}`).then(response => response.data);
  },
  publishBookFromIsbn(isbn, genreId) {
    return api.post('books/publish/isbn', { isbn, genreId }).then(response => response.data);
  },
  publishBookFromManualInput(isbn, genreId, title, pages, authorId, imageUrl) {
    return api.post('books/publish/manual', { isbn, genreId, title, pages, authorId, imageUrl }).then(response => response.data);
  },
  search(queries) {
    return api.get(`books/search?query=${queries}`).then(response => response.data);
  },
  searchFromGenre(genre, queries) {
    return api.get(`books/genre/${genre}/search?query=${queries}`).then(response => response.data);
  },
};
