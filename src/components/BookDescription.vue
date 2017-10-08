<template>
  <div class="container">
    <div class="wrapper">
      <div class="description flex-container">

        <div class="image">
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
             <p>av: {{ author.name }} </p> 
          </header>
          <div class="description-body">
            <p>{{ randomDescription.description }}</p>
            <div class="buttons flex-container">
              <audio-player class="audio-player" 
                :sources="formattedAudioUrl(randomDescription.descriptionAudioUrl)">
              </audio-player>
              <router-link :to="{ name: 'books', params: { genre: genre }}">
                <img class="genre-icon"
                  :src="`${imagesUrl}${genre.slug}.png`">
              </router-link>
              <router-link class="review-a"
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
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="reviews">
        <h2>Recensioner</h2>
        <div v-for="review in reviews" class="review">
          <header class="review-header flex-container">
            <!-- To-do: link to page for reviewer -->
            <div class="review-text">
              <span>
                Av: recencent den {{ formattedDate(review.createdAt) }} &nbsp;
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
              :sources="formattedAudioUrl(review.reviewAudioUrl)">
            </audio-player>
          </div>

        <hr>
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
import StarRating from 'vue-star-rating';
import moment from 'moment';
import 'moment/locale/sv';

export default {
  components: {
    'audio-player': AudioPlayer,
    StarRating,
  },
  data() {
    return {
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
      reviews: [],
      randomDescription: {},
      currentBook: {},
      author: {
        name: '',
        id: null,
      },
      genre: {
        name: '',
        slug: '',
        id: null,
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.getBookFromSlug();
    });
  },
  methods: {
    formattedAudioUrl(endingOfUrl) {
      return [this.audioUrl + endingOfUrl];
    },
    formattedDate(date) {
      return moment(date).format('Do MMMM');
    },
    randomizeNumber(max) {
      return Math.floor(Math.random() * (max + 1));
    },
    getBookFromSlug() {
      Books.getFromSlug(this.$route.params.slug)
        .then((result) => {
          console.log(result);
          if (result.data.reviews.length > 0) {
            const reviews = result.data.reviews;
            const randomInt = this.randomizeNumber(reviews.length - 1);
            this.reviews = reviews;
            this.randomDescription = reviews[randomInt];
          }
          this.currentBook = result.data;
          this.author.name = `${result.data.authors[0].firstname} ${result.data.authors[0].lastname}`;
          this.author.id = result.data.authors[0].id;
          this.genre = result.data.genres[0];
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

<style>

hr {
  margin-top: 25px;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.review-header {
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
}

.flex-left {
  width: 48%;
  font-weight: bold;
}

.flex-right {
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
}

.image {
  padding: 10px;
  box-sizing: border-box;
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

@media (min-width: 700px) {
    .image {
        flex: 0 0 27.0%;
    }
    .text {
        flex: 0 0 63.0%;
    }
}

h1 {
  font-size: 2em;
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

</style>
