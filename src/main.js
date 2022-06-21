import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify.js';
import router from './router/index.js';
import store from './store/index.js';

import * as firebase from 'firebase';

import dateFilter from './filters/dateFormatter';

Vue.config.productionTip = false;

Vue.filter('dateFormatter', dateFilter); //Serve per dare un nome da usare ovunque nell'app quando si vuole chiamare il filter (la funzione)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDMlb373iwKHRJZ-oH-9M39i3UMSSK5gJ4',
      authDomain: 'photo-walks-bac89.firebaseapp.com',
      projectId: 'photo-walks-bac89',
      storageBucket: 'photo-walks-bac89.appspot.com',
      messagingSenderId: '395447594497',
      appId: '1:395447594497:web:7a7c6444fc307c401e9a00',
    });
  },
}).$mount('#app');
