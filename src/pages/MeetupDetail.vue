<template>
  <v-container>
    <spinner class="mt-10" v-if="!hasLoaded"></spinner>
    <v-card v-else class="mx-auto mt-10 dsf" max-width="1000">
      <v-img
        class="white--text align-end"
        height="350px"
        :src="selectedMeetup.imageUrl"
      >
        <p class="font-weight-bold text-center text-h5 mb-n1 mx-auto title">
          {{ selectedMeetup.title }}
        </p>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ selectedMeetup.date | dateFormatter }} <br />
        {{ selectedMeetup.location }}
      </v-card-subtitle>

      <v-card-text class="text--primary mt-1 description">
        <div>{{ selectedMeetup.description }}</div>

        <div></div>
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between">
        <div class="edit" v-if="showEditButtons">
          <edit-time-dialog :meetup="selectedMeetup"></edit-time-dialog>
          <edit-date-dialog :meetup="selectedMeetup"></edit-date-dialog>
        </div>

        <v-btn
          v-if="!isCreator && isLoggedIn"
          color="primary"
          @click="register"
        >
          {{ isRegistered ? 'Unregister' : 'Register' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import spinner from '../UI/LoadingSpinner.vue';
import editTimeDialog from '../UI/ModalEditTime.vue';
import editDateDialog from '../UI/ModalEditDate.vue';
export default {
  components: { spinner, editTimeDialog, editDateDialog },
  props: ['id'],
  data() {
    return {
      load: null,
    };
  },

  methods: {
    register() {
      if (!this.isRegistered) {
        this.$store.dispatch('registerUserForMeetup', this.id);
      } else {
        this.$store.dispatch('unregisterUserForMeetup', this.id);
      }
    },
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    hasLoaded() {
      const hasLoaded = this.$store.getters['meetupModule/hasLoaded'];
      if (!hasLoaded) {
        return false;
      } else {
        return true;
      }
    },

    selectedMeetup() {
      const meetups = this.$store.getters['meetupModule/meetups'];
      const theOne = meetups.find(meetup => {
        return meetup.id === this.id;
      });

      return theOne;
    },

    showEditButtons() {
      const creatorId = this.selectedMeetup.creator;

      const userId = this.$store.getters.userId;

      const isAuthenticated = this.$store.getters.isLoggedIn;

      if (creatorId === userId && isAuthenticated) {
        return true;
      } else {
        return false;
      }
    },

    isCreator() {
      const creatorId = this.selectedMeetup.creator;
      const userId = this.$store.getters.userId;

      if (creatorId === userId) {
        return true;
      } else {
        return false;
      }
    },

    isRegistered() {
      const registrations = this.$store.getters.registrations;

      const isRegistered = registrations.some(meetupId => meetupId === this.id);

      return isRegistered;
    },
  },
};
</script>

<style scoped lang="scss">
.dsf {
  z-index: 1;

  .title {
    background-color: rgba(0, 0, 0, 0.479);
    padding: 1rem 0;
    text-transform: capitalize;
  }

  .description {
    font-weight: 400;
    font-size: 1rem;
  }

  .edit {
    display: flex;
  }
}
</style>
