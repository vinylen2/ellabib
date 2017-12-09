import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/components/Books';
import Frontpage from '@/components/Frontpage';
import BookDescription from '@/components/BookDescription';
import PublishReview from '@/components/PublishReview';
import Scanner from '@/components/Scanner';
import ActivateReviews from '@/components/ActivateReviews';
import PostBook from '@/components/PostBook';
import About from '@/components/About';
import Login from '@/components/Login';
import Admin from '@/components/Admin';
import QrCodes from '@/components/QrCodes';
import Store from '@/stores/store';
import VueAnalytics from 'vue-analytics';
import Meta from 'vue-meta';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
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
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'activate-reviews',
          name: 'activate-reviews',
          component: ActivateReviews,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'post-book',
          name: 'post-book',
          component: PostBook,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'qr-codes',
          name: 'qr-codes',
          component: QrCodes,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (Store.state.isAdmin) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
  next();
});

Vue.use(VueAnalytics, {
  // id: 'UA-110562368-1', // demo
  id: 'UA-110562368-3', // real
  router,
  autoTracking: {
    pageviewTemplate(route) {
      return {
        page: route.path,
        title: document.title,
        location: window.location.href,
      };
    },
  },
});

export default router;
