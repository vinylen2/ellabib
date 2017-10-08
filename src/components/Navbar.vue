<template>
  <header class="header">
    <modal name="login-modal"
      :height="250">
      <login
        @close="closeModal">
      </login>
    </modal>
    <div class="container">
      <router-link to="/">Hem</router-link>
      <router-link to="/books">Böcker</router-link>
      <router-link to ="/scanner"
        v-show="isCordovaApp">Scanner</router-link>
      <router-link to ="/post-book"
        v-show="isAdmin">Lägg till bok</router-link>
      <router-link to ="/activate-reviews"
        v-show="isAdmin">Aktivera</router-link>
      <div class="login"
        v-show="!isAdmin"
        @click="showLoginModal">Logga in
      </div>
      <div class="login"
        v-show="isAdmin"
        @click="logout">Logga ut
      </div>
    </div>
  </header>
</template>

<script>
import Vue from 'vue';
import Login from '@/components/Login';
import VModal from 'vue-js-modal';

Vue.use(VModal);

export default {
  name: 'navbar',
  components: {
    Login,
  },
  computed: {
    isCordovaApp() {
      return this.$store.state.cordova.isApp;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  methods: {
    showLoginModal() {
      this.$modal.show('login-modal');
    },
    closeModal() {
      this.$modal.hide('login-modal');
    },
    logout() {
      this.$store.commit('changeAdminState');
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
  font-size: 1.5em;
  text-decoration: none;
  line-height:70px;
}

.login {
  cursor: pointer;
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding-left: 50px;
  font-size: 1.5em;
  text-decoration: none;
  line-height:70px;
}

.login:hover {
  color: black;
  font-weight: bold;
}

a:hover {
  color: black;
  font-weight: bold;
}


</style>
