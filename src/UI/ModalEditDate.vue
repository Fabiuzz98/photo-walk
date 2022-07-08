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
        ></v-date-picker>

        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false"> save </v-btn>
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
    };
  },
};
</script>

<style scoped>
.date-editor {
  border-radius: 0;
}
</style>
