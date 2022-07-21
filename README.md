# photoWalks

BUILT WITH: <br>
This application is fully responsive and has been made with Vue-js, vuetify, vuex, vue-router, HTML, SCSS and Firebase for the backend.

<br>

DESCRIPTION OF THE APP: <br>
This App was created for photographers that want to connect and have a day shoot together.<br>
If a user is not authenticated, it's possible to have a look at the list of meetups and their details but in order to register in any of them it's necessary to create an account and sign in, therefore this app is implemented with sign in and sign up. Furthermore if a user is authenticated can then create a meetup with info such as title, time, location, description, date and upload a cover picture fot the meetup. The uploaded image is then stored in a database that sends back a url pointing to the memory slot that will be stored in another part of the db to then allow its rendering. Moreover, the user that creates the meetup can afterwards modify its time and date but can't register to it. Only users that are not creators of a meetup and are logged in can register to it but on the other hand only users that are creators and are logged in can then edit the time and date.<br>
Every user authenticated or not can access the meetups list and filter them by date. <br>
Each action the user does that modifies a meetup, creates a new one or is related to registrations and so on will be also applied to the database hence at the reload of a page or after logging/signin in and out, every modification applied will be shown and restored from the databse.<br>
Here are 2 already created accounts to authenticate with and try yourself all the features based on the type of account you login with:<br>
mail:test@test.com psw:tester, mail:test2@test.com psw:tester<br>

MORE ABOUT THE APP: <br>
This app is implemented with carousel, calendars, clocks thanks to vuetify and has many features as authentication, registration and editing of meetups, filters by date and many more.
The app is FULLY RESPONSIVE, provided with error handling that will be shown in modals. <br>
Thanks to Vue js, the app uses components, routing, vuex, vuetify and SDK commands to interact with Firebase where all the data from the user to the modification applied to the picture uploaded will be stored.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
