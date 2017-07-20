import api from '@/api/api';

export default {
  getAll(id) {
    return api.get(`reviews/id/${id}`).then(response => response.data);
  },
  create(data) {
    return api.post('reviews/', data).then(response => response.data);
  },
};
