<template>
  <div>
    <v-app>
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
      v-model="drawer"
            app
      >
       <SideMenu />
      
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>

import SideMenu from "@/components/dashboard/SideMenu.vue";

export default {
  name: "dashboard",
  components: {
    SideMenu
  },
  data: () => ({
    drawer: true
  })
};
</script>
