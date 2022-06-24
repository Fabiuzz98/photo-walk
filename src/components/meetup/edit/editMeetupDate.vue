<template>
  <v-dialog transition="dialog-bottom-transition" width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn accent v-bind="attrs" v-on="on">Edit Date</v-btn>
    </template>
    <template>
      <v-container class="dialog">
        <v-layout>
          <v-flex xs12>
            <v-card-title color="primary" dark>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width: 100%">
              <template>
                <v-btn
                  class="blue--text darken-1"
                  text
                  @click.native="onSaveChanges"
                  >save</v-btn
                >
              </template>
            </v-date-picker>
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
      // dateToEdit: '',
      editableDate: '',
    };
  },

  created() {
    // this.editableDate = new Date(this.meetup.date);
  },

  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();

      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);

      console.log(newDate);

      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate,
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
