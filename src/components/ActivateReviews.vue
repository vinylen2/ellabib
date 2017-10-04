<template>
  <div class="container">
    <div v-for="review in reviews" class="reviews">
      <div class="image">
        <img class="front-img"
          v-if="review.books[0].localImage"
          :src="`${imagesUrl}${review.books[0].imageUrl}`">
        <img class="front-img"
          v-if="!review.books[0].localImage"
          :src="review.books[0].imageUrl">
      </div>
      <div class="flex-container">
        <div class="text-container">
          <h1>{{ review.books[0].title }}</h1> 
          <div class="description-body">
            <p> {{review.description}} </p>
            <audio-player class="audio-player" :sources="formattedAudioUrl(review.descriptionAudioUrl)">
            </audio-player>
          </div>
        </div>
        <div class="text-container">
          <div class="review-header flex-container">
            <!-- To-do: link to page for reviewer -->
            <div class="review-title">
              <span>Av: recencent den {{ formattedDate(review.createdAt) }}</span>
            </div>
            <star-rating class="review-rating"
              v-bind:read-only="true"
              v-bind:max-rating="5"
              inactive-color="#c2c7c9"
              active-color="#c98bdb"
              v-bind:star-size="20"
              v-model="review.rating">
            </star-rating>
          </div>
          <div class="review-body">
            <p>{{ review.review }}</p>
            <audio-player class="audio-player" :sources="formattedAudioUrl(review.reviewAudioUrl)">
            </audio-player>
          </div>
        </div>
        <div class="button accept"
          v-if="!review.active"
          @click="toggleAccepted(review)">
        </div>
        <div class="button removeAccept"
          v-if="review.active"
          @click="toggleAccepted(review)"
          v-html="unicodeIcons.accepted">
        </div>

      </div>
    </div>
    <div class="publish-button"
      @click="activateReviews">Aktivera ({{selectedForActivation.length}})
    </div>
  </div>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import StarRating from 'vue-star-rating';
import AudioPlayer from '@/components/AudioPlayer';
import moment from 'moment';
import 'moment/locale/sv';

export default {
  components: {
    AudioPlayer,
    StarRating,
  },
  data() {
    return {
      reviews: [],
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
      selectedForActivation: [],
      unicodeIcons: {
        accepted: '&#10004;',
        deny: 'N',
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.getReviews();
    });
  },
  methods: {
    toggleActivationArray(reviewId) {
      const arrayIndex = this.selectedForActivation.indexOf(reviewId);
      if (arrayIndex === -1) {
        this.selectedForActivation.push(reviewId);
      } else {
        this.selectedForActivation.splice(arrayIndex, 1);
      }
    },
    toggleAccepted(selectedElement) {
      this.reviews.forEach((review) => {
        if (review.id === selectedElement.id) {
          review.active = !review.active;
        }
      });
      this.toggleActivationArray(selectedElement.id);
    },
    formattedDate(date) {
      return moment(date).format('Do MMMM');
    },
    formattedAudioUrl(endingOfUrl) {
      return [this.audioUrl + endingOfUrl];
    },
    getReviews() {
      Reviews.getInactive().then((result) => {
        this.reviews = result.data;
      });
    },
    activateReviews() {
      Reviews.bulkActivate(this.selectedForActivation).then((result) => {
        console.log(result.data);
        this.getReviews();
      });
    },
  },
};
</script>

<style scoped>
.button {
  margin: 10px;
  font-weight: bold;
  font-size: 3em;
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 100%;
  background-color: #addb91;
  text-align: center;
  cursor: pointer;
}

.publish-button {
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #71c5e8;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
}

.removeAccept {
  background-color: #addb91;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.image {
  width: 20%;
  float: left;
}

img {
  width: 100%;
}

.text-container {
  text-align: left;
  margin: 0 20px;
}
.review-header{
  height: 20px;
  line-height: 20px;
  margin: 10px 0;
}

.audio-player {
  margin: 10px 0;
}
</style>
