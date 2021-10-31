import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuex from "vuex";
import vuetify from '@/plugins/vuetify';

import store from "./store/"
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(vuex);
Vue.use(VueCookies)

Vue.prototype.$axios = axios;

new Vue({
  router,
  vuex,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");

