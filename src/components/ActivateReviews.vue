<template>
  <div class="container">
    <modal name="edit-review-audio-modal"
      :height="700"
      @before-open="loadDataAudioModal">
        <edit-review-audio
          @close="closeAudioModal"
          :review="modalReview">
        </edit-review-audio>
    </modal>
    <div v-for="review in reviews" class="reviews">
      <div class="flex-container">
        <div class="image">
          <img class="front-img"
            v-if="review.books[0].localImage"
            :src="`${imagesUrl}${review.books[0].imageUrl}`">
          <img class="front-img"
            v-if="!review.books[0].localImage"
            :src="review.books[0].imageUrl">
        </div>
        <div>
          <div class="text-container">
            <h1>{{ review.books[0].title }}</h1> 
            <div class="review-header flex-container">
              <!-- To-do: link to page for reviewer -->
              <div class="review-title">
                <span>Publicerad den {{ formattedDate(review.createdAt) }} &nbsp;</span>
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
            <div class="description-body">
              <h2>Beskrivning:</h2>
              <textarea class="disabled-textarea"
                v-model="review.description">{{review.description}}</textarea>
             <audio-player class="audio-player small" 
                :sources="formattedAudioUrl(review.descriptionAudioUrl)">
              </audio-player>
            </div>
          </div>
          <div class="text-container">
            <div class="review-body">
              <h2>Recension:</h2>
              <textarea class="disabled-textarea"
                v-model="review.review">{{review.review}}</textarea>
              <audio-player class="audio-player small" 
                :sources="formattedAudioUrl(review.reviewAudioUrl)">
              </audio-player>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="button-2 edit"
          @click="editAudioModal(review)"
          v-html="unicodeIcons.edit">
        </div>
        <div class="button-2 accept"
          v-if="!review.active"
          @click="toggleAccepted(review)"
          v-html="unicodeIcons.empty">
        </div>
        <div class="button-2 removeAccept"
          v-if="review.active"
          @click="toggleAccepted(review)"
          v-html="unicodeIcons.accepted">
        </div>
      </div>
      <hr>
    </div>
    <div class="buttons"
      v-if="reviews.length > 0">
      <a class="addAll-button"
        v-if="!selectedForActivation.length == reviews.length"
        @click="addAllReviewsForActivation">Markera alla ({{reviews.length}})
      </a>
      <a class="addAll-button"
        v-if="selectedForActivation.length == reviews.length"
        @click="removeAllReviewsForActivation">Avmarkera alla ({{reviews.length}})
      </a>
      <a class="publish-button"
        @click="activateReviews">Spara ({{selectedForActivation.length}})
      </a>
    </div>
    <div class="no-reviews"
      v-if="reviews.length == 0">
      <h1>
        Inga recensioner väntar på att bli aktiverade
      </h1>    
    </div>
  </div>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Vue from 'vue';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import StarRating from 'vue-star-rating';
import AudioPlayer from '@/components/AudioPlayer';
import EditReviewAudio from '@/components/EditReviewAudio';
import moment from 'moment';
import _ from 'lodash';
import VModal from 'vue-js-modal';
import 'moment/locale/sv';

Vue.use(VModal);

export default {
  components: {
    AudioPlayer,
    StarRating,
    EditReviewAudio,
  },
  data() {
    return {
      reviews: [],
      modalReview: '',
      modalText: '',
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
      selectedForActivation: [],
      unicodeIcons: {
        accepted: '&#10004;',
        empty: '&nbsp;',
        edit: '&#x2702',
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.getReviews();
    });
  },
  methods: {
    removeAllReviewsForActivation() {
      this.selectedForActivation = [];
      this.reviews.forEach((review) => {
        review.active = false;
      });
    },
    addAllReviewsForActivation() {
      this.selectedForActivation = this.reviews;
      this.reviews.forEach((review) => {
        review.active = true;
      });
    },
    closeAudioModal() {
      this.popReview(1);
      this.$modal.hide('edit-review-audio-modal');
    },
    popReview(poppedId) {
      const newList = _.remove(this.reviews, (review =>
        review.id !== poppedId
      ));
      this.reviews = newList;
    },
    editAudioModal(review) {
      this.$modal.show('edit-review-audio-modal', { review });
    },
    loadDataAudioModal(event) {
      this.modalReview = event.params.review;
    },
    toggleActivationArray(review) {
      const arrayIndex = _.findIndex(this.selectedForActivation, { id: review.id });
      if (arrayIndex === -1) {
        this.selectedForActivation.push(review);
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
      this.toggleActivationArray(selectedElement);
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
      Reviews.bulkActivate({ reviews: this.selectedForActivation }).then(() => {
        this.selectedForActivation = '';
        this.getReviews();
      });
    },
  },
};
</script>

<style scoped>

hr {
  margin: 25px 0;
}
.button-2 {
  display: inline-block;
  font-weight: bold;
  font-size: 2em;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 100%;
  background-color: #addb91;
  text-align: center;
  cursor: pointer;
}

.modal-button-2 {
  margin: 0 10px;
  margin-bottom: 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}

.close {
  background-color: #ff585d;
}

.add {
  background-color: #71c5e8;
}

.menu {
  display: inline-block;
}

.modal-menu {
  margin-left: 25%;
}

.publish-button {
  display: inline-block;
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

.addAll-button {
  display: inline-block;
  width: 220px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb;
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
  margin-right: 20px;
}

img {
  width: 200px;
}

.text-container {
  display:block;
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

.reviews {
  margin: 20px 40px;
}

h1 {
  font-size: 2em;
  font-weight:bold;
}

h2 {
  font-weight: bold;
}

.disabled-textarea {
  width: 500px;
  height: 150px;
  resize: none;
  outline: none;
  font-size: 1em;
  border-color: #c2c7c9;
}

@media (max-width: 864px) {
  .flex-container {
    justify-content:center;
  }
}


</style>
