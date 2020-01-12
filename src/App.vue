<template>
  <div id="vue-nav-wheel">
    <input v-model.number="size" type="range" min="200" max="800" />
    <span>{{ size }}</span>
    <nav-wheel
      :size="size"
      :config="navWheelConfig"
      @route-change="addVisualLog({key: Date.now(), entry: 'change route'})"
    >
      <template slot="center">
        <font-awesome-icon icon="address-card" :style="{ color: 'grey' }" />
      </template>
    </nav-wheel>
    <router-view></router-view>
    <ul>
      <li v-for="{entry, key} in logs" :key="key">{{ entry }}</li>
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
      size: 600,
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
