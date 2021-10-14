import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";

import Quiz from "./views/Dashboard/Admin/Quiz.vue";
import Users from "./views/Dashboard/Admin/Users.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      title: "Login Page",
      path: "/",
      name: "login",
      component: Login
    },
    {
      title: 'Dashboard',
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "/dashboard/admin/users",
          name: "users",
          component: Users
        },
        {
          path: "/dashboard/admin/quiz",
          name: "quiz",
          component: Quiz
        }
      ]
    },
    
  
  ]
});
