import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

import meetups from './Meetups.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { meetupModule: meetups },
  state: {
    user: {},
    fbKeyObj: {},
    meetupsRegistrations: [],
  },

  mutations: {
    setUser(state, payload) {
      state.user = { userId: payload.uid };
    },

    setUserRegistrations(state, payload) {
      console.log(state, payload);

      state.fbKeyObj = payload.fbKeyObj;

      state.meetupsRegistrations = payload.registrationsArr;

      console.log(state.fbKeyObj, state.meetupsRegistrations);
    },

    unregisterUser(state, meetupId) {
      console.log(state.fbKeyObj[meetupId]);

      const index = state.meetupsRegistrations.findIndex(
        meetupId => meetupId === meetupId
      );

      state.meetupsRegistrations.splice(index, 1);

      Reflect.deleteProperty(state.fbKeyObj, meetupId);

      console.log(state.fbKeyObj[meetupId]);
    },
  },
  actions: {
    async signUp(context, payload) {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);

        context.commit('setUser', response);
      } catch (err) {
        throw new Error(err);
      }
    },

    async signIn(context, payload) {
      try {
        const userCredentials = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);

        context.commit('setUser', userCredentials);
      } catch (err) {
        throw new Error(err);
      }
    },

    autoSignIn(context, user) {
      context.commit('setUser', user);
    },

    logout(context) {
      context.commit('setUser', {});
      firebase.auth().signOut();
    },

    async registerUserForMeetup(context, meetupId) {
      try {
        const userId = context.rootState.user.userId;

        const response = await firebase
          .database()
          .ref(`/users/${userId}`)
          .child('/registration/')
          .push(meetupId);

        const fbKey = response.key;

        console.log(fbKey);

        const registrations = [];
        const meetupsPathToUnregister = {};

        registrations.push(meetupId);

        meetupsPathToUnregister[meetupId] = fbKey;

        const obj = {
          registrationsArr: registrations,
          fbKeyObj: meetupsPathToUnregister,
        };

        context.commit('setUserRegistrations', obj);
      } catch (err) {
        console.log(err);
      }
    },

    async unregisterUserForMeetup(context, meetupId) {
      try {
        const userId = context.rootState.user.userId;

        const fbKey = context.rootState.fbKeyObj[meetupId];
        console.log(fbKey);

        firebase
          .database()
          .ref(`/users/${userId}/registration/`)
          .child(fbKey)
          .remove();

        context.commit('unregisterUser', meetupId);
      } catch (err) {
        console.log(err);
      }
    },

    async getUserDataAtLogin(context) {
      try {
        const userId = context.rootGetters.userId;

        console.log(userId);

        const response = await firebase
          .database()
          .ref(`/users/${userId}/registration/`)
          .once('value');

        const data = response.val();

        const registrations = [];
        const meetupsPathToUnregister = {};

        for (const key in data) {
          registrations.push(data[key]);
          meetupsPathToUnregister[data[key]] = key;
        }

        const obj = {
          registrationsArr: registrations,
          fbKeyObj: meetupsPathToUnregister,
        };

        context.commit('setUserRegistrations', obj);
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user.userId;
    },

    userId(state) {
      return state.user.userId;
    },

    registrations(state) {
      return state.meetupsRegistrations;
    },
  },
});
