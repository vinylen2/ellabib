import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/* eslint no-param-reassign: ["error", { "props": false }]*/
export default new Vuex.Store({
  state: {
    isAdmin: false,
    cordova: {
      isApp: false,
      isActive: false,
    },
  },
  mutations: {
    changeAdminState: (state) => {
      state.isAdmin = !state.isAdmin;
    },
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
});
