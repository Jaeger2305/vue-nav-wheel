import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faChild,
  faCircle,
  faArchive,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import routes from "./routes";

library.add(faCoffee, faChild, faCircle, faArchive, faAddressCard);
Vue.component("font-awesome-icon", FontAwesomeIcon);

const router = new VueRouter({
  routes
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#vue-nav-wheel");
