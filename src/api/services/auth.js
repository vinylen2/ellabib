import api from '@/api/api';

export default {
  adminLogin(data) {
    return api.post('auth/admin', data).then(response => response.data);
  },
  ip() {
    return api.get('auth/').then(response => response.data);
  },
};
