<template>
  <div>
    <v-layout class="carousel-container" row wrap>
      <v-flex xs12>
        <spinner v-if="!hasLoaded"></spinner>
        <v-carousel
          v-else
          xs12
          cycle
          height="500"
          class="carousel"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            class="mt-auto"
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
          >
            <div class="meetup-name">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </div>
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
.carousel-container {
  margin-top: 5rem;
  padding: 0 15rem;

  @media (max-width: 1200px) {
    padding: 0 5rem;
  }
  @media (max-width: 750px) {
    padding: 0;
  }

  .carousel {
    border-radius: 5px;

    .meetup-name {
      position: absolute;
      bottom: 55px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-size: 1.6rem;
      background-color: rgba(0, 0, 0, 0.507);
      border-radius: 5px;
      padding: 0.8rem 2rem;
      font-weight: 500;
      text-align: center;

      @media (max-width: 750px) {
        padding: 0.5rem 2rem;

        font-size: 1.2rem;
      }
    }
  }
}
</style>
