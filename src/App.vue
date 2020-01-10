<template>
  <div id="vue-nav-wheel">
    <nav-wheel :config="navWheelConfig" @route-change="addVisualLog('change route')" />
    <router-view></router-view>
    <ul>
      <li v-for="log in logs" :key="log">{{ log }}</li>
    </ul>
  </div>
</template>

<script>
import NavWheel from "./components/nav-wheel.vue";
import routes from "./routes";
import navWheelConfig from "./nav-wheel-config";

export default {
  name: "vue-nav-wheel",
  components: {
    NavWheel
  },
  data() {
    return {
      logs: [],
      navWheelConfig: {
        routes,
        ...navWheelConfig
      }
    };
  },
  methods: {
    addVisualLog(entry) {
      this.logs.push(entry);
    }
  }
};
</script>
