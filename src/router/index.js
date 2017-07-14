import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Frontpage from '@/components/Frontpage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Frontpage',
      component: Frontpage,
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello,
    },
  ],
});
