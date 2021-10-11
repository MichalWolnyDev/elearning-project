import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuex from "vuex";
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  vuex,
  vuetify,
  render: h => h(App)
}).$mount("#app");
