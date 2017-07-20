<template>
  <div class="container">
    <div class="wrapper">
      <h1>{{ currentBook.title }}</h1>
      <h1>{{ reviews }}</h1>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import Reviews from '@/api/services/reviews';

export default {
  name: 'book-description',
  data() {
    return {
      reviews: [],
      currentBook: {},
    };
  },
  props: {
    book: {
      type: Object,
      default() { return {}; },
    },
  },
  created() {
    if (Object.keys(this.currentBook).length === 0) {
      this.getBookFromSlug(this.$route.params.slug)
        .then(() => {
          this.getReviews(this.book.id);
        });
    }
  },
  methods: {
    getBook(id) {
      Books.get(id)
        .then((result) => {
          this.currentBook = result.data;
        });
    },
    getBookFromSlug(slug) {
      return new Promise((res) => {
        Books.getFromSlug(slug)
          .then((result) => {
            this.currentBook = result.data;
            res();
          });
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

</style>
