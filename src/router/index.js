import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/components/Books';
import Frontpage from '@/components/Frontpage';
import BookDescription from '@/components/BookDescription';

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
      name: 'books',
      component: Books,
    },
    {
      path: '/book/:slug',
      name: 'bok',
      component: BookDescription,
      props: true,
    },
  ],
});
