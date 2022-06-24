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

    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return (meetup.id = payload.id);
      });

      if (payload.title) {
        meetup.title = payload.title;
      }

      if (payload.description) {
        meetup.description = payload.description;
      }

      if (payload.date) {
        meetup.date = payload.date;
      }
    },

    registeredUserForMeetup(state, payload) {
      const id = payload.id; //Sarebbe l'id del meetup passato da noi
      state.user.registeredMeetups.push(id); //Aggiungiamo all'array di ogni user gli id dei meetup ai quali si registrano
      state.user.fbKeys[id] = payload.fbKey; //Così si crea un oggetto chiamato 'fbKeys che per ogni suo elemento avrà come "key" l'id del meetup al quale ci siamo registrati e come "value" la key assegnatta da Firebase
      console.log(state.user);
      console.log(state.user.fbKeys);
    },

    unregisterUserForMeetups(state, meetupId) {
      const registeredMeetups = state.user.registeredMeetups; //Prendiamo l'array di meetup al quale l'user è registrato

      //Andiamo a cercare dentro l'array di meetups quello che corrisponde all'id del meetup passato da noi e lo togliamo con splice
      registeredMeetups.splice(
        registeredMeetups.findIndex(meetup => meetup.id === meetupId),
        1
      );

      //Usiamo infine questo metodo che cerca dentro ad un oggetto una specifica key e la toglie compreso del contenuto
      Reflect.deleteProperty(state.user.fbKeys, meetupId);

      console.log(state.user.fbKeys);
      console.log(state.user.registeredMeetups);
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
        let imageUrl;
        let key;

        const meetup = {
          title: payload.title,
          location: payload.location,
          description: payload.description,
          date: payload.date.toISOString(),
          creatorId: context.state.user.id,
        };

        //database() serve per connettersi ai comandi del database come update, delete, push, ref, set ecc.. a diffferenza di auth() che si riferisce ai comandi di autenticazione
        //ref() serve per passare un argomento sotto il quale vogliamo salvare i dati (in questo caso creiamo meetups)
        //push() seve per aggiungere i dati al ref
        const response = await firebase.database().ref('meetups').push(meetup);

        key = response.key; //E' l'id con cui firebase salva ogni elemento(meetup) aggiunto al database

        const fileName = payload.image.name; //Prendiamo il nome dell'immagine dall'oggetto passato nel payload
        const extension = fileName.slice(fileName.lastIndexOf('.')); //Prendiamo così l'estensione del file (jpg, png ecc..)

        //storage() serve per accedere allo storage di firebase e con ref() si specifica il nome di dove vogliamo salvarlo
        //put() serve per inviare il tutto
        /*Vogliamo salvare l'immagine dentro lo storage di firebase in meetups/ con poi la key con la quale firebase aveva salvato il singolo meetup seguita dalla sua 
          estensione */
        const fileData = await firebase
          .storage()
          .ref('meetups/' + key + '.' + extension)
          .put(payload.image);

        imageUrl = fileData.metadata.downloadURLs[0]; //Andiamo a prendere il link del file che abbiamo uploadato ed usiamo [0] perchè salviamo un immagine per meetup

        console.log(imageUrl);

        /* Andiamo ad aggiornare, e nel nostro caso creare, dentro la cartella meetups in firebase ---> a sua volta dentro il meetup singolo (grazie alla sua key presa
          prima) un'altra key nell'oggetto chiamata imageUrl che conterrà il link dello slot di memoria dello storage in Firebase dove l'immagine è stata salvata
         */
        //child() si usa per andare a prendere il meetup specifico dentro all'array di oggetti meetups in Firebase
        //update() serve per aggiornare un elemento all'interno del database ed in caso non esista, a crearlo come nel nostro caso che creerà una key con dentro il valore
        firebase
          .database()
          .ref('meetups')
          .child(key)
          .update({ imageUrl: imageUrl });

        context.commit('createMeetup', {
          ...meetup,
          id: key,
          imageUrl: imageUrl,
        }); //Andiamo finalmente ad aggiungere il meetup nel nostro array nel locale in state
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

    async updateMeetupData(context, payload) {
      try {
        const updateObj = {};

        //Solo in caso non siano vuoti le aggiorniamo
        if (payload.title) {
          updateObj.title = payload.title;
        }

        if (payload.description) {
          updateObj.description = payload.description;
        }

        if (payload.date) {
          updateObj.date = payload.date;
        }

        await firebase
          .database()
          .ref('meetups')
          .child(payload.id)
          .update(updateObj);

        context.commit('updateMeetup', payload);
      } catch (err) {
        console.log(err);
      }
    },

    async registerUserForMeetup(context, meetupId) {
      try {
        //Essendo che il database salva i dati com eun array di oggetti, l'ultimo elemento che passiamo è però solo una stringa e quindi Firebase automaticamente
        //assegna una key alla nostra stringa così che diventa un oggetto--> key(fbKey): value(Stringa ovvero l'id del meetup al quale ci si è registrati).
        // data --> ci ritorna la key assegnata da Firebase per fare diventare il tutto un oggetto e si può accedere con 'data.key'
        const data = await firebase
          .database()
          .ref('/users/' + context.getters.user.id)
          .child('/registration/')
          .push(meetupId);

        context.commit('registeredUserForMeetup', {
          id: meetupId,
          fbKey: data.key, //Si riferisce alla key creata da firebase per il meetup
        });
      } catch (err) {
        console.log(err);
      }
    },

    async unregisterUserFromMeetup(context, meetupId) {
      try {
        const user = context.getters.user;

        //Se l'user attuale non ha un oggetto con Firebase key vuol dire che non può sregistrarsi perchè non è registrato a nulla
        if (!user.fbKeys) return;

        const fbKey = user.fbKeys[meetupId]; //Andiamo a cercare dentro l'oggetto 'fbKeys' quella key che corrisponde all'if del meetup passato da noi e ne prendiamo il value ovvero la key assegnata da Firebase (fbKey)

        //Andiamo a cercare nel database la fbKey appena presa dall'oggetto e la rimuoviamo compreso del contenuto ovviamente
        await firebase
          .database()
          .ref('/users/' + user.id + '/registration/')
          .child(fbKey)
          .remove();

        context.commit('unregisterUserForMeetups', meetupId);
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
            fbKeys: {},
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
          fbKeys: {},
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
      context.commit('setUser', {
        id: user.uid,
        fbKeys: {},
        registeredMeetups: [],
      }); //passiamo l'id dell'user che ci restituisce la funzione onAuthStateChange()
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
