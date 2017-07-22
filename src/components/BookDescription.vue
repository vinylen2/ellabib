<template>
  <div class="container">
    <div class="wrapper">
      <div class="description flex-container">

        <div class="image">
          <img :src="`${imagesUrl}${currentBook.imageUrl}`" />
        </div>
        <div class="text">
          <header class="book-header">
            <h1>{{ currentBook.title }}</h1>
            <!-- To-do: link to page with books from author -->
            <p>av: {{ author.name }} </p>
          </header>
          <div class="description-body">
            <p>{{ randomDescription.description }}</p>
            <audio-player class="description-audio player" :sources="formattedAudioUrl(randomDescription.descriptionAudioUrl)">
            </audio-player>
            <router-link class="review-a":to="{ name: 'publish-review', params: { book: currentBook }}">
              <div class="review-button">&#9733;</div>
            </router-link>
            <div class="book-information">
              <dl>
                <dt>Genre</dt>
                <dd>{{ genre.name }}</dd>
                <dt>Sidor</dt>
                <dd>{{ currentBook.pages }}</dd>
                <dt>Betyg</dt>
                <dd>
                  <star-rating v-bind:read-only="true"
                     v-bind:max-rating="5"
                     inactive-color="#c2c7c9"
                     active-color="#c98bdb"
                     v-bind:star-size="20"
                     v-model="currentBook.rating">
                  </star-rating>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="reviews">
        <h2>Recensioner</h2>
        <div v-for="review in reviews" class="review">
          <header class="review-header">
            <!-- To-do: link to page for reviewer -->
            <span>Av: recencent </span>
            <span>den {{ formattedDate(review.createdAt) }}</span>
              <star-rating v-bind:read-only="true"
                   v-bind:max-rating="5"
                   inactive-color="#c2c7c9"
                   active-color="#c98bdb"
                   v-bind:star-size="20"
                   v-model="review.rating">
              </star-rating>
          </header>
          <div class="review-body">
            <p>{{ review.review }}</p>
            <audio-player class="review-audio player" :sources="formattedAudioUrl(review.reviewAudioUrl)">
            </audio-player>
          </div>

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
  name: 'book-description',
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
    this.getBookFromSlug();
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
    getBook(id) {
      Books.get(id)
        .then((result) => {
          this.currentBook = result.data;
        });
    },
    getBookFromSlug() {
      Books.getFromSlug(this.$route.params.slug)
        .then((result) => {
          const reviews = result.data.reviews;
          const randomInt = this.randomizeNumber(reviews.length - 1);
          this.currentBook = result.data;
          this.author.name = `${result.data.authors[0].firstname} ${result.data.authors[0].lastname}`;
          this.author.id = result.data.authors[0].id;
          this.genre = result.data.genres[0];
          this.reviews = reviews;
          this.randomDescription = reviews[randomInt];
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

dt {
  font-weight: bold;
}

</style>
