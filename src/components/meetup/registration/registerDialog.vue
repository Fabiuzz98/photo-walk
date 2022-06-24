<template>
  <v-dialog persistent v-model="registerDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="primary" accent v-bind="attrs" v-on="on">{{
        userIsRegistered ? 'Unregister' : 'Register'
      }}</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered"
              >Unregister from Meetup?</v-card-title
            >
            <v-card-title v-else>Register for Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text
              >You can always change your decision later on.</v-card-text
            >
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                text
                @click="registerDialog = false"
                >Cancel</v-btn
              >
              <v-btn class="green--text darken-1" text @click="onAgree"
                >Confirm</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    userIsRegistered() {
      //findIndexOf ritorna il numero dell'indice nell'array di dove si trova l'elemento MA ritorna -1 se non c'è nessun elemento corrispondente e questo ci permette di
      //capire se l'user è registrato o meno in caso avessimo -1 come risultato
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    },
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        console.log('sono registrato');
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId);
      } else {
        console.log('non sono registrato');

        this.$store.dispatch('registerUserForMeetup', this.meetupId);
      }
    },
  },
};
</script>
