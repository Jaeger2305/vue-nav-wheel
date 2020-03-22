<template>
  <div>
    <h2>Demo slot</h2>
    <p>
      A single slot is available for the center position. This must be an SVG,
      and it must be a single element. It can be wrapped in a "g" tag. The
      element will be scaled to match the available space in the center.
    </p>
    <div class="simple-flex">
      <pre class="codebox">{{ code }}</pre>
      <nav-wheel :size="600" :config="navWheelConfig">
        <template slot="center">
          <g>
            <g transform="rotate(10), translate(1000, -150), scale(-0.5, 0.5)">
              <font-awesome-icon icon="coffee" :style="{ color: 'blue' }" />
            </g>
            <g transform="rotate(-10), translate(10, 0), scale(0.5, 0.5)">
              <font-awesome-icon icon="coffee" :style="{ color: 'blue' }" />
            </g>
            <g transform="translate(200, 0)">
              <font-awesome-icon icon="child" :style="{ color: 'green' }" />
            </g>
          </g>
        </template>
      </nav-wheel>
    </div>
  </div>
</template>

<script>
import navWheelConfig from "../nav-wheel-config";
import routes from "../routes";
import NavWheel from "./nav-wheel.vue";
export default {
  components: {
    NavWheel,
  },
  data() {
    return {
      navWheelConfig: {
        routes,
        ...navWheelConfig,
      },
      code: `<nav-wheel :size="600" :config="navWheelConfig">
  <template slot="center">
    <g>
      <g transform="rotate(10), translate(1000, -15 0), scale(-0.5, 0.5)">
        <font-awesome-icon icon="coffee" :style="{ color: 'blue' }" />
      </g>
      <g transform="rotate(-10), translate(10, 0), scale(0.5, 0.5)">
        <font-awesome-icon icon="coffee" :style="{ color: 'blue' }" />
      </g>
      <g transform="translate(200, 0)">
        <font-awesome-icon icon="child" :style="{ color: 'green' }" />
      </g>
    </g>
  </template>
</nav-wheel>`,
    };
  },
};
</script>
