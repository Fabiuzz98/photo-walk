<template>
  <v-dialog transition="dialog-bottom-transition" width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn accent v-bind="attrs" v-on="on">Edit Time</v-btn>
    </template>
    <template>
      <v-container class="dialog">
        <v-layout>
          <v-flex xs12>
            <v-card-title color="primary" dark>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker
              v-model="editableTime"
              format="24hr"
              style="width: 100%"
            >
              <template>
                <v-btn
                  class="blue--text darken-1"
                  text
                  @click.native="onSaveChanges"
                  >save</v-btn
                >
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],

  data() {
    return {
      editDialog: false,
      editableTime: '',
    };
  },

  methods: {
    onSaveChanges() {
      const newTime = new Date(this.meetup.date);

      const hour = this.editableTime.split(':')[0];
      const minutes = this.editableTime.split(':')[1];

      newTime.setHours(hour);
      newTime.setMinutes(minutes);

      console.log(newTime);

      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newTime,
      });
    },
  },
};
</script>

<style scoped>
.dialog {
  background-color: white !important;
}
</style>
