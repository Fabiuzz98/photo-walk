import * as firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    hasLoaded: false,
    meetups: [
      {
        id: '1knln',
        name: 'Meetup In New York',
        description: 'This meetup is awesome',
        position: '1400 Main Street',
        date: new Date(),
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
      },
      {
        id: '2',
        name: 'Meetup In Berlin',
        description: 'This meetup is awesome',
        position: '1400 Main Street',
        date: new Date(),
        imageUrl:
          '  https://www.hapimag.com/.imaging/default/dam/global/resorts/Deutschland/Berlin-Zoo/header-berlin_zoo.jpg/jcr:content.jpg',
      },
      {
        id: '3',
        name: 'Meetup In Balicz',
        description: 'This meetup is awesome',
        position: '1400 Main Street',
        date: new Date(),
        imageUrl:
          'https://ubud.it/wp-content/uploads/2020/01/Viaggio-di-nozze-a-Bali.jpg',
      },
      {
        id: '4',
        name: 'Meetup In Baliwe',
        description: 'This meetup is awesome',
        position: '1400 Main Street',
        date: new Date(),
        imageUrl:
          'https://ubud.it/wp-content/uploads/2020/01/Viaggio-di-nozze-a-Bali.jpg',
      },
      {
        id: '5',
        name: 'Meetup In Balin,',
        description: 'This meetup is awesome',
        position: '1400 Boulevard Street',
        date: new Date(),
        imageUrl:
          'https://ubud.it/wp-content/uploads/2020/01/Viaggio-di-nozze-a-Bali.jpg',
      },
    ],
  },

  mutations: {
    createMeetup(state, payload) {
      state.meetups.unshift(payload);
    },

    loadMeetups(state, payload) {
      state.meetups = payload;
      state.hasLoaded = true;
    },

    updateMeetupDate(state, payload) {
      const index = state.meetups.findIndex(meetup => meetup.id === payload.id);

      state.meetups[index].date = payload.date;
    },
  },
  actions: {
    async createMeetup(context, payload) {
      try {
        const userId = context.rootState.user.userId;

        const meetup = {
          title: payload.title,
          location: payload.location,
          description: payload.description,
          date: payload.date.toISOString(),
          creator: userId,
        };

        // const ImgExt = payload.image.name.split('.')[1];

        //Salvare il meetup nel db senza immagine
        const response = await firebase.database().ref('meetups').push(meetup);
        const meetupKey = response.key;

        //salvare l'immagine in meetups, key, file img intero
        const storageResponse = await firebase
          .storage()
          .ref('meetups/' + meetupKey)
          .put(payload.image);

        const imageDBLink = storageResponse.metadata.downloadURLs[0];

        //prendere quello che ricevo dall'immagine (iil link di dove è salvata) ed inserirlo come vallue in image ed updatare il meetup nel db con il key value pair
        await firebase
          .database()
          .ref('meetups')
          .child(meetupKey)
          .update({ imageUrl: imageDBLink });

        //inviare il meetup locally
        context.commit('createMeetup', {
          ...meetup,
          id: meetupKey,
          imageUrl: imageDBLink,
        });
      } catch (err) {
        throw new Error(err.message);
      }
    },

    async loadMeetups(context) {
      try {
        const response = await firebase.database().ref('meetups').once('value');
        const allMeetups = response.val();

        const meetupList = [];

        for (const key in allMeetups) {
          const obj = {
            title: allMeetups[key].title,
            date: allMeetups[key].date,
            description: allMeetups[key].description,
            imageUrl: allMeetups[key].imageUrl,
            location: allMeetups[key].location,
            creator: allMeetups[key].creator,
            id: key,
          };

          meetupList.push(obj);
        }

        context.commit('loadMeetups', meetupList);
      } catch (err) {
        console.log(err);
      }
    },

    async updateMeetupsdate(context, payload) {
      try {
        const updatedDate = payload.date.toISOString();

        await firebase
          .database()
          .ref('meetups')
          .child(payload.id)
          .update({ date: updatedDate });

        context.commit('updateMeetupDate', payload);
      } catch (err) {
        console.log(err);
      }
    },
  },

  getters: {
    meetups(state) {
      return state.meetups;
    },
    hasLoaded(state) {
      return state.hasLoaded;
    },
  },
};
