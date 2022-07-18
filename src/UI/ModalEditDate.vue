<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="350">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" small text v-bind="attrs" v-on="on">
          edit date
        </v-btn>
      </template>

      <v-card>
        <p class="font-weight-bold text-h5 py-3 mb-n1 text-center lighten-2">
          Edit Date
        </p>

        <v-date-picker
          class="date-editor mb-2"
          format="24hr"
          style="width: 100%"
          v-model="date"
        ></v-date-picker>

        <v-card-actions>
          <v-btn
            :disabled="!enableButton"
            color="primary"
            text
            @click="editDate"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['meetup'],
  data() {
    return {
      dialog: false,
      date: '',
    };
  },

  methods: {
    editDate() {
      const meetupDate = new Date(this.meetup.date);

      const hours = meetupDate.getHours();
      const minutes = meetupDate.getMinutes();

      const date = new Date(this.date);

      date.setHours(hours);
      date.setMinutes(minutes);

      this.$store.dispatch('meetupModule/updateMeetupsdate', {
        ...this.meetup,
        date: date,
      });

      this.dialog = false;
    },
  },

  computed: {
    enableButton() {
      if (this.date.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.date-editor {
  border-radius: 0;
}
</style>
