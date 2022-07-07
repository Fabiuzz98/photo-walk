<template>
  <v-card class="mx-auto mt-10 dsf" max-width="1000">
    <spinner v-if="!hasLoaded"></spinner>
    <v-img
      class="white--text align-end"
      height="350px"
      :src="selectedMeetup.imageUrl"
      v-else
    >
      <v-card-title>{{ selectedMeetup.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ selectedMeetup.date | dateFormatter }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ selectedMeetup.description }}</div>

      <div></div>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between">
      <div>
        <v-btn color="primary " small text> Edit date </v-btn>

        <v-btn color="primary" small text> edit time </v-btn>
      </div>
      <v-btn color="primary"> Register </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import spinner from '../UI/LoadingSpinner.vue';
export default {
  components: { spinner },
  data() {
    return {
      load: null,
    };
  },
  props: ['id'],
  computed: {
    hasLoaded() {
      const hasLoaded = this.$store.getters['meetupModule/hasLoaded'];
      if (!hasLoaded) {
        return false;
      } else {
        return true;
      }
    },

    selectedMeetup() {
      if (!this.hasLoaded) return;

      const meetups = this.$store.getters['meetupModule/meetups'];
      const theOne = meetups.find(meetup => {
        return meetup.id === this.id;
      });

      return theOne;
    },
  },
};
</script>

<style scoped lang="scss">
.dsf {
  z-index: 1;
}
</style>
