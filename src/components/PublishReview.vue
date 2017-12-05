<template>
  <div class="container">
    <div class="wrapper" v-if="published">
      <div class="book-description">
        <h1>Jippi! Din recension har nu skickats in!</h1>
      </div>
    </div>
    <div class="wrapper" v-if="!published">
      <div class="book-description">
        <div>
          <h1>Beskrivning</h1>
          <textarea class="publish-textarea review"
            v-model="review.description"
            placeholder="Skriv vad boken handlar om här.">
          </textarea>
        </div>
        <vue-record class="audio-recorder"
          v-if="$store.getters.isDeviceWithMic"
          :source="'description'"
          @updateBlob="updateAudio"
          :blob="audio.description">
        </vue-record>
      </div>
      <div class="book-review">
        <h1>Recension</h1>
        <textarea class="publish-textarea description"
          v-model="review.review"
          placeholder="Skriv din bokrecension här.">
        </textarea>
        <vue-record class="audio-recorder"
          v-if="$store.getters.isDeviceWithMic"
          :source="'review'"
          @updateBlob="updateAudio"
          :blob="audio.review">
        </vue-record>
      </div>
      <div class="publish flex-container column">
        <star-rating :increment="1"
            :max-rating="5"
            inactive-color="#c2c7c9"
            active-color="#c98bdb"
            :star-size="30"
            v-model="review.rating"
            :show-rating="false">
        </star-rating>
        <button class="publish-button"
          v-if="!publishing"
          @click="postReview">Skicka
        </button>
        <div class="loading"
          v-if="publishing">
          <h2>Publicerar...</h2>
          <sync-loader :color="'#71c5e8'"></sync-loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* es-lint disable*/
import Books from '@/api/services/books';
import Reviews from '@/api/services/reviews';
import StarRating from 'vue-star-rating';
import VueRecord from '@/components/VueRecord';
import SyncLoader from 'vue-spinner/src/SyncLoader';

export default {
  name: 'publish-review',
  components: {
    'vue-record': VueRecord,
    'star-rating': StarRating,
    SyncLoader,
  },
  props: ['book'],
  data() {
    return {
      currentBook: {},
      review: {
        description: '',
        review: '',
        rating: 0,
        reviewerId: null,
        bookId: null,
      },
      audio: {
        description: '',
        review: '',
      },
      publishing: false,
      published: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    reviewFormData() {
      const reviewFormData = new FormData();
      Object.keys(this.review).forEach((key) => {
        reviewFormData.append(key, this.review[key]);
      });

      reviewFormData.append('descriptionRecording', this.audio.description, this.$route.params.slug);
      reviewFormData.append('reviewRecording', this.audio.review, this.$route.params.slug);
      return reviewFormData;
    },
  },
  methods: {
    updateAudio(blob, source) {
      this.audio[source] = blob;
    },
    getData() {
      if (!this.book) {
        this.getBookFromSlug();
      } else {
        this.currentBook = this.book;
        this.review.bookId = this.book.id;
      }
    },
    getBookFromSlug() {
      Books.getFromSlug(this.$route.params.slug)
        .then((result) => {
          this.currentBook = result.data;
          this.review.bookId = result.data.id;
        });
    },
    postReview() {
      this.publishing = true;
      Reviews.create(this.reviewFormData)
        .then(() => {
          this.published = true;
          this.publishing = false;
        });
    },
  },
};
</script>

<style scoped>

.container {
  margin-top: 20px;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 15px 0;
}
h1 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 10px;
}

textarea {
  width: 80%;
  height: 200px;
  resize: none;
  outline: none;
  font-size: 1em;
  border-color: #c2c7c9;
}

.publish-button {
  border:none;
  padding: 0;
  width: 4em;
  height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 2em;
  margin: 10px 0;
  background-color: #71c5e8;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
  align-items:center;
}

.column {
  flex-direction: column;
}

.flex-box {
  width: 100%;
}

.wrapper {
  margin: 0 20px;
  align-items: center;
}

.publish-textarea {
  align-items: center;
  display: inline-block;
}

.description {
  background-color: #edd8f3;
}

.review {
  background-color: #daf1f0;
}

.button {
  border: none;
  margin-right: 20px;
}

</style>
