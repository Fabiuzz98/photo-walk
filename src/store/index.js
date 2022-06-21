import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          'https://images.lonelyplanetitalia.it/static/places/new-york-city-319.jpg?q=90&p=social&s=cbcff5785dc288e0a7bd4edacbd6e9cc',
        id: '1',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'Munich',
        description: 'Love Munich',
      },
      {
        imageUrl:
          'https://www.visitberlin.de/system/files/styles/visitberlin_teaser_single_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=34GoL64x',
        id: '2',
        title: 'Meetup in beliin',
        date: new Date(),
        location: 'Munich',
        description: 'Love Munich',
      },
      {
        imageUrl:
          'https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1920/v1612782123/a7kxstakrek6p7tarwh1.jpg',
        id: '3',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Munich',
        description: 'Love Munich',
      },
    ],

    user: null,
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },

    setUser(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    createMeetup(context, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'kfdlsfjslakl12',
      };

      context.commit('createMeetup', meetup);
    },

    signUserUp(context, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          context.commit('setUser', newUser);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > -b.date;
      });
    },

    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },

    //Questa sotto è una funzione che ritorna un'altra funzione la quale riceverà l'argomento al momento chesi chiaam la computed property passandogli il valore tra le ()
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },

    user(state) {
      return state.user;
    },
  },
});
