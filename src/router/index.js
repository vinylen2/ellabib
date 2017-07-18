import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/components/Books';
import Frontpage from '@/components/Frontpage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'frontpage',
      component: Frontpage,
    },
    {
      path: '/books',
      name: 'Books',
      component: Books,
    },
  ],
});
