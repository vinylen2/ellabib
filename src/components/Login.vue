<template>
  <div class="add-author flex-box">
    <h3>Logga in</h3>
    <div class="flex-container">
        <div class="flex-left-modal">
          Användarnamn
        </div>
        <div class="flex-right">
            <input v-model="username"
            autofocus
            placeholder="Användarnamn">
        </div>
        <div class="flex-left-modal">
          Lösenord
        </div>
        <div class="flex-right">
            <input v-model="password"
              type="password"
              @keyup.enter="login"
              placeholder="Lösenord">
        </div>
        <div class="modal-menu">
          <div class="error"
            v-if="loginFailed">
            Fel användarnamn eller lösenord.
          </div>
          <button class="button"
            @click="login">Logga in
          </button>
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
      Auth.login({ username: this.username, password: this.password })
        .then((result) => {
          if (result.auth) {
            this.changeAdminState();
          } else {
            this.loginFailed = true;
          }
        });
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
  border: none;
  margin: 10px 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #71c5e8;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}

input:focus {
  outline: none;
}

.modal-menu {
  margin-top: 20px;
  width: 100%;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.flex-left-modal {
  width: 35%;
  margin-bottom: 5px;
  font-weight: bold;
  text-align:left;
}

.flex-right {
  width: 48%;
  margin-bottom: 5px;
  text-align: left;
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
  width: 80%;
}

.flex-box {
  width: 100%;
}

@media (min-width: 600px) {
  .flex-box {
    width: 70%;
    margin-left: 15%;
  }
}
@media (min-width: 980px) {
  .flex-box {
    width: 50%;
    margin-left: 25%;
  }
}

</style>
