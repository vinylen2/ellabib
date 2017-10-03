import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/components/Books';
import Frontpage from '@/components/Frontpage';
import BookDescription from '@/components/BookDescription';
import PublishReview from '@/components/PublishReview';
import Scanner from '@/components/Scanner';
import ActivateReviews from '@/components/ActivateReviews';
import Admin from '@/components/Admin';
import PostBook from '@/components/PostBook';

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
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/activate-reviews',
      name: 'activate-reviews',
      component: ActivateReviews,
    },
    {
      path: '/post-book',
      name: 'post-book',
      component: PostBook,
    },
  ],
});
