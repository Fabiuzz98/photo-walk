<template>
  <v-container mt-10>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ selectedMeetup.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-meetup-details
                :meetup="selectedMeetup"
              ></edit-meetup-details>
            </template>
          </v-card-title>
          <v-img :src="selectedMeetup.imageUrl" height="400px"></v-img>
          <v-card-text>
            <div class="info--text">
              {{ selectedMeetup.date | dateFormatter }} -{{
                selectedMeetup.location
              }}
            </div>
            <div>
              {{ selectedMeetup.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import editMeetupDetails from './edit/editMeetupDetails.vue';
export default {
  components: { editMeetupDetails },
  props: ['id'],
  computed: {
    selectedMeetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },

    isAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },

    userIsCreator() {
      if (!this.isAuthenticated) {
        console.log('false');
        return false;
      } else {
        console.log('treu');
        console.log(this.selectedMeetup.title);

        return this.$store.getters.user.id === this.selectedMeetup.creatorId;
      }
    },
  },
};
</script>
