<template>
  <v-container mt-10>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ selectedMeetup.title }}</h6>
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
export default {
  props: ['id'],
  computed: {
    selectedMeetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
  },
};
</script>
