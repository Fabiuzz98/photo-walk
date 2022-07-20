import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify.js';
import router from './router.js';
import store from './store/Users.js';

import dateFilter from './filters/dateFilter.js';

import modalDialog from './UI/ModalDialog.vue';

import * as firebase from 'firebase';

Vue.config.productionTip = false;

Vue.filter('dateFormatter', dateFilter);
Vue.component('modalDialog', modalDialog);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAyZ-m9Fa4VuNtXb70Fp4DEz2KiJwZ9LXU',
      authDomain: 'photo-walk-4f291.firebaseapp.com',
      projectId: 'photo-walk-4f291',
      storageBucket: 'photo-walk-4f291.appspot.com',
      databaseURL: 'https://photo-walk-4f291-default-rtdb.firebaseio.com/',
      messagingSenderId: '148650006079',
      appId: '1:148650006079:web:2345c01a0c7892e605ca8a',
    });

    this.$store.dispatch('meetupModule/loadMeetups');

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('getUserDataAtLogin');
      }
    });
  },
}).$mount('#app');
