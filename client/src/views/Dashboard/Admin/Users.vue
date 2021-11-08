<template>
  <div>
    <v-container class="spacing-playground pa-6" fluid>
        <AddUser v-model="showUserForm"/>
      <v-row>
        <v-card
          v-for="(user, id) in users"
          :key="id"
          class="d-flex justify-space-between align-center pa-6 mb-6"
          width="100%"
        >
          <div>
            <p class="users__role">
              Rola: <span :class="{'admin': user.role === 'admin', 'teacher': user.role === 'teacher'}">{{ user.role }}</span>
            </p>
            <p class="users__name">
              {{ user.firstName }} {{ user.lastName }}
            </p>
            <p class="users__email">
              e-mail: {{ user.email }}
            </p>
          
          </div>
          <div class="d-flex">
            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="2"
                  icon
                  class="mr-4"
                  v-bind="attrs"
                  v-on="on"
                ></v-btn>
              </template>
              <span>Something</span>
            </v-tooltip> -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn elevation="2" icon v-bind="attrs" v-on="on">
                  <v-icon v-text="'mdi-delete'"></v-icon>
                </v-btn>
              </template>
               <span>Usuń</span>
            </v-tooltip>
          </div>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddUser from "@/components/dashboard/AddUser.vue";


export default {
  name: "users",
  components: {
    AddUser
  },
  data: () => ({
    users: [],
    showUserForm: false,
  }),
  methods: {
    async fetchUsers(){
      var _this = this;
      await this.$http.get('/api/usersList')
      .then((res) => {
        _this.users = res.data;

        console.log(_this.users);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  mounted(){
    this.fetchUsers();
  }
};
</script>

<style lang="scss" scoped>
.users{

  &__role{
    margin-bottom: 0;
    font-size: 12px;
    color: #cecece;

   span{
      &.admin{
      color: red;
    }
      &.teacher{
      color: green;
    }
      
   }
  }
  &__name{
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0;
  }

}
</style>