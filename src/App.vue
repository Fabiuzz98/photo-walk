<template>
  <v-app>
    <v-card>
      <v-toolbar dark class="primary">
        <v-app-bar-nav-icon
          @click.stop="sideNav = !sideNav"
          class="d-md-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>MeetupApp</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-md-flex">
          <v-btn text>
            <v-icon left>mdi-account-supervisor</v-icon>
            view Meetups
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>

    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account-supervisor</v-icon>
          </v-list-item-action>
          <v-list-item-content> View meetups </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <main></main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
    };
  },
};
</script>

<style lang="scss"></style>
