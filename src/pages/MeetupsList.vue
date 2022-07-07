<template>
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
              <v-list-item-title>{{ meetup.position }}</v-list-item-title>
              <v-list-item-subtitle>{{
                meetup.date | dateFormatter
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-divider inset></v-divider> -->
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import spinner from '../UI/LoadingSpinner.vue';

export default {
  components: { spinner },

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
      return this.$store.getters['meetupModule/meetups'];
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  background-color: rgba(0, 0, 0, 0.514);
  border-radius: 5px;
  margin-top: 8rem;
}
</style>
