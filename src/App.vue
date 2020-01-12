<template>
  <div id="vue-nav-wheel">
    <input v-model.number="size" type="range" min="200" max="800" />
    <span>{{ size }}</span>
    <config
      v-bind="navWheelConfig.constants"
      :padAngle.sync="navWheelConfig.constants.padAngle"
      :spaceBetweenParentChild.sync="
        navWheelConfig.constants.spaceBetweenParentChild
      "
      :shrinkRouteScale.sync="navWheelConfig.constants.shrinkRouteScale"
      :scale.sync="navWheelConfig.constants.scale"
      :cornerSharpness.sync="navWheelConfig.constants.cornerSharpness"
      :startRadius.sync="navWheelConfig.constants.startRadius"
      :childAngleSpread.sync="navWheelConfig.constants.childAngleSpread"
    />
    <nav-wheel
      :size="size"
      :config="navWheelConfig"
      @route-change="addVisualLog({ key: Date.now(), entry: 'change route' })"
    >
      <template slot="center">
        <font-awesome-icon icon="address-card" :style="{ color: 'grey' }" />
      </template>
    </nav-wheel>
    <router-view></router-view>
    <ul>
      <li v-for="{ entry, key } in logs" :key="key">{{ entry }}</li>
    </ul>
  </div>
</template>

<script>
import NavWheel from "./components/nav-wheel.vue";
import Config from "./components/config.vue";
import routes from "./routes";
import navWheelConfig from "./nav-wheel-config";

export default {
  name: "vue-nav-wheel",
  components: {
    Config,
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
