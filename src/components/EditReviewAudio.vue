<template>
<div class="container">
  <!-- <h1>{{ reviewLocal.books[0].title }}</h1>  -->
  <div class="review-header flex-container">
    <!-- To-do: link to page for reviewer -->
    <!-- <div class="review-title">
      <span>Av: recencent den {{ formattedDate(reviewLocal.createdAt) }} &nbsp;</span>
    </div> -->
  </div>
  <h2>Beskrivning</h2>
  <audio-editor class="editor"
    @cut="updateData"
    :dataUrl="formattedAudioUrl(local.audio.description, local.source.description)"
    :source="local.source.description"
    :isEditing="true">
  </audio-editor>
  <h2>Recension</h2>
  <audio-editor class="editor"
    @cut="updateData"
    :dataUrl="formattedAudioUrl(local.audio.review, local.source.review)"
    :source="local.source.review"
    :isEditing="true">
  </audio-editor>
  <div class="button float save-activate"
    @click="saveAndClose">Spara
  </div>
  <div class="button float close"
    @click="closeModal">Stäng
  </div>
</div>
</template>


<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import StarRating from 'vue-star-rating';
import Reviews from '@/api/services/reviews';
import AudioEditor from '@/components/AudioEditor';
import Urls from '@/assets/urls';
import moment from 'moment';

export default {
  name: 'edit-review-audio',
  components: {
    StarRating,
    'audio-editor': AudioEditor,
  },
  data() {
    return {
      reviewLocal: this.review,
      audioUrl: Urls.audio,
      local: {
        audio: {
          description: this.review.descriptionAudioUrl,
          review: this.review.reviewAudioUrl,
        },
        blobs: {
          description: '',
          review: '',
        },
        source: {
          description: 'description',
          review: 'review',
        },
        isCut: {
          description: false,
          review: false,
        },
      },
    };
  },
  props: {
    review: '',
  },
  computed: {
    reviewFormData() {
      const formdata = new FormData();
      formdata.append('reviewId', this.reviewLocal.id);
      formdata.append('descriptionRecording', this.local.blobs.description, this.reviewLocal.books[0].slug);
      formdata.append('reviewRecording', this.local.blobs.review, this.reviewLocal.books[0].slug);
      return formdata;
    },
  },
  methods: {
    formattedAudioUrl(url, source) {
      if (this.local.isCut[source]) {
        return this.local.audio[source];
      }
      return `${this.audioUrl}${url}`;
    },
    updateData(blob, source) {
      this.local.isCut[source] = true;
      const dataUrl = URL.createObjectURL(blob);
      this.local.audio[source] = dataUrl;
      this.local.blobs[source] = blob;
    },
    closeModal() {
      this.$emit('close');
    },
    formattedDate(date) {
      return moment(date).format('Do MMMM');
    },
    saveAndClose() {
      this.editReview();
    },
    editReview() {
      Reviews.editReviewAudio(this.reviewFormData)
        .then(() => {
          this.closeModal();
        });
        // }).catch(e => console.log(e));
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.review-header{
  height: 20px;
  line-height: 20px;
  margin: 10px 0;
  margin-left: 25%;
}

.button {
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

.save-activate {
  background-color: #71c5e8;

}
h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 10px 0;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
}

textarea {
  width: 500px;
  height: 200px;
  outline: none;
  resize: none;
  font-size: 1em;
  margin-bottom: 20px;
}
</style>
