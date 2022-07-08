<template>
  <header>
    <div class="navigation-menu--desktop" v-if="!isMobile">
      <v-btn text class="logo navigation-item" to="/">PhotoWalk</v-btn>
      <nav>
        <li v-for="nav in navLinks" :key="nav.name">
          <v-btn text :to="nav.link" class="navigation-name--desktop">
            <v-icon class="icon-desktop">{{ nav.icon }}</v-icon>
            {{ nav.name }}
          </v-btn>
        </li>
        <li class="logout--desktop" v-if="isLoggedIn">
          <v-btn text class="navigation-name--desktop" to="/" @click="logout">
            <v-icon class="icon-descktop"> mdi-logout </v-icon>
            Logout
          </v-btn>
        </li>
      </nav>
    </div>

    <div v-else>
      <div class="backdrop" @click="toggleSideMenu" v-if="isOpen"></div>
      <div class="header-mobile">
        <v-icon class="hamburger" @click="toggleSideMenu">{{
          'mdi-menu'
        }}</v-icon>
        <div class="logo-mobile">PhotoWalk</div>

        <div class="navigation-menu--mobile" v-if="isOpen">
          <ul
            class="navigation-mobile-list"
            v-for="nav in navLinks"
            :key="nav.name"
          >
            <v-btn
              text
              class="navigation-item"
              :to="nav.link"
              @click="toggleSideMenu"
            >
              <v-icon class="icon-mobile">{{ nav.icon }}</v-icon>
              <p class="navigation-name">{{ nav.name }}</p>
            </v-btn>
          </ul>
          <div class="navigation-mobile-list logout" v-if="isLoggedIn">
            <v-btn text class="navigation-item" to="/" @click="logout">
              <v-icon class="icon-mobile"> mdi-logout </v-icon>
              <p class="navigation-name">Logout</p>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      isOpen: null,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters['isLoggedIn'];
    },

    navLinks() {
      let menuItems = [
        {
          name: 'View Meetups',
          icon: 'mdi-account-supervisor',
          link: '/all-meetups',
        },
        { name: 'Sign up', icon: 'mdi-face-man', link: '/sign-up' },
        { name: 'Sign in', icon: 'mdi-lock-open', link: '/sign-in' },
      ];

      if (this.isLoggedIn) {
        menuItems = [
          {
            name: 'View Meetups',
            icon: 'mdi-account-supervisor',
            link: '/all-meetups',
          },
          {
            name: 'Organize Meetup',
            icon: 'mdi-map-marker',
            link: '/create-meetup',
          },
        ];
      }

      return menuItems;
    },
  },

  methods: {
    checkScreenWidth() {
      if (window.innerWidth <= 750) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
        this.isOpen = null;
      }
    },

    toggleSideMenu() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    },

    logout() {
      this.$store.dispatch('logout');
      this.isOpen = !this.isOpen;
    },
  },

  created() {
    window.addEventListener('resize', this.checkScreenWidth);
    this.checkScreenWidth();
  },
};
</script>

<style scoped lang="scss">
header {
  position: relative;

  .navigation-menu--desktop {
    display: flex;
    justify-content: space-between;
    padding: 0 3rem;
    background-color: #8e24aa;
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.404);
    border-radius: 5px;

    .logo {
      text-transform: capitalize;
      font-size: 1.2rem;
      cursor: pointer;
      margin-top: 1.2rem;
      transition: all 0.3s;
      color: white;

      &:hover {
        background-color: #993ab3;
      }
    }

    nav {
      display: flex;
      list-style: none;

      li {
        cursor: pointer;
        padding: 1.2rem 0.8rem;
        transition: all 0.3s;
        display: flex;

        .icon-desktop {
          color: #fff;
        }
        .navigation-name--desktop {
          color: white;
        }
      }
    }
  }

  .navigation-name--desktop.v-btn--active::before {
    opacity: 0;
  }

  .navigation-name--desktop.v-btn--hover::before {
    opacity: 1;
  }

  .navigation-item.v-btn--active::before {
    opacity: 0;
  }

  .navigation-item.v-btn--hover::before {
    opacity: 1;
  }

  .backdrop {
    background-color: rgba(0, 0, 0, 0.705);
    position: absolute;
    min-width: 100%;
    min-height: 100vh;
    z-index: 9;
  }

  .header-mobile {
    height: 3rem;
    background-color: #8e24aa;
    box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.404);
    border-radius: 5px;
    display: flex;

    .logo-mobile {
      margin: 0 auto 0 auto;
      align-self: center;
      padding-right: 3rem;
      color: #fff;
      font-size: 1.2rem;
    }
    .hamburger {
      cursor: pointer;
      align-self: center;
      margin-left: 2rem;
      color: #fff;
    }
  }

  .navigation-menu--mobile {
    position: fixed;
    left: 0rem;
    top: 0rem;
    background-color: #8e24aa;
    border-radius: 5px;
    z-index: 9;
    min-width: 65%;
    min-height: 100%;
    padding-top: 4rem;

    .logout {
      margin-left: 1.5rem;
    }

    .navigation-mobile-list {
      list-style: none;
      color: white;
      padding-right: 2.4rem;

      .navigation-item {
        color: white;
        margin-bottom: 1.5rem;
        text-transform: uppercase;

        font-size: 1rem;
        border-bottom: 0.5px solid white;
        display: flex;
        cursor: pointer;

        .icon-mobile {
          color: #fff;
          margin-right: 0.5rem;
          padding: 0;
        }

        .navigation-name {
          margin: 0;
        }
      }
    }
  }
}
</style>
