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
          <textarea v-model="review.description"
            placeholder="Skriv vad boken handlar om här.">
          </textarea>
        </div>
        <vue-record class="audio-recorder"
          :source="'description'"
          @updateBlob="updateAudio"
          :blob="audio.description">
        </vue-record>
      </div>
      <div class="book-review">
        <h1>Recension</h1>
        <textarea v-model="review.review" placeholder="Skriv din bokrecension här."></textarea>
        <vue-record class="audio-recorder"
          :source="'review'"
          @updateBlob="updateAudio"
          :blob="audio.review">
        </vue-record>
      </div>
      <div class="wrapper">
        <div class="publish">
          <star-rating :increment="1"
              :max-rating="5"
              inactive-color="#c2c7c9"
              active-color="#c98bdb"
              :star-size="30"
              v-model="review.rating">
          </star-rating>
          <div class="publish-button" @click="postReview">Skicka</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* es-lint disable*/
import Books from '@/api/services/books';
import Auth from '@/api/services/auth';
import Reviews from '@/api/services/reviews';
import StarRating from 'vue-star-rating';
import VueRecord from '@/components/VueRecord';

export default {
  name: 'publish-review',
  components: {
    'vue-record': VueRecord,
    'star-rating': StarRating,
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
      published: false,
    };
  },
  created() {
    this.getData();
    this.ipAuth();
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
      console.log(blob);
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
      Reviews.create(this.reviewFormData)
        .then(() => {
          this.published = true;
        });
    },
    ipAuth() {
      Auth.ipAuth()
        .then((result) => {
          console.log(result);
          console.log(document.cookie);
        });
    },
  },
};
</script>

<style>
h1 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 10px;
}

textarea {
  width: 500px;
  height: 200px;
  outline: none;
  font-size: 1em;
}

.publish-button {
  width: 4em;
  height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 2em;
  margin-top: 10px;
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

.flex-box {
  width: 100%;
}

.wrapper {
  margin: 0 20px;
  align-items: center;
}

.publish {
  align-items: center;
  display: inline-block;
}


</style>
