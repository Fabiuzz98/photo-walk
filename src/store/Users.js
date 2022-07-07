import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

import meetups from './Meetups.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { meetupModule: meetups },
  state: {
    user: {},
  },

  mutations: {
    setUser(state, payload) {
      state.user = { userId: payload.uid };
      console.log(state.user);
    },
  },
  actions: {
    async signUp(context, payload) {
      try {
        console.log(payload);

        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);

        console.log(response.uid);
        context.commit('setUser', response);
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
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user.userId;
    },
  },
});
