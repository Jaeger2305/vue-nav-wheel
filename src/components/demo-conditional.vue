<template>
  <div>
    <h2>Demo conditional</h2>
    <p>Route annulars can be disabled or hidden, based on adding custom data to the route meta navWheel property. Here, route 1 is disabled, and route 2-1 is hidden.</p>
    <code-nav-wheel :nav-wheel-config="navWheelConfig">
      <template slot="code">
        <pre>{{ navWheelConfig.routes }}</pre>
      </template>
    </code-nav-wheel>
  </div>
</template>

<script>
import navWheelConfig from "../nav-wheel-config";
import CodeNavWheel from "./code-nav-wheel.vue";
export default {
  components: {
    CodeNavWheel
  },
  data() {
    return {
      navWheelConfig: {
        routes: [
          {
            name: "1",
            path: "/styles-2-1",
            component: {
              template: "<div></div>"
            },
            meta: { navWheel: { style: { stroke: "red" }, isDisabled: true } }
          },
          {
            name: "2",
            path: "/styles-2/2",
            component: {
              template: "<div></div>"
            },
            meta: {
              navWheel: {
                transitionName: "fade",
                style: { stroke: "yellow", fill: "purple" }
              }
            },
            children: [
              {
                name: "2-1",
                path: "/styles-2/2/1",
                component: {
                  template: "<div></div>"
                },
                meta: {
                  navWheel: { style: { stroke: "yellow" }, isHidden: true }
                }
              },
              {
                name: "2-2",
                path: "/styles-2/2/2",
                component: {
                  template: "<div></div>"
                }
              }
            ]
          }
        ],
        ...navWheelConfig
      }
    };
  }
};
</script>
