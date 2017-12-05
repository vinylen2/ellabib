<template>
  <div class="container">
    <swiper ref="swiper"
      class="header-swiper"
      :options="swiperOptions">
      <swiper-slide>
        <div class="header">
          <router-link to="/books">
            <div class="header-text"
              v-if="$store.state.count.books != 0">
              <span class="one">
                {{$store.state.count.books}}
              </span>
              <span>böcker</span>
            </div>
          </router-link>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="header">
          <router-link to="/books">
            <div class="header-text"
              v-if="$store.state.count.books != 0">
              <span class="one">
                {{$store.state.count.reviews}}
              </span>
              <span>recensioner</span>
            </div>
          </router-link>
        </div>
      </swiper-slide>
    <div class="swiper-button-prev swiper-button-black"
      slot="button-prev"
      v-if="!$store.state.userAgent.isMobile">
    </div>
    <div class="swiper-button-next swiper-button-black"
      slot="button-next"
      v-if="!$store.state.userAgent.isMobile">
    </div>
    </swiper>
    <div class="flex-container">
      <book-list class="list"
        title="Topplistan"
        :books="$store.state.highestRatedBooks">
      </book-list>
      <book-list class="list"
        title="Nyligen recenserade"
        :books="$store.state.recentlyReviewedBooks">
      </book-list>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import BookList from '@/components/BookList';
import Vue from 'vue';
import VueParallaxJs from 'vue-parallax-js';
import VueAwesomeSwiper from 'vue-awesome-swiper';

require('swiper/dist/css/swiper.css');

Vue.use(VueParallaxJs);
Vue.use(VueAwesomeSwiper);

export default {
  name: 'frontpage',
  metaInfo: {
    title: 'Startsida',
  },
  components: {
    BookList,
  },
  created() {
    this.getRecentlyReviewed();
    this.getHighestRated();
    this.getCount();
  },
  data() {
    return {
      swiperOptions: {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        slidesPerGroup: 1,
        centeredSlides: true,
        autoplay: 5000,
      },
    };
  },
  methods: {
    getCount() {
      Books.count()
        .then((result) => {
          this.$store.commit('count', {
            books: result.data.books.count,
            reviews: result.data.reviews.count,
          });
        });
    },
    getRecentlyReviewed() {
      Books.getRecentlyReviewed()
        .then((result) => {
          this.$store.commit('recentlyReviewedBooks', result.data);
        });
    },
    getHighestRated() {
      Books.getHighestRated()
        .then((result) => {
          this.$store.commit('highestRatedBooks', result.data);
        });
    },
  },
};
</script>

<style scoped>
a {
  color: #2c3e50;
  cursor: pointer;
}
.container {
  margin: 0;
  display: block;
}

.header-text {
  position: absolute;
  top: 20%;
  left: 20%;
  vertical-align: center;
}
.one {
  font-size: 3em;
  font-weight: bold;
}

span {
  display:inline-block;
  font-size: 2em;
}

.header {
  height: 300px;
  width: 100%;
  background-color: #d4ecc5;
}

.container {
}

.flex-container {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.list {
  padding: 10px;
  box-sizing: border-box;
  flex: 0 0 98%;
  margin: 0 1% 30px;
}


@media (min-width: 600px) {
    .list {
      flex: 0 0 48%;
    }
    header {
      height: 300px;
    }
}
</style>
