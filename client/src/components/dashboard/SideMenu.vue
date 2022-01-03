<template>
  <v-card
    class="mx-auto"
    height="100%"
    tile
  >
      <v-list>
        <v-list-item :to="dashboardMain">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ currentUser.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.role }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>

          
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon v-text="'mdi-logout'"></v-icon>
            </v-list-item-icon>
             <v-list-item-content>
              <v-list-item-title >Wyloguj</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
  export default {
    data: () => ({
      selectedItem: 0,
      dashboardMain: "/dashboard",
      items: [
        { text: 'Użytkownicy', icon: 'mdi-account-multiple', link: '/dashboard/admin/users'},
        { text: 'Quizy', icon: 'mdi-file-document', link: '/dashboard/quiz' },
        // { text: 'Students', icon: 'mdi-file-document', link: '/dashboard/students' },
      ],
    }),
    computed: {
      currentUser(){
        return this.$store.getters.getUserInfo;
      }
    },
    methods: {
      ...mapActions(["clearUser"]),
      logout(){
        // var t = this;

        this.$http.get('/api/user/logout')
        .then((res) => {
          console.log(res);
           this.$router.push("/");
           this.clearUser();

        })
        .catch((err) =>{
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped>
.v-list-item--link:before{
  background-color: transparent;
}
</style>