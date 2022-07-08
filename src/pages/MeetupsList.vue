<template>
  <div>
    <div>
      <filterYear @getDates="filterPhotowalks"></filterYear>
    </div>
    <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
    <v-layout mt-15 mx-5>
      <v-flex class="d-flex flex-wrap justify-space-around">
        <spinner v-if="!hasLoaded"></spinner>

        <v-card
          v-else
          class="meetup mb-10"
          max-width="320"
          v-for="meetup in meetups"
          :key="meetup.id"
          :to="'/meetup/' + meetup.id + '/detail'"
        >
          <v-img :src="meetup.imageUrl" height="250px" dark>
            <v-row class="fill-height">
              <v-card-title class="white--text pt-15 mx-auto">
                <div class="text-h5 pa-2 title">{{ meetup.title }}</div>
              </v-card-title>
            </v-row>
          </v-img>

          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo"> mdi-map-marker </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ meetup.location }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  meetup.date | dateFormatter
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import spinner from '../UI/LoadingSpinner.vue';
import filterYear from '../UI/FilterPerYear.vue';

export default {
  components: { spinner, filterYear },

  data() {
    return {
      filteredMeetups: [],
      errorMsg: '',
    };
  },

  methods: {
    filterPhotowalks(choosenDates) {
      const meetups = this.$store.getters['meetupModule/meetups'];

      const chosenDatesInNumbers = choosenDates.map(function (date) {
        return new Date(date).getTime();
      });

      const startDate = Math.min(...chosenDatesInNumbers);
      const endDate = Math.max(...chosenDatesInNumbers);

      let filtered = meetups.filter(function (meetup) {
        return (
          new Date(meetup.date).getTime() >= startDate &&
          new Date(meetup.date).getTime() <= endDate
        );
      });

      if (startDate === endDate) {
        filtered = meetups.filter(function (meetup) {
          let date = new Date(meetup.date);
          date.setHours(2);
          date.setMinutes(0);
          return date.getTime() === startDate;
        });
      }

      if (filtered.length === 0) {
        this.errorMsg = 'There are no photowalks for those dates';

        setTimeout(() => {
          this.errorMsg = '';
        }, 3500);
      }

      this.filteredMeetups = filtered;
    },
  },

  computed: {
    hasLoaded() {
      const hasLoaded = this.$store.getters['meetupModule/hasLoaded'];
      if (!hasLoaded) {
        return false;
      } else {
        return true;
      }
    },
    meetups() {
      if (this.filteredMeetups.length > 0) {
        return this.filteredMeetups;
      } else {
        return this.$store.getters['meetupModule/meetups'];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.error-message {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 1rem;
  padding: 1rem 0;
  color: red;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3), 0 0 1em rgba(0, 0, 0, 0.3),
    0 0 0.2em rgba(0, 0, 0, 0.3);
  font-weight: 500;
  text-transform: uppercase;
}
.title {
  background-color: rgba(0, 0, 0, 0.514);
  border-radius: 5px;
  margin-top: 8rem;
}
</style>
