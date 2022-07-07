<template>
  <v-app>
    <div class="app-container">
      <navigation-bar></navigation-bar>

      <main>
        <router-view></router-view>
      </main>
    </div>
  </v-app>
</template>

<script>
import navigationBar from './components/NavigationBar.vue';
export default {
  components: { navigationBar },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

body {
  min-height: 100vh;
}

.app-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
