<template>
  <v-container class="mx-auto signup">
    <v-form ref="form" lazy-validation>
      <v-text-field v-model="email" label="Email" required></v-text-field>

      <v-text-field v-model="password" label="Password" required></v-text-field>

      <v-btn color="primary" class="mr-4"> Sign in </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

<style scoped>
.signup {
  max-width: 550px;
  padding: 5rem 2rem 2rem 2rem;
}
</style>
