<template>
  <div>
    <h2>Demo styles</h2>
    <p>
      Classes use BEM styling, making them easy to override in plain CSS. The
      full list of classes can be found in the API, but this demo offers loading
      3 different style sheets to alter the route.
    </p>
    <button @click="activeStyleDemo = 1">1 - basic</button>
    <button @click="activeStyleDemo = 2">2 - per route styling</button>
    <button @click="activeStyleDemo = 3">3 - custom transitions</button>
    <button @click="isShowingCSS = !isShowingCSS">Toggle CSS</button>
    <component
      :is="`demo-styles-${activeStyleDemo}`"
      :is-showing-css="isShowingCSS"
    />
  </div>
</template>

<script>
import navWheelConfig from "../nav-wheel-config";
import routes from "../routes";
import DemoStyles1 from "./demo-styles-1";
import DemoStyles2 from "./demo-styles-2";
import DemoStyles3 from "./demo-styles-3";
export default {
  components: {
    DemoStyles1,
    DemoStyles2,
    DemoStyles3,
  },
  data() {
    return {
      navWheelConfig: {
        routes,
        ...navWheelConfig,
      },
      isShowingCSS: true,
      activeStyleDemo: 1,
    };
  },
};
</script>
