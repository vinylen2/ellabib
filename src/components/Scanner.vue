<template>
  <div class="container">
    <div class="scan button"
      v-if="isCordovaApp"
      @click="barcodeScanner">Scanna
    </div>
    <div class="browser"
      v-else>För att kunna scanna efter böcker måste du ha appen.
    </div>
    <div class="error"
      v-if="!scanned">
      <h2>Tyvärr! Boken är inte inlagd i Ellabib.</h2>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';

export default {
  name: 'scanner',
  computed: {
    isCordovaApp() {
      return this.$store.state.cordova.isApp;
    },
  },
  data() {
    return {
      scanned: true,
    };
  },
  methods: {
    barcodeScanner() {
      this.scanned = true;
      window.cordova.plugins.barcodeScanner.scan((result) => {
        this.getBookFromIsbn(result.text)
          .then((slug) => {
            this.$router.push(`/book/${slug}`);
          })
          .catch(() => {
            this.scanned = false;
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
};

</script>

<style scoped>
.button {
  margin: 0 10px;
  margin-bottom: 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb ;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}

</style>
