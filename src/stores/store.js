import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/* eslint no-param-reassign: ["error", { "props": false }]*/
export default new Vuex.Store({
  state: {
    isAdmin: false,
    isAllowedIp: false,
    cordova: {
      isApp: false,
      isActive: false,
    },
    isAndroid: false,
    books: [],
  },
  getters: {
    isDeviceWithWebRTC: (state) => {
      if (state.cordova.isApp) {
        return state.cordova.isApp;
      } else if (state.isAndroid) {
        return state.isAndroid;
      }
      return false;
    },
    isAllowedToPublish: (state) => {
      if (state.isAdmin || state.isAllowedIp) {
        return true;
      }
      return false;
    },
  },
  mutations: {
    changeAdminState: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    isAndroid: (state) => {
      state.isAndroid = /(android)/i.test(navigator.userAgent);
    },
    isAllowedIp: (state) => {
      state.isAllowedIp = true;
    },
    books: (state, data) => {
      state.books = data;
    },
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
});
