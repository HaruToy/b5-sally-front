import Vue from 'vue';
import App from './App.vue';
import { store } from "./store";
// eslint-disable-next-line import/extensions
import router from "./router/index.js"

Vue.config.productionTip = false
new Vue({
  el:'#app',

  store,
  router,
  render: h => h(App),
})

