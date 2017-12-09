import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import createPersistedState from 'vuex-persistedstate';
import MobileDetect from 'mobile-detect';

Vue.use(Vuex);

/* eslint no-param-reassign: ["error", { "props": false }]*/
export default new Vuex.Store({
  state: {
    isAdmin: false,
    isAllowedIp: false,
    userAgent: {
      isMobile: null,
    },
    cordova: {
      isApp: false,
      isActive: false,
    },
    books: [],
    genres: [],
    highestRatedBooks: [],
    recentlyReviewedBooks: [],
    qrArray: [],
    count: {},
    isMobile: null,
  },
  getters: {
    isAllowedToPublish: (state) => {
      if (state.isAdmin || state.isAllowedIp) {
        return true;
      }
      return false;
    },
    isDeviceWithMic: () => {
      navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
      if (navigator.getUserMedia) {
        return true;
      }
      return false;
    },
  },
  mutations: {
    count: (state, data) => {
      state.count = data;
    },
    isMobile: (state) => {
      const md = new MobileDetect(window.navigator.userAgent);
      if (md.mobile()) {
        state.userAgent.isMobile = true;
        return;
      }
      state.userAgent.isMobile = false;
    },
    changeAdminState: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    // isAndroid: (state) => {
    //   state.isAndroid = /(android)/i.test(navigator.userAgent);
    // },
    isAllowedIp: (state) => {
      state.isAllowedIp = true;
    },
    books: (state, data) => {
      state.books = data;
    },
    genres: (state, data) => {
      state.genres = data;
    },
    recentlyReviewedBooks: (state, data) => {
      state.recentlyReviewedBooks = data;
    },
    highestRatedBooks: (state, data) => {
      state.highestRatedBooks = data;
    },
    addQrArray: (state, data) => {
      state.qrArray = data;
    },
    toggleQr: (state, data) => {
      const index = _.findIndex(state.qrArray, { id: data.id });
      if (index === -1) {
        state.qrArray.push(data);
      } else {
        state.qrArray.splice(index, 1);
      }
    },
    resetQr: (state) => {
      state.qrArray = [];
    },
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
});
