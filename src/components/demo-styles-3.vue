<template>
  <div>
    <p>
      Using Vue's transition classes, a custom entry animation can be created.
      This shows a simple fly in and out of the routes.
    </p>
    <code-nav-wheel
      :isShowingCode="isShowingCss"
      :nav-wheel-config="navWheelConfig"
    >
      <template slot="code">
        <pre>
        ::v-deep .fly-in-left-enter-active,
        ::v-deep .fly-in-left-leave-active {
          transition: 1s ease-out;
          transform: translate(0, 0);
        }
        ::v-deep .fly-in-left-enter {
          transform: translate(-200%, 0);
        }
        ::v-deep .fly-in-left-leave-to {
          transform: translate(200%, 0);
        }
      </pre
        >
      </template>
    </code-nav-wheel>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .fly-in-left-enter-active,
::v-deep .fly-in-left-leave-active {
  transition: 1s ease-out;
  transform: translate(0, 0);
}
::v-deep .fly-in-left-enter {
  transform: translate(-200%, 0);
}
::v-deep .fly-in-left-leave-to {
  transform: translate(200%, 0);
}
</style>

<script>
import navWheelConfig from "../nav-wheel-config";
import routes from "../routes";
import CodeNavWheel from "./code-nav-wheel.vue";
export default {
  components: {
    CodeNavWheel,
  },
  props: {
    isShowingCss: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      navWheelConfig: {
        routes,
        ...navWheelConfig,
        constants: {
          ...navWheelConfig.constants,
          defaultTransition: "fly-in-left",
        },
      },
    };
  },
};
</script>
