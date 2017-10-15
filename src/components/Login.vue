<template>
  <div class="add-author flex-box">
    <h3>Logga in</h3>
    <div class="flex-container">
        <div class="flex-left-modal">
          Användarnamn
        </div>
        <div class="flex-right">
            <input v-model="username"
            placeholder="Användarnamn">
        </div>
        <div class="flex-left-modal">
          Lösenord
        </div>
        <div class="flex-right">
            <input v-model="password"
            type="password"
            placeholder="Lösenord">
        </div>
        <div class="modal-menu">
          <div class="error"
            v-if="loginFailed">
            Fel användarnamn eller lösenord.
          </div>
          <div class="button float close"
            @click="closeLogin">Stäng
          </div>
          <div class="button add"
            @click="login">Logga in
          </div>
        </div>
    </div>
  </div>
</template>


<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Auth from '@/api/services/auth';

export default {
  name: 'login',
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  data() {
    return {
      username: '',
      password: '',
      loginFailed: false,
    };
  },
  created() {
    this.loginFailed = false;
  },
  methods: {
    login() {
      Auth.adminLogin({ username: this.username, password: this.password })
        .then((result) => {
          if (result.auth) {
            this.changeAdminState();
            this.closeLogin();
          } else {
            this.loginFailed = true;
          }
        });
    },
    closeLogin() {
      this.$emit('close');
    },
    changeAdminState() {
      this.$store.commit('changeAdminState');
      this.$router.push({ name: 'activate-reviews' });
    },
  },
};
</script>

<style scoped>
.has-error {
  border: 2px solid #ff585d;
}

.button {
  margin: 10px 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}
.close {
  background-color: #ff585d;
}

.add {
  background-color: #71c5e8;
}

.float {
  float: left;
}

.menu {
  display: inline-block;
}

.modal-menu {
  margin-top: 20px;
  margin-left: 28%;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.flex-left-modal {
  width: 25%;
  margin-bottom: 5px;
  margin-left: 22%;
  font-weight: bold;
  text-align:left;
}

.flex-right {
  width: 48%;
  margin-bottom: 5px;
  text-align: left;
}

.flex-box{
  width: 100%;
  align-items:center;
}

.error {
  text-align: center;
  color: #ff585d;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

input {
  width: 200px;
}
</style>
