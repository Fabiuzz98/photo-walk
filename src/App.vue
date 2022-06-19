<template>
  <v-app>
    <v-card>
      <v-toolbar dark class="primary">
        <v-app-bar-nav-icon
          @click.stop="sideNav = !sideNav"
          class="d-md-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link
            to="/"
            style="cursor: pointer; color: white; text-decoration: none"
            >MeetupApp
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-md-flex">
          <v-btn
            text
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>

    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        {
          icon: 'mdi-account-supervisor',
          title: 'View Meetups',
          link: '/meetup-list',
        },
        {
          icon: 'mdi-map-marker',
          title: 'Organize Meetup',
          link: '/create-new-meetup',
        },
        { icon: 'mdi-account', title: 'Profile', link: '/profile' },
        { icon: 'mdi-face-man', title: 'Sign Up', link: '/signup' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
