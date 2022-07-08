<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="340">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary mt-10" small v-bind="attrs" v-on="on">
          filter photowalks
        </v-btn>
      </template>

      <v-card>
        <p class="font-weight-bold text-h5 py-3 mb-n1 text-center lighten-2">
          Choose Dates
        </p>

        <v-col>
          <v-date-picker
            class="date-picker mb-2"
            style="width: 100%"
            v-model="dates"
            range
          ></v-date-picker>
        </v-col>

        <v-card-actions>
          <v-btn color="primary" text @click="applyFilter"> apply </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dates: [],
    };
  },

  methods: {
    applyFilter() {
      this.dialog = false;
      this.$emit('getDates', this.dates);
    },
  },
};
</script>

<style scoped>
.date-picker {
  border-radius: 0;
}
</style>
