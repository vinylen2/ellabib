import api from '@/api/api';

export default {
  getAll() {
    return api.get('authors/').then(response => response.data);
  },
  create(firstname, lastname) {
    return api.post('authors/', { firstname, lastname }).then(response => response.data);
  },
  find(data) {
    return api.post('authors/find', data).then(response => response.data);
  },
};
