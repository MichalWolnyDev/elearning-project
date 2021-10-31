import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import store from "./store";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";

import Quiz from "./views/Dashboard/Admin/Quiz.vue";
import Users from "./views/Dashboard/Admin/Users.vue";
import Students from "./views/Dashboard/Students.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      title: "Login Page",
      path: "/",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      title: 'Dashboard',
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/dashboard/admin/users",
          name: "users",
          component: Users,
          meta: {
            is_admin: true,
          }
        },
        {
          path: "/dashboard/admin/quiz",
          name: "quiz",
          component: Quiz,
          meta: {
            is_admin: true
          }

        },
        {
          path: "/dashboard/students",
          name: "students",
          component: Students
         

        }
      ]
    },
    
  
  ]
});



router.beforeEach((to, from, next) => {
  let user = store.getters.getUserInfo;

  console.log(user);
  console.log(store.getters);
  console.log(store.getters.getUserInfo);
  console.log(user);
  if (to.matched.some(record => {
    console.log(record);
   

    return record.meta.requiresAuth;
  })) {
      if (user == null) {
        next({
          path: '/',
          params: { nextUrl: to.fullPath }
        })
      } else {
        console.log(store.getters);
        console.log(user);
        if (to.matched.some(record => record.meta.is_admin)) {
          if (user.role == 'admin') {
            next({ name: 'dashboard' })
          } else {
            next()

          }
        } else {
          next()
        }
      }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (user == null) {

      next()
    } else {
      next({ name: 'dashboard' })
    }
  } else {
    next()
    
  }
})

export default router;