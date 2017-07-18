<template>
  <h1>{{ book.title }}</h1>
</template>

<script>
import Books from '@/api/services/books';

export default {
  name: 'frontpage',
  data() {
    return {
      book: {},
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      Books.get(4)
        .then((result) => {
          this.book = result.data;
        });
    },
  },
};
</script>

<style scoped>

</style>
