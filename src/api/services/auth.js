import api from '@/api/api';

export default {
  login(data) {
    return api.post('auth/admin', data).then(response => response.data);
  },
  ip() {
    return api.get('auth/').then(response => response.data);
  },
  logout() {
    return api.get('auth/logout').then(response => response.data);
  },
};
