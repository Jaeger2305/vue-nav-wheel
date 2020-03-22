<template>
  <div>
    <h2>Demo functionality</h2>
    <p>
      Some config values change the functionality of the nav wheel, changing how
      to view and navigate the wheel. These values are largely useful to give a
      more focused display if there isn't much screen space.
    </p>
    <config-functionality
      v-bind="navWheelConfig.constants"
      :isPanOnSelectEnabled.sync="navWheelConfig.constants.isPanOnSelectEnabled"
      :isPanOnMouseMoveEnabled.sync="
        navWheelConfig.constants.isPanOnMouseMoveEnabled
      "
      :hierarchyLevelsDisplayLimit.sync="
        navWheelConfig.constants.hierarchyLevelsDisplayLimit
      "
      :hierarchyLevelFocus.sync="navWheelConfig.constants.hierarchyLevelFocus"
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
import ConfigFunctionality from "./config-functionality.vue";
import CodeNavWheel from "./code-nav-wheel.vue";
export default {
  components: {
    ConfigFunctionality,
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
