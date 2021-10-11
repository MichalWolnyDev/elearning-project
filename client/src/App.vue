<template>
    <v-app>

        <v-app-bar app color="green">

           <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <!-- -->
      </v-app-bar>
      <v-navigation-drawer app>
        <!-- -->
      </v-navigation-drawer>

    

      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
        blablabla
      </v-footer>
    </v-app>
</template>

<style>
</style>
