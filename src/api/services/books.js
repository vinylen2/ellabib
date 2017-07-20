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
  getAllFromGenres(genreIds) {
    return api.get('books', {
      params: {
        genre: genreIds,
      },
    })
    .then(response => response.data);
  },
  create(data) {
    return api.post('books/', data).then(response => response.data);
  },
  search(queries) {
    return api.get('books/search', { params: queries }).then(response => response.data);
  },
};
