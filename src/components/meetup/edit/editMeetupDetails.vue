<template>
  <v-dialog transition="dialog-bottom-transition" width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab accent v-bind="attrs" v-on="on"
        ><v-icon>mdi-pencil</v-icon></v-btn
      >
    </template>
    <template>
      <v-container class="dialog">
        <v-layout>
          <v-flex xs12>
            <v-card-title color="primary" dark>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required
              ></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="editedDescription"
                required
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn text class="blue--text darken-1" @click="onSaveChanges"
                >Save</v-btn
              >
            </v-card-actions>
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === '' ||
        this.editedDescription.trim() === ''
      ) {
        return;
      }

      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
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
