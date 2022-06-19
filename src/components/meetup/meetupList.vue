<template>
  <v-container>
    <v-layout row wrap mt-5>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"
                  height="155px"
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">My Meetup</h5>
                    <div>17th July 2017</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn text to="/meetup/1">
                    <v-icon left light>mdi-arrow-right</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
