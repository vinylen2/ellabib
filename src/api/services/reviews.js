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
};
