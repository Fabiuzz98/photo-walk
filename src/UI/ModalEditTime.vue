<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="350">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" small text v-bind="attrs" v-on="on">
          edit time
        </v-btn>
      </template>

      <v-card>
        <p class="font-weight-bold text-h5 py-3 mb-n1 text-center lighten-2">
          Edit Time
        </p>

        <v-time-picker
          class="time-editor mb-2"
          format="24hr"
          style="width: 100%"
          v-model="time"
        ></v-time-picker>

        <v-card-actions>
          <v-btn
            color="primary"
            :disabled="!enableButton"
            text
            @click="editTime"
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
      time: '',
    };
  },

  methods: {
    editTime() {
      const date = new Date(this.meetup.date);
      if (this.time.length < 0) return;

      const hours = this.time.split(':')[0];
      const minutes = this.time.split(':')[1];

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
      if (this.time.length > 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.time-editor {
  border-radius: 0;
}
</style>
