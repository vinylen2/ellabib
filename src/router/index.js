import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/components/Books';
import Frontpage from '@/components/Frontpage';
import BookDescription from '@/components/BookDescription';
import PublishReview from '@/components/PublishReview';
import Scanner from '@/components/Scanner';
import ActivateReviews from '@/components/ActivateReviews';
import PostBook from '@/components/PostBook';
// import Store from '@/stores/store';

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
    {
      path: '/book/:slug/review',
      name: 'publish-review',
      component: PublishReview,
      props: true,
    },
    {
      path: '/scanner',
      name: 'scanner',
      component: Scanner,
    },
    {
      path: '/activate-reviews',
      name: 'activate-reviews',
      component: ActivateReviews,
      // beforeEnter(to, from, next) {
      //   if (Store.isAdmin) {
      //     next('/activate-reviews');
      //   } else {
      //     next('/');
      //   }
      // },
    },
    {
      path: '/post-book',
      name: 'post-book',
      component: PostBook,
      // beforeEnter(to, from, next) {
      //   if (Store.isAdmin) {
      //     next('/post-book');
      //   } else {
      //     next('/');
      //   }
      // },
    },
  ],
});
