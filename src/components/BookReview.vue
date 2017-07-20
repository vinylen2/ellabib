<template>
  <h1>{{ book.title }}</h1>
</template>

<script>
import Reviews from '@/api/services/reviews';

export default {
  name: 'book-review',
  data() {
    return {
      reviews: {},
    };
  },
  created() {
    this.getReviews();
  },
  methods: {
    getReviews(id) {
      Reviews.get(id)
        .then((result) => {
          this.reviews = result.data;
        });
    },
  },
};
</script>

<style scoped>

</style>
