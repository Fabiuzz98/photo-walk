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
    { path: '/home', component: home },
    { path: '/all-meetups', component: meetupsList },
    { path: '/meetup/:id/detail', component: meetupDetail, props: true },
    { path: '/create-meetup', component: createMeetup },
    { path: '/sign-up', component: signUp },
    { path: '/sign-in', component: signIn },
  ],
  mode: 'history',
});

export default router;
