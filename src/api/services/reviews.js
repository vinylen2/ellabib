import api from '@/api/api';

export default {
  getAll() {
    return api.get('reviews/').then(response => response.data);
  },
  create(data) {
    return api.post('reviews/', data).then(response => response.data);
  },
};
