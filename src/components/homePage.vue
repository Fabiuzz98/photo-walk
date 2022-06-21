<template>
  <v-container>
    <v-layout row wrap class="mb-5 mt-8">
      <v-flex
        xs12
        sm6
        class="text-center text-sm-right"
        :class="{
          'pr-5': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <v-btn large router to="/meetups" class="primary"
          >Explore meetups</v-btn
        >
      </v-flex>
      <v-flex
        xs12
        sm6
        class="text-center text-sm-left"
        :class="{
          'pl-5': $vuetify.breakpoint.mdAndUp,
          'pt-2': $vuetify.breakpoint.mdAndDown,
        }"
      >
        <v-btn large router to="/create-new-meetup" class="primary"
          >Organize meetup</v-btn
        >
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="showMeetup(meetup.id)"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-5">
      <v-flex xs12 class="text-center">
        <p>Join our awesome meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    showMeetup(id) {
      const path = `/meetup/${id}`;
      if (this.$route.path !== path) this.$router.push(path);

      // this.$router.replace('/meetup/' + id);
    },
  },

  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 55px;
  color: white;
}
</style>
