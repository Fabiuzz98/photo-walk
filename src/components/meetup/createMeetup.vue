<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-file-input
                accept="image/*"
                label="File input"
                @change="onFileChange"
              ></v-file-input>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150" />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a Data & Time</h4>
            </v-flex>
          </v-layout>

          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: '',
      time: new Date(),
      image: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);

      if (typeof this.time === 'string') {
        let hours = this.time.split(':')[0];
        const minutes = this.time.split(':')[1];

        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
  },
  methods: {
    onFileChange(event) {
      const file = event; //Restituisce un oggetto con dentro i file caricati (nel nostro caso 1 solo file immagine)

      let fileName = file.name; //Prendiamo il nome del file

      //Questo if controlla se il . è l'ultimo elemento ed in caso lo fose vuol dire che il file non ha estensione (in quanto lastIndexOf parte a contare dalla fine della stringa del nome e se il risutlato e <= 0 allora vuol dire che l'ultimo elemento del file)
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Upload a valid image');
      }

      const fileReader = new FileReader();

      //Questo ci serve per mettere la nostra img in formato base64 dentro imageUrl così da farne vedere una preview nel sito
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result; //Il 'result' è la nostra img: base64 (ovvero testo)
      });
      fileReader.readAsDataURL(file); //Trasformiamo il file binario in una stringa

      this.image = file;
    },

    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
      };
      this.$store.dispatch('createMeetup', meetupData);
      this.$router.push('/meetup-list');
    },
  },
};
</script>
