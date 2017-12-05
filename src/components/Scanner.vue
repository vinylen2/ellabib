<template>
  <div class="container">
    <div class="scan-area"
      ref="scanner">
    </div>
    <qrcode-reader @decode="onDecode">

    </qrcode-reader>
    <!-- <div class="scan button"
      v-if="isDeviceWithWebRTC"
      @click="quaggaScanner">Scanna
    </div> -->
    <!-- <div class="scan button"
      v-if="isCordovaApp"
      @click="barcodeScanner">Scanna
    </div> -->
    <div class="browser"
      v-if="!isDeviceWithWebRTC">För att kunna scanna efter böcker måste du ha appen.
    </div>
    <div class="error"
      v-if="!scanned">
      <h2>Tyvärr! Boken är inte inlagd i Ellabib.</h2>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import Quagga from 'quagga';
import VueQrcodeReader from 'vue-qrcode-reader';


export default {
  name: 'scanner',
  components: {
    'qrcode-reader': VueQrcodeReader,
  },
  computed: {
    isDeviceWithWebRTC() {
      return this.$store.getters.isDeviceWithWebRTC;
    },
  },
  data() {
    return {
      media: false,
      scanned: true,
    };
  },
  methods: {
    quaggaScanner() {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          numOfWorkers: navigator.hardwareConcurrency,
          target: this.$refs.scanner,
          readers: [
            'qr_code_reader',
          ],
        },
      }, (err) => {
        if (err) {
          // variable for error msg on screen here
          // console.log(err);
        }
        Quagga.start();
        Quagga.onDetected((result) => {
          this.getBookFromIsbn(result.codeResult.code)
            .then((slug) => {
              this.$router.push(`/book/${slug}`);
            })
            .catch(() => {
              this.scanned = false;
            });
          Quagga.stop();
        });
      });
    },
    onDecode(content) {
      this.getBookFromIsbn(content)
        .then((slug) => {
          this.$router.push(`/book/${slug}`);
        })
        .catch(() => {
          this.scanned = false;
        });
    },
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
      }, () => {
        // alert(`Scanning failed: ${error}`);
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
