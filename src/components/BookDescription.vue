<template>
  <div class="container">
    <div class="admin-nav"
      v-if="$store.state.isAdmin">
        <a class="admin-anchor"
          @click="editBook">Ändra bokinfo
        </a>
        <modal name="edit-book"
          :height="350">
          <edit-book
            @leaveModal="leaveModal"
            :bookId="currentBook.id"
            :author="author"
            :genre="genre"
            :title="currentBook.title"
            :pages="currentBook.pages">
          </edit-book>
        </modal>
        <a class="admin-anchor"
          @click="$store.commit('toggleQr', {
              title: currentBook.title,
              slug: currentBook.slug,
              id: currentBook.id
            })">
            <p v-if="!inQr(currentBook.id)">+QR</p>
            <p v-else>-QR</p>
        </a>
    </div>
    <div class="wrapper">
      <div class="description flex-container">
        <div class="image"
          @click="changeDescription">
          <img class="front-img"
            v-if="currentBook.localImage"
            :src="`${imagesUrl}${currentBook.imageUrl}`" />
          <img class="front-img"
            v-if="!currentBook.localImage"
            :src="currentBook.imageUrl"/>
        </div>
        <div class="text">
          <header class="book-header">
            <h1>{{ currentBook.title }}</h1>
            <!-- To-do: link to page with books from author -->
             <p class="author">av:
               <router-link class="authorlink"
                :to="{ name: 'books', params: { forceSearch: author.fullName }}">
                {{author.fullName }}
               </router-link>
             </p>
          </header>
          <div class="description-body">
            <p class="no-review"
              v-if="reviews.length == 0 && $store.getters.isAllowedToPublish">Bli den första att recensera boken genom att trycka på stjärnan!</p>
            <p class="no-review"
              v-if="reviews.length == 0 && !$store.getters.isAllowedToPublish">Det finns ingen recension för boken.</p>
            <p v-if="reviews.length > 0"
              >{{ randomDescription.description }}</p>
            <div class="buttons flex-container">
              <audio-player class="audio-player btn"
                v-if="randomDescription.descriptionAudioUrl"
                :sources="formattedAudioUrl(randomDescription.descriptionAudioUrl)"
                :audioInfo="{
                  book: {
                    title: currentBook.title,
                    id: currentBook.id,
                  },
                  type: 'description',
                  id: randomDescription.id,
                }">
              </audio-player>
              <router-link :to="{ name: 'books', params: { genre: genre }}"
                class="btn">
                <img class="genre-icon"
                  :src="`${imagesUrl}${genre.slug}.png`">
              </router-link>
              <router-link class="review-a btn"
                v-if="$store.getters.isAllowedToPublish"
                :to="{ name: 'publish-review', params: { book: currentBook }}">
                <div class="button review-button">&#9733;</div>
              </router-link>
            </div>
            <div class="book-information flex-container">
                <div class="flex-left">Genre</div>
                <div class="flex-right">{{ genre.name }}</div>
                <div class="flex-left">Sidor</div>
                <div class="flex-right">{{ currentBook.pages }}</div>
                <div class="flex-left">Betyg</div>
                <div class="flex-right">
                  <star-rating v-bind:read-only="true"
                     v-bind:max-rating="5"
                     inactive-color="#c2c7c9"
                     active-color="#c98bdb"
                     v-bind:star-size="20"
                     :rtl="true"
                     :increment="0.5"
                     v-model="currentBook.rating">
                  </star-rating>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reviews"
        v-if="reviews.length > 0">
        <h2>Recensioner</h2>
        <div class="review"
          v-for="review in reviews"
          v-if="review.review.length > 0">
          <header class="review-header flex-container">
            <!-- To-do: link to page for reviewer -->
            <div class="review-text">
              <span>
                Publicerad den {{ formattedDate(review.createdAt) }} &nbsp;
              </span>
            </div>
            <star-rating class="review-rating" :read-only="true"
                  :max-rating="5"
                  inactive-color="#c2c7c9"
                  active-color="#c98bdb"
                  :star-size="20"
                  v-model="review.rating">
            </star-rating>
          </header>
          <div class="review-body">
            <p>{{ review.review }}</p>
            <audio-player class="review-audio player"
              v-if="review.reviewAudioUrl"
              :sources="formattedAudioUrl(review.reviewAudioUrl)"
              :audioInfo="{
                book: {
                  title: currentBook.title,
                  id: currentBook.id,
                },
                type: 'review',
                id: randomDescription.id,
              }">
            </audio-player>
          </div>
        <hr v-if="reviews.length > 0">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import AudioPlayer from '@/components/AudioPlayer';
import EditBook from '@/components/EditBook';
import StarRating from 'vue-star-rating';

import Vue from 'vue';
import moment from 'moment';
import VModal from 'vue-js-modal';
import _ from 'lodash';
import Icon from 'vue-awesome';
import 'moment/locale/sv';

Vue.use(VModal);

export default {
  components: {
    'audio-player': AudioPlayer,
    EditBook,
    StarRating,
    Icon,
  },
  data() {
    return {
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
      reviews: [],
      randomDescription: {},
      currentBook: {},
      author: {
        fullName: '',
        id: null,
      },
      pausePlayer: {
        status: false,
        id: null,
      },
      genre: {
        name: '',
        slug: '',
        id: null,
      },
    };
  },
  metaInfo() {
    return {
      title: this.currentBook.title,
    };
  },
  created() {
    this.$nextTick(() => {
      this.getBookFromSlug();
    });
  },
  methods: {
    inQr(id) {
      if (_.findIndex(this.$store.state.qrArray, { id }) > -1) {
        return true;
      }
      return false;
    },
    // pauseOtherPlayers(data) {
    //   console.log(data.id);
    //   this.pausePlayer.status = data.status;
    //   this.pausePlayer.id += data.id;
    // },
    editBook() {
      this.$modal.show('edit-book');
    },
    leaveModal(data) {
      if (data) {
        this.currentBook.title = data.title;
        this.currentBook.pages = data.pages;
        this.author = data.author;
        this.genre = data.genre;
      }
      this.$modal.hide('edit-book');
    },
    formattedAudioUrl(endingOfUrl) {
      return [this.audioUrl + endingOfUrl];
    },
    formattedDate(date) {
      return moment(date).format('Do MMMM');
    },
    randomizeNumber(max) {
      return Math.floor(Math.random() * (max + 1));
    },
    changeDescription() {
      const randomInt = this.randomizeNumber(this.reviews.length - 1);
      this.randomDescription = this.reviews[randomInt];
      if (this.randomDescription.description.length < 1) {
        this.changeDescription();
      }
    },
    getBookFromSlug() {
      Books.getFromSlug(this.$route.params.slug)
        .then((result) => {
          if (result.data.reviews.length > 0) {
            const reviews = result.data.reviews;
            this.reviews = reviews;
            this.changeDescription();
          }
          this.currentBook = result.data;
          this.genre = result.data.genres[0];
          if (result.data.authors.length > 0) {
            this.author.fullName = `${result.data.authors[0].firstname} ${result.data.authors[0].lastname}`;
            this.author.id = result.data.authors[0].id;
          }
        });
    },
    getReviews(id) {
      Reviews.getAll(id)
        .then((result) => {
          this.reviews = result.data;
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0;
}

.description {
  margin-top: 20px;
}
.wrapper {
  margin: 0 auto;
  max-width: 950px;
}

.admin-nav {
  width: 100%;
  background-color: #9ddad8;
  display: block;
  height: 60px;
}

.admin-anchor {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding-left: 20px;
  font-size: 1.5em;
  text-decoration: none;
  line-height:60px;
  cursor: pointer;
}

.admin-anchor:hover {
  color: black;
  font-weight: bold;
}

.authorlink {
  color: #2c3e50;
  font-weight: bold;
}
hr {
  margin-top: 25px;
}

.center {
  justify-content:center;
}

.btn {
  margin-right: 5px;
}

.button {
  padding: 0;
  border: none;
  margin-right: 5px;
  font-weight: bold;
  font-size: 2em;
  line-height: 70px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  color: #2c3e50;
  background-color: #9ddad8;
  text-align: center;
  cursor: pointer;
}

.button:hover {
  background-color: #71c5e8;
}

.no-review {
  font-weight: bold;
  color: #ff585d;
}

.author {
  margin-bottom:10px;
}
.review-header {
  line-height: 20px;
  margin-bottom: 10px;
}

.flex-left {
  margin-top: 5px;
  width: 48%;
  font-weight: bold;
}

.flex-right {
  margin-top: 5px;
  width: 48%;
  text-align: right;
}

.genre-icon {
  border-radius: 100%;
  width: 70px;
  cursor: pointer;
}

.audio-player {
  float:left;
}

.buttons {
  align-items:center;
  margin: 10px 0;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}

.image {
  padding: 10px;
  box-sizing: border-box;
  width: 200px;
  flex: 0 0 98%;
  margin: 0 1% 0px;
}

.text {
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
  flex: 0 0 98%;
  margin: 0 1% 0px;
}

.description-audio {
  margin: 10px 0 10px 0;
}

.player {
  margin: 10px 0 10px 0;
}


h1 {
  font-size: 2em;
  margin-bottom: 5px;
  font-weight: bold;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  text-align: left;
  padding-left: 10px;
  margin: 0 1% 0;
}

.review {
  padding: 10px;
  text-align: left;
  margin: 0 1% 0;
}

.review-button {
  font-size: 3em;
  background-color: #c98bdb;
  font-weight: bold;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

.review-a {
  margin-left: 5px;
  text-decoration: none;
}

.review-button:hover {
  background-color: #f277c6;
}

dt {
  font-weight: bold;
}

.front-img {
  width: 200px;
}

@media (min-width: 770px) {
    .image {
        flex: 0 0 20.0%;
    }
    .text {
        flex: 0 0 70.0%;
    }
}
</style>
