<template>
  <div class="container">
    <div class="scan button"
      v-if="isCordovaApp"
      @click="barcodeScanner">Tryck här för att scanna.
    </div>
    <div class="browser"
      v-else>För att kunna scanna efter böcker måste du ha appen.
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import Store from '@/stores/store';

export default {
  name: 'scanner',
  computed: {
    isCordovaApp() {
      return Store.cordova.isApp;
    },
  },
  methods: {
    barcodeScanner() {
      window.cordova.plugins.barcodeScanner.scan((result) => {
        this.getBookFromIsbn(result.text)
          .then((slug) => {
            this.$router.push(`/book/${slug}`);
          })
          .catch(() => {
            console.log('nothing returned from API');
          });
      }, (error) => {
        alert(`Scanning failed: ${error}`);
      });
    },
    getBookFromIsbn(isbn) {
      return new Promise((res, rej) => {
        Books.getFromIsbn(isbn)
          .then((result) => {
            res(result.data.slug);
          })
          .catch((error) => {
            rej(error);
          });
      });
    },
  },
  data() {
    return {

    };
  },
};

</script>

<style scoped>

</style>
