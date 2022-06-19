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
    return {
      meetups: [
        {
          imageUrl:
            'https://images.lonelyplanetitalia.it/static/places/new-york-city-319.jpg?q=90&p=social&s=cbcff5785dc288e0a7bd4edacbd6e9cc',
          id: 1,
          title: 'Meetup in New York',
        },
        {
          imageUrl:
            'https://www.visitberlin.de/system/files/styles/visitberlin_teaser_single_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=34GoL64x',
          id: 2,
          title: 'Meetup in beliin',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1920/v1612782123/a7kxstakrek6p7tarwh1.jpg',
          id: 3,
          title: 'Meetup in Paris',
        },
      ],
    };
  },

  methods: {
    showMeetup(id) {
      this.$router.replace('/meetup/' + id);
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
