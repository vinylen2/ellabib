<template>
  <div class="container">
    <div class="menu">
      <button class="publish-button red" @click="resetQr">Rensa</button>
      <button class="publish-button" @click="print">Skriv ut</button>
    </div>
    <div class="qr-container">
      <div class="code"
        v-for="book in books"
        @click="toggleQr(book)">
        <p>{{short(book.title)}}</p>
        <qriously :value="`https://ellabib.se/book/${book.slug}`"
          :size="100"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueQriously from 'vue-qriously';

Vue.use(VueQriously);

export default {
  name: 'qr-codes',
  created() {
  },
  computed: {
    books() {
      return this.$store.state.qrArray;
    },
  },
  methods: {
    short(title) {
      return title.slice(0, 10);
    },
    resetQr() {
      this.$store.commit('resetQr');
    },
    print() {
      window.print();
    },
    toggleQr(book) {
      this.$store.commit('toggleQr', book);
    },
  },
};
</script>

<style scoped>
@media print {
  .publish-button {
    display: none;
  }
  .container {
    margin: 0;
  }

  .code {
    height: 200px;
  }
}

.menu {
  width: 100%;
}

div {
  display: inline-block;
}

button:focus {
  outline: none;
}

p {
  margin-bottom: 5px;
}

.publish-button {
  border:none;
  padding: 0;
  width: 4em;
  height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 2em;
  margin: 10px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  background-color: #c98bdb;
}

.red {
  background-color: #ff585d;
}

.flex-container {
  margin-top: 10px;
  justify-content: center;
}

.code {
  float:left;
  display:inline;
  padding: 10px;
  box-sizing: border-box;
  flex: 0 0 10%;
  margin: 0 1% 10px;
  cursor: pointer;
}

.code:hover {
  background-color:#ff585d;
}

</style>
