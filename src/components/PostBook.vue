<template>
  <div class="postbook-container">
    <div class="menu">
      <div class="scan button"
        @click="toggleMode('scan')">
      </div>
      <div class="manual button"
        @click="toggleMode('manual')">
      </div>

     </div>
     <div class="scan button"
      @click="barcodeScanner">Tryck här för att scanna.
    </div>
  </div>
</template>


<script>
import Books from '@/api/services/books';
// import Urls from '@/assets/urls';

export default {
  name: 'post-book',
  data() {
    return {
      manual: false,
    };
  },
  methods: {
    barcodeScanner() {
      window.cordova.plugins.barcodeScanner.scan((result) => {
        // add view for genre here
        this.postBook({
          isbn: result.text,
          scanned: true,
        }).then(() => {
        });
      }, (error) => {
        alert(`Scanning failed: ${error}`);
      });
    },
    postBook(data) {
      Books.create(data)
        .then((result) => {
          console.log(result.data);
        });
    },
  },
};
</script>

<style scoped>

</style>
