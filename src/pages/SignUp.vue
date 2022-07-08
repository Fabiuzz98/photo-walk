<template>
  <v-container class="mx-auto signup">
    <modalDialog
      :title="title"
      :message="errorMsg"
      v-if="err"
      @close="closeModal"
    ></modalDialog>

    <v-form ref="form" class="form" lazy-validation>
      <v-text-field v-model="email" label="Email" required></v-text-field>

      <v-text-field v-model="password" label="Password" required></v-text-field>

      <v-text-field
        v-model="validatePassword"
        label="Confirm Password"
        required
      ></v-text-field>

      <v-btn color="primary" class="mr-4" @click="signUp"> Sign Up </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      validatePassword: '',
      title: '',
      errorMsg: '',
      err: null,
    };
  },

  computed: {
    checkPsw() {
      if (
        this.password.trim() !== this.validatePassword.trim() ||
        this.password.trim().length < 6
      )
        return false;
      else return true;
    },
  },

  methods: {
    async signUp() {
      if (!this.email.includes('@')) {
        this.err = true;
        this.title = 'Email Error';
        this.errorMsg = 'Please insert a valid email';
      } else if (!this.checkPsw) {
        this.err = true;
        this.title = 'Password Error';
        this.errorMsg =
          'Please insert a password long at least 6 characters and equal passwords';
      } else {
        try {
          await this.$store.dispatch('signUp', {
            email: this.email,
            password: this.password,
          });
          this.$router.replace('/');
        } catch (err) {
          this.err = true;
          this.errorMsg = err.message;
        }
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
