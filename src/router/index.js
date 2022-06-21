import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/homePage.vue';
import createMeetup from '../components/meetup/createMeetup.vue';
import meetupList from '@/components/meetup/meetupList.vue';
import meetupDetail from '@/components/meetup/meetupDetail.vue';
import profile from '../components/user/profilePage.vue';
import signUp from '../components/user/signUp.vue';
import signIn from '../components/user/signIn.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/create-new-meetup',
      component: createMeetup,
    },
    {
      path: '/meetup/:id',
      component: meetupDetail,
      props: true,
    },
    {
      path: '/meetup-list',
      component: meetupList,
    },

    {
      path: '/profile',
      component: profile,
    },
    {
      path: '/signup',
      component: signUp,
    },
    {
      path: '/signin',
      component: signIn,
    },
  ],

  mode: 'history',
});

export default router;
