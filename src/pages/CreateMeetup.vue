<template>
  <v-card flat max-width="800" class="mx-auto mt-10 mb-10">
    <modalDialog
      :title="titleDialog"
      :message="errorMsg"
      v-if="err"
      @close="closeModal"
    ></modalDialog>
    <v-form v-else @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="title"
              color="purple darken-2"
              label="Title"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="location"
              color="blue darken-2"
              label="Location"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="description" color="teal">
              <template v-slot:label>
                <div>Description</div>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12 mb-5">
            <v-file-input v-model="file" label="File input"></v-file-input>
          </v-col>

          <v-col class="date-time-picker">
            <v-time-picker
              v-model="time"
              class="date-picker"
              format="24hr"
            ></v-time-picker>
            <v-date-picker v-model="date"></v-date-picker>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click="emptyAll"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!ableSubmit" color="primary" type="submit">
          Create meetup
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      description: '',
      file: [],
      date: '',
      time: '',
      err: null,
      errorMsg: '',
    };
  },

  methods: {
    emptyAll() {
      this.title = '';
      this.location = '';
      this.description = '';
      this.file = [];
      this.date = '';
      this.time = '';
    },

    async submit() {
      try {
        const meetup = {
          title: this.title,
          location: this.location,
          description: this.description,
          image: this.file,
          date: this.setTimeDate,
        };

        //Chiamare metodo per inviare l'oggetto allo store in Meetups e fare poi il la fetch call al DB
        await this.$store.dispatch('meetupModule/createMeetup', meetup);
        this.$router.replace('/');
      } catch (err) {
        this.err = true;
        this.errorMsg = err;
      }
    },

    closeModal() {
      this.err = false;
    },
  },

  computed: {
    setTimeDate() {
      const date = new Date(this.date);

      const hour = this.time.split(':')[0];
      const minutes = this.time.split(':')[1];

      date.setHours(hour);
      date.setMinutes(minutes);

      return date;
    },

    ableSubmit() {
      if (
        this.title !== '' &&
        this.location !== '' &&
        this.description !== '' &&
        this.file.length !== 0 &&
        this.date !== '' &&
        this.time !== ''
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.date-time-picker {
  display: flex;
  justify-content: space-around;
  @media (max-width: 650px) {
    flex-direction: column;
  }

  .date-picker {
    @media (max-width: 650px) {
      margin-bottom: 3rem;
    }
  }
}
</style>
