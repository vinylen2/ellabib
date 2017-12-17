<template>
  <div class="container">
    <modal name="edit-review-audio-modal"
      :height="700"
      @before-open="loadDataAudioModal">
        <edit-review-audio
          @close="closeAudioModal"
          :review="modal.review">
        </edit-review-audio>
    </modal>
    <modal name="edit-text"
      :height="380"
      @before-open="loadDataTextModal">
      <edit-review-text
        @closeTextModal="closeTextModal"
        :text="modal.text"
        :type="modal.type"
        :reviewId="modal.reviewId">
      </edit-review-text>
    </modal>
    <modal name="alert"
      @before-open="loadDataAlertModal"
      :height="200">
      <alert-window
        :action="modal.action"
        :value="modal.value"
        @closed="closeAlertModal">
      </alert-window>
    </modal>
    <vuetable ref="vuetable"
      :api-mode="false"
      :fields="fields"
      :data="reviews">
      <template slot="title"
        scope="props">
        <router-link class="link" :to="{ name: 'bok', params: { slug: props.rowData.slug }}">{{props.rowData.title}}</router-link>
      </template>
      <template slot="rating"
        scope="props">
        <star-rating v-bind:read-only="false"
            v-bind:max-rating="5"
            inactive-color="#c2c7c9"
            active-color="#c98bdb"
            v-bind:star-size="20"
            :increment="1"
            :show-rating="false"
            @rating-selected="setRating($event, props.rowData.id)"
            v-model="props.rowData.rating">
        </star-rating>
      </template>
      <template slot="edit-description"
        scope="props">
        <div class="text"
          v-if="props.rowData.description"
          @click="showEditTextModal('description', props.rowData.id, props.rowData.description)"
          v-tooltip.bottom="{ content: props.rowData.description, classes: 'text-tooltip' }">
          {{`${props.rowData.description.slice(0, 30)}...`}}
        </div>
        <div class="no-text text"
          @click="showEditTextModal('description', props.rowData.id, props.rowData.description)"
          v-else>
          Ingen beskrivning.
        </div>
      </template>
      <template slot="edit-review"
        scope="props">
        <div class="text"
          v-if="props.rowData.review"
          @click="showEditTextModal('review', props.rowData.id, props.rowData.review)"
          v-tooltip.bottom="{ content: props.rowData.review, classes: 'text-tooltip' }">
          {{`${props.rowData.review.slice(0, 30)}...`}}
        </div>
        <div class="no-text text"
          @click="showEditTextModal('review', props.rowData.id, props.rowData.review)"
          v-else>
          Ingen recension.
        </div>
      </template>
      <template slot="description-audio"
        scope="props">
        <admin-audio-player
          v-if="props.rowData.descriptionAudioUrl"
          :type="'description'"
          :rowData="props.rowData">
        </admin-audio-player>
        <div class="no-audio"
          v-else><icon name="microphone-slash" scale="1"></icon>
        </div>
      </template>
      <template slot="review-audio"
        scope="props">
        <admin-audio-player
          v-if="props.rowData.reviewAudioUrl"
          :type="'review'"
          :rowData="props.rowData">
        </admin-audio-player>
        <div class="no-audio"
          v-else><icon name="microphone-slash" scale="1"></icon>
        </div>
      </template>
      <template slot="edit-audio"
        scope="props">
        <div class="button-2 edit"
          v-if="props.rowData.reviewAudioUrl || props.rowData.descriptionAudioUrl"
          @click="editAudioModal(props.rowData)"><icon name="cut" scale="1"></icon>
        </div>
        <div class="button-2 delete"
          @click="showAlertModal(`Radera recension för ${props.rowData.title}`,(props.rowData.id))"><icon name="trash" scale="1"></icon>
        </div>
      </template>
    </vuetable>
    <div class="buttons"
      v-if="reviews.length > 0">
      <a class="publish-button"
        @click="activateReviews">Publicera ({{this.$refs.vuetable.selectedTo.length}})
      </a>
    </div>
  </div>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Vue from 'vue';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import StarRating from 'vue-star-rating';
import AdminAudioPlayer from '@/components/AdminAudioPlayer';
import EditReviewAudio from '@/components/EditReviewAudio';
import EditReviewText from '@/components/EditReviewText';
import AlertWindow from '@/components/AlertWindow';
import FieldDefs from '@/components/FieldDefs';
import moment from 'moment';
import _ from 'lodash';
import Icon from 'vue-awesome';
import VModal from 'vue-js-modal';
import 'moment/locale/sv';
import Vuetable from 'vuetable-2';
import { VTooltip } from 'v-tooltip';

Vue.use(VModal);
Vue.use(Vuetable);
Vue.directive('tooltip', VTooltip);
Vue.component('v-popover', VTooltip.VPopover);

export default {
  components: {
    'admin-audio-player': AdminAudioPlayer,
    Vuetable,
    StarRating,
    Icon,
    EditReviewAudio,
    EditReviewText,
    AlertWindow,
  },
  data() {
    return {
      fields: FieldDefs,
      reviews: [],
      modal: {
        review: '',
        text: '',
        reviewId: '',
        type: '',
        action: '',
        value: '',
      },
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
      selectedForActivation: [],
    };
  },
  created() {
    this.$nextTick(() => {
      this.getReviews();
    });
  },
  methods: {
    img(data) {
      if (data.localImage) {
        return `<img src="${this.imagesUrl}${data.imageUrl} class="small">`;
      }
      return data.imageUrl;
    },
    setRating(rating, id) {
      this.updateReviewRating(rating, id);
    },
    editAudioModal(review) {
      this.$modal.show('edit-review-audio-modal', { review });
    },
    closeAudioModal() {
      this.$modal.hide('edit-review-audio-modal');
    },
    showEditTextModal(type, reviewId, text) {
      this.$modal.show('edit-text', { type, reviewId, text });
    },
    showAlertModal(action, value) {
      this.$modal.show('alert', { action, value });
    },
    closeAlertModal(data) {
      if (data.status) {
        this.deleteReview(data.value);
      }
      this.$modal.hide('alert');
    },
    closeTextModal(data) {
      if (data) {
        const index = _.findIndex(this.reviews, { id: data.reviewId });
        const arrayData = this.reviews[index];
        if (data.type === 'review') {
          arrayData.review = data.text;
        } else {
          arrayData.description = data.text;
        }
      }
      this.$modal.hide('edit-text');
    },
    loadDataAudioModal(event) {
      this.modal.review = event.params.review;
    },
    loadDataTextModal(event) {
      this.modal.text = event.params.text;
      this.modal.reviewId = event.params.reviewId;
      this.modal.type = event.params.type;
    },
    loadDataAlertModal(event) {
      this.modal.action = event.params.action;
      this.modal.value = event.params.value;
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
    popReview(reviewId) {
      const index = _.findIndex(this.reviews, { id: reviewId });
      this.reviews.splice(index, 1);
    },
    activateReviews() {
      Reviews.bulkActivate(this.$refs.vuetable.selectedTo).then(() => {
        this.getReviews();
      });
    },
    updateReviewRating(rating, id) {
      Reviews.updateRating({ reviewId: id, rating }).then(() => {
      });
    },
    deleteReview(reviewId) {
      Reviews.deleteReview({ reviewId }).then(() => {
        this.popReview(reviewId);
      });
    },
  },
};
</script>

<style>
.text-tooltip .tooltip-inner{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #addb91;
  padding: 10px 15px;
  width: 300px;
  border-radius: 20px;
}

table {
  border-spacing: 10px;
  border-collapse: separate;
}
th {
  font-weight: bold;
}

.th-buttons {
  width: 100px;
}

.th-text {
  width: 250px;
}

.th-date {
  width: 100px;
}

.left {
  text-align: left;
}

</style>
<style scoped>
.link {
  text-decoration: none;
  color: #2c3e50;
}

.link:visited {
  color: #2c3e50;
}

.link:hover {
  color: black;
  text-decoration: none;
}

.no-text {
  font-weight: bold;
  color: #ff585d;
}
.buttons {
  margin-top: 15px;
}

.text:hover {
  cursor: pointer;
  color: black;
}
.vuetable {
  display: inline-block;

}
.container {
  margin-top: 20px;
}

hr {
  margin: 25px 0;
}
.button-2 {
  display: inline-block;
  font-weight: bold;
  font-size: 1em;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 100%;
  background-color: #addb91;
  text-align: center;
  cursor: pointer;
}

.delete {
  background-color: #ff585d;
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
