import api from '@/api/api';

export default {
  getAll(id) {
    return api.get(`reviews/id/${id}`).then(response => response.data);
  },
  create(data) {
    return api.post('reviews/', data).then(response => response.data);
  },
  getInactive() {
    return api.get('reviews/inactive').then(response => response.data);
  },
  bulkActivate(data) {
    return api.patch('reviews/', data).then(response => response.data);
  },
  editReviewAudio(data) {
    return api.patch('reviews/audio/edit', data).then(response => response.data);
  },
  incrementPlay(data) {
    return api.patch('reviews/increment', data).then(response => response.data);
  },
  updateRating(data) {
    return api.patch('reviews/rating', data).then(response => response.data);
  },
  updateText(data) {
    return api.patch('reviews/text', data).then(response => response.data);
  },
  deleteReview(data) {
    return api.patch('reviews/delete', data).then(response => response.data);
  },
};
