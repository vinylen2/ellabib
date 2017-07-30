<template>
  <header class="header">
    <div class="container">
      <router-link to="/">Hem</router-link>
      <router-link to="/books">Böcker</router-link>
      <router-link to ="/scanner"
        v-show="isCordovaApp">Scanner</router-link>
    </div>
  </header>
</template>

<script>
import Store from '@/stores/store';

export default {
  name: 'navbar',
  computed: {
    isCordovaApp() {
      return Store.cordova.isApp;
    },
  },
};
</script>

<style scoped>

.container {
  width: 100%;
  background-color: #addb91;
  display: block;
  height: 70px;
  margin-bottom: 20px;
}

a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding-left: 50px;
  text-decoration: none;
  font-size: 17px;
  line-height:70px;
}

a:hover {
  color: black;
  font-weight: bold;
}

</style>
