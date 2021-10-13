<template>
  <div>
    <v-app>
      <v-app-bar app color="green">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer app> test </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "dashboard",
};
</script>
