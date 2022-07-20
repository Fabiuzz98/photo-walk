<template>
  <v-container class="mx-auto signup">
    <modalDialog
      :title="title"
      :message="errorMsg"
      v-if="err"
      @close="closeModal"
    ></modalDialog>
    <v-form v-else ref="form" lazy-validation>
      <v-text-field v-model="email" label="Email" required></v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        required
      ></v-text-field>

      <v-btn color="primary" class="mr-4" @click="signIn"> Sign in </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      title: '',
      errorMsg: '',
      err: null,
    };
  },

  methods: {
    async signIn() {
      try {
        if (!this.email.includes('@') || this.password.trim().length < 6) {
          this.err = true;
          this.title = 'Authentication Error';
          this.errorMsg = 'Please insert a valid email and password';
          return;
        }

        await this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password,
        });

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
};
</script>

<style scoped>
.signup {
  max-width: 550px;
  padding: 5rem 2rem 2rem 2rem;
}
</style>
