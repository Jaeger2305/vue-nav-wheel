<template>
  <div>
    <p>Overriding of specific BEM classes, see the nav-wheel.css for the full list of classes.</p>
    <code-nav-wheel :isShowingCode="isShowingCss" :nav-wheel-config="navWheelConfig">
      <template slot="code">
        <pre>
        ::v-deep .nav-wheel__svg {
          background-color: rgb(195, 195, 195);
          stroke-width: 0.1%;
          border: solid black;
        }
        ::v-deep .nav-wheel__route-annular {
          fill: black;
          stroke: darkred;
        }
        ::v-deep .nav-wheel__route-annular:hover {
          transition-duration: 0.4s;
          fill: grey;
          stroke: black;
        }
        ::v-deep .nav-wheel__route-label {
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: 30px;
          font-weight: bold;
          fill: white;
        }
        ::v-deep .nav-wheel__route-label:hover {
          fill: grey;
          transition-duration: 0.2s;
          font-size: 26px;
        }
        ::v-deep .nav-wheel__route-ripple {
          fill: purple;
        }
      </pre>
      </template>
    </code-nav-wheel>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .nav-wheel__svg {
  background-color: rgb(195, 195, 195);
  stroke-width: 0.1%;
  border: solid black;
}
::v-deep .nav-wheel__route-annular {
  fill: black;
  stroke: darkred;
}
::v-deep .nav-wheel__route-annular:hover {
  transition-duration: 0.4s;
  fill: grey;
  stroke: black;
}
::v-deep .nav-wheel__route-label {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 30px;
  font-weight: bold;
  fill: white;
}
::v-deep .nav-wheel__route-label:hover {
  fill: grey;
  transition-duration: 0.2s;
  font-size: 26px;
}
::v-deep .nav-wheel__route-ripple {
  fill: purple;
}
</style>

<script>
import navWheelConfig from "../nav-wheel-config";
import routes from "../routes";
import CodeNavWheel from "./code-nav-wheel.vue";
export default {
  components: {
    CodeNavWheel
  },
  props: {
    isShowingCss: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      navWheelConfig: {
        routes,
        ...navWheelConfig
      }
    };
  }
};
</script>
