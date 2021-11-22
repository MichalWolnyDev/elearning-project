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
  base: process.env.BASE_URL,
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
        requiresAuth: true,
        is_admin: false
      },
      children: [
        {
          path: "/dashboard/admin/users",
          name: "users",
          component: Users,
          meta: {
            requiresAuth: true,
            is_admin: true,
          }
        },
        {
          path: "/dashboard/admin/quiz",
          name: "quiz",
          component: Quiz,
          meta: {
            requiresAuth: true,
            is_admin: true
          }

        },
        {
          path: "/dashboard/students",
          name: "students",
          component: Students,
          meta: {
            requiresAuth: true,
            is_admin: false
          }


        }
      ]
    },


  ]
});


router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    await store.dispatch("userProfile");
    var userProfile = store.getters["getUserInfo"];

    if (userProfile.error == true) {
      return next({ path: "/" });
    } 
    else {
      if (userProfile.isAuth === false) {
        return next({ path: "/login" });
      } else {
        if (to.meta.is_admin) {
          if (userProfile.role == 'admin') {
  
            return next();
          } else {
            return next({ path: "/dashboard" })
          }
        } else {
          return next();
        }
      }
    }
   
  } else {
    return next();
  }

});


export default router;