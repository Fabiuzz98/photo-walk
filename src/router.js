import Vue from 'vue';
import VueRouter from 'vue-router';

import home from './pages/HomePage.vue';
import meetupsList from './pages/MeetupsList.vue';
import meetupDetail from './pages/MeetupDetail.vue';
import createMeetup from './pages/CreateMeetup.vue';
import signUp from './pages/SignUp.vue';
import signIn from './pages/SignIn.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home, meta: { title: 'Home' } },
    {
      path: '/all-meetups',
      component: meetupsList,
      meta: { title: 'All Meetups' },
    },
    {
      path: '/meetup/:id/detail',
      component: meetupDetail,
      props: true,
      meta: { title: 'Meetup Detail' },
    },
    {
      path: '/create-meetup',
      component: createMeetup,
      meta: { title: 'Create Meetup' },
    },
    { path: '/sign-up', component: signUp, meta: { title: 'Sign Up' } },
    { path: '/sign-in', component: signIn, meta: { title: 'Sign In' } },
  ],
  mode: 'history',
});

router.afterEach((from, to) => {
  if (to.meta.title === undefined) {
    document.title = `Photowalk`;
  } else {
    document.title = `${to.meta.title} | Photowalk`;
  }
});

export default router;
