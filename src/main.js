// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from '@/stores/store';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  const cordovaScript = document.createElement('script');
  cordovaScript.setAttribute('type', 'text/javascript');
  cordovaScript.setAttribute('src', 'cordova.js');
  document.body.appendChild(cordovaScript);
  store.state.cordova.isApp = true;
}

function onDeviceReady() {
  store.state.cordova.isActive = true;
}

function onLoad() {
  document.addEventListener('deviceready', onDeviceReady, false);
}

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    onLoad();
  },
});

