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
      storageBucket: 'gs://photo-walks-bac89.appspot.com',
      databaseURL: 'https://photo-walks-bac89-default-rtdb.firebaseio.com/',
      messagingSenderId: '395447594497',
      appId: '1:395447594497:web:7a7c6444fc307c401e9a00',
    });

    this.$store.dispatch('loadMeetups'); //Carichiamo la lista di meetup dal database alla creazione del sito

    //Al cambiamento del token dentro local storage, onAuthStateChanged() si attiva ed al suo interno prende un valore, l'utente. Quindi ogni volta che ci logghiamo o
    //creiamo un account, automaticamente questa funzione percepisce che c'è un token dentro al local Storage ed esegue quello che noi gli diciamo al suo interno
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user); //Passiamo l'utente solo in caso esista grazie all'if alla funzione che ci aggiornerrà anche la nostra variabilenel sito così da rispecchiare il localStorage
        this.$store.dispatch('fetchUserData');
      }
    });
  },
}).$mount('#app');
