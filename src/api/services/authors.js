import api from '@/api/api';

export default {
  getAll() {
    return api.get('authors/').then(response => response.data);
  },
  create(data) {
    return api.post('authors/', data).then(response => response.data);
  },
};
