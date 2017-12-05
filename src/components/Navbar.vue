<template>
  <div class="app-container">
    <router-link to="/">
      <img src="https://ellabib.se/images/ellabib.png">
    </router-link>
    <!-- <router-link to="/">Hem</router-link> -->
    <router-link to="/books">Böcker</router-link>
    <router-link to ="/scanner"
      v-show="isDeviceWithWebRTC">Scanner</router-link>
    <router-link to="/about">Om</router-link>
    <div class="admin">
      <router-link to ="/admin"
        v-show="isAdmin"><icon name="cog" scale="2"></icon></router-link>
      <div class="login"
        v-show="isAdmin"
        @click="logout"><icon name="sign-out" scale="2"></icon></div>
    </div>
  </div>
</template>

<script>
import Auth from '@/api/services/auth';
import Icon from 'vue-awesome';

export default {
  name: 'navbar',
  components: {
    Icon,
  },
  created() {
    this.ipAuth();
    this.$store.commit('isMobile');
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
      Auth.logout();
      this.$store.commit('changeAdminState');
      this.$router.push({ name: '/books' });
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
.app-container {
  width: 100%;
  background-color: #addb91;
  display: block;
  height: 60px;
}

img {
  height: 40px;
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
  line-height:60px;
}

.login {
  cursor: pointer;
  float: left;
  /* display: block; */
  color: black;
  padding-left: 20px;
  font-size: 1.5em;
  text-decoration: none;
  line-height:60px;
  vertical-align: middle;
}

.fa-icon {
  vertical-align: middle;
}

.login:hover {
  color: black;
  font-weight: bold;
}

.admin {
  float: right;
  margin-right: 20px;
}

a:hover {
  color: black;
  font-weight: bold;
}

@media print {
  .app-container {
    display: none;
  }
}
</style>
