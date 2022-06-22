import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: null,
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

    setMeetups(state, payload) {
      state.loadedMeetups = payload;
    },

    setUser(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    async createMeetup(context, payload) {
      try {
        const meetup = {
          title: payload.title,
          location: payload.location,
          imageUrl: payload.imageUrl,
          description: payload.description,
          date: payload.date.toISOString(),
          creatorId: context.state.user.id,
        };

        //database() serve per connettersi ai comandi del database come update, delete, push, ref, set ecc.. a diffferenza di auth() che si riferisce ai comandi di autenticazione
        //ref() serve per passare un argomento sotto il quale vogliamo salvare i dati (in questo caso creiamo meetups)
        //push() seve per aggiungere i dati al ref
        const response = await firebase.database().ref('meetups').push(meetup);

        const key = response.key; //E' l'id con cui firebase salva ogni elemento(meetup) aggiunto al database

        context.commit('createMeetup', { ...meetup, id: key });
      } catch (err) {
        console.log(err);
      }
    },

    async loadMeetups(context) {
      try {
        context.state.loading = true;
        //ref() in questo caso ci serve per accedere al node dal quale vogliamo prendere i dati
        //on() serve per ottenere dati da firebase ogni volta che avviene un cambiamento/modifica ....e gli si passa 'value' dentro
        //once() mi ritorna solo una volta il contenuto di tutti i dati dentro meetups in questo caso ....e gli si passa 'value' dentro
        const response = await firebase.database().ref('meetups').once('value');

        context.state.loading = false;

        const responseMeetupsObj = response.val(); //---> Ci ritorna un oggetto con dentro tutti i meetup quindi un oggetto di oggetti

        const meetupsList = [];

        for (const key in responseMeetupsObj) {
          const meetup = {
            title: responseMeetupsObj[key].title,
            location: responseMeetupsObj[key].location,
            imageUrl: responseMeetupsObj[key].imageUrl,
            description: responseMeetupsObj[key].description,
            date: responseMeetupsObj[key].date,
            creatorId: responseMeetupsObj[key].creatorId,
            id: key,
          };

          meetupsList.push(meetup);
        }

        console.log(meetupsList);

        context.commit('setMeetups', meetupsList);
      } catch (err) {
        console.log(err);
      }
    },

    //Automaticamente, usando SDK al posto di REST API, il token ed i vari dati dell'utente vengono salvati nel local storage senza doverlo fare noi
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

    //Automaticamente, usando SDK al posto di REST API, il token ed i vari dati dell'utente vengono salvati nel local storage senza doverlo fare noi
    async signUserIn(context, payload) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        console.log(response);

        const newUser = {
          id: response.uid,
          registeredMeetups: [],
        };

        context.commit('setUser', newUser);
      } catch (err) {
        console.log(err);
      }

      // .then(user => {
      //   const newUser = {
      //     id: user.uid,
      //     registeredMeetups: [],
      //   };
      //   context.commit('setUser', newUser);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },

    autoSignIn(context, user) {
      context.commit('setUser', { id: user.uid, registeredMeetups: [] }); //passiamo l'id dell'user che ci restituisce la funzione onAuthStateChange()
    },

    logout(context) {
      context.commit('setUser', null);
      firebase.auth().signOut();
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

    isLoading(state) {
      return state.loading;
    },
  },
});
