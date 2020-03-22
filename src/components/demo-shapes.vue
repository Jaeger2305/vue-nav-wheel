<template>
  <div>
    <h2>Demo shapes</h2>
    <p>
      The nav wheel config must be passed in as a parameter to the component,
      but it comes with several toggles to change the style of it.
    </p>
    <config
      v-bind="navWheelConfig.constants"
      :padAngle.sync="navWheelConfig.constants.padAngle"
      :spaceBetweenParentChild.sync="
        navWheelConfig.constants.spaceBetweenParentChild
      "
      :shrinkRouteScale.sync="navWheelConfig.constants.shrinkRouteScale"
      :cornerSharpness.sync="navWheelConfig.constants.cornerSharpness"
      :startRadius.sync="navWheelConfig.constants.startRadius"
      :childAngleSpread.sync="navWheelConfig.constants.childAngleSpread"
    />
    <code-nav-wheel :nav-wheel-config="navWheelConfig">
      <template slot="code">
        <pre>{{ omitRouteConfig() }}</pre>
      </template>
    </code-nav-wheel>
  </div>
</template>

<script>
import navWheelConfig from "../nav-wheel-config";
import routes from "../routes";
import Config from "./config.vue";
import CodeNavWheel from "./code-nav-wheel.vue";
export default {
  components: {
    Config,
    CodeNavWheel,
  },
  data() {
    return {
      navWheelConfig: {
        routes,
        ...navWheelConfig,
      },
    };
  },
  methods: {
    omitRouteConfig() {
      const { routes, ...rest } = navWheelConfig;
      return rest;
    },
  },
};
</script>
