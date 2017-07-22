<template>
  <div class="container">
    <div class="wrapper">
      <div class="book-description">
        <h1>Beskrivning</h1>
        <textarea v-model="review.description" placeholder="Skriv vad boken handlar om här."></textarea>

      </div>
      <div class="book-review">
        <h1>Recension</h1>
        <textarea v-model="review.review" placeholder="Skriv din bokrecension här."></textarea>
        <star-rating v-bind:increment="1"
             v-bind:max-rating="5"
             inactive-color="#c2c7c9"
             active-color="#c98bdb"
             v-bind:star-size="30"
            v-model="review.rating">
        </star-rating>
      </div>

      <div class="publish">
        <div class="publish-button" @click="postReview">Skicka</div>
      </div>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import Reviews from '@/api/services/reviews';
import StarRating from 'vue-star-rating';
// import Urls from '@/assets/urls';

export default {
  name: 'publish-review',
  components: {
    'star-rating': StarRating,
  },
  props: ['book'],
  data() {
    return {
      currentBook: {},
      review: {
        description: '',
        review: '',
        rating: null,
        reviewerId: null,
        bookId: null,
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
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
      Reviews.create(this.review)
        .then((result) => {
          console.log(result);
        });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2em;
  font-weight: bold;
}

textarea {
  width: 500px;
  height: 200px;
  outline: none;
}

.publish-button {
  width: 4em;
  height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #71c5e8;
  border-radius: 15px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
</style>
