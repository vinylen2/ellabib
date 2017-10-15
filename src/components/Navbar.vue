<template>
  <header class="header">
    <div class="container">
      <router-link to="/books">
        <img src="https://ellabib.se/images/ellabib.png">
      </router-link>
      <!-- <router-link to="/">Hem</router-link> -->
      <router-link to="/books">Böcker</router-link>
      <router-link to ="/scanner"
        v-show="isDeviceWithWebRTC">Scanner</router-link>
      <router-link to="/about">Om</router-link>
      <div class="admin">
        <router-link to ="/post-book"
          v-show="isAdmin">Lägg till bok</router-link>
        <router-link to ="/activate-reviews"
          v-show="isAdmin">Aktivera</router-link>
        <div class="login"
          v-show="isAdmin"
          @click="logout">Logga ut
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Auth from '@/api/services/auth';

export default {
  name: 'navbar',
  created() {
    this.ipAuth();
    this.$store.commit('isAndroid');
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    isDeviceWithWebRTC() {
      return this.$store.getters.isDeviceWithWebRTC;
    },
  },
  methods: {
    logout() {
      this.$store.commit('changeAdminState');
      this.$router.push({ name: '/' });
    },
    ipAuth() {
      Auth.ip()
        .then((result) => {
          if (result.ipAuth) {
            this.$store.commit('isAllowedIp');
          }
        });
    },
  },
};
</script>

<style scoped>

.container {
  width: 100%;
  background-color: #addb91;
  display: block;
  height: 80px;
  margin-bottom: 20px;
}

img {
  height: 50px;
  vertical-align: middle;
}

a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding-left: 20px;
  font-size: 1.5em;
  text-decoration: none;
  line-height:80px;
}

.login {
  cursor: pointer;
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding-left: 20px;
  font-size: 1.5em;
  text-decoration: none;
  line-height:80px;
}

.login:hover {
  color: black;
  font-weight: bold;
}

a:hover {
  color: black;
  font-weight: bold;
}

@media screen and (max-width: 700px) {
  .admin {
    display: none;
    font-size: 25px;
  }
  .navbar {
    font-size: 25px;
  }
}


</style>
