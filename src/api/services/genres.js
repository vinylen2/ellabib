import api from '@/api/api';

export default {
  getAll() {
    return api.get('genres/').then(response => response.data);
  },
  create(data) {
    return api.post('genres/', data).then(response => response.data);
  },
};
