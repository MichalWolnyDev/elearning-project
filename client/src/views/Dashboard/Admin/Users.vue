<template>
  <div>
    <v-container class="spacing-playground pa-6" fluid>
        <AddUser v-model="showUserForm"/>
      <v-row v-if="showList">
        <v-card
          v-for="(user, id) in getUserList"
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
                <v-btn elevation="2" icon v-bind="attrs" v-on="on" @click="deleteUser(id)">
                  <v-icon v-text="'mdi-delete'"></v-icon>
                </v-btn>
              </template>
               <span>Usuń</span>
            </v-tooltip>
          </div>
        </v-card>
      </v-row>
      <Loader v-else />
    </v-container>
  </div>
</template>

<script>
import AddUser from "@/components/dashboard/AddUser.vue";
import Loader from "@/components/Loader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "users",
  components: {
    AddUser,
    Loader
  },
  data: () => ({
    users: [],
    showUserForm: false,
    showList: false,
  }),
  computed: {
    ...mapGetters(["getUserList"]),
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    async deleteUser(id){
      // var _this = this;
      await this.$http.delete('/api/user/delete/' + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  mounted(){
    var _this = this;
    this.fetchUsers();

    setTimeout(function(){
      _this.showList = true;
    }, 2000)
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