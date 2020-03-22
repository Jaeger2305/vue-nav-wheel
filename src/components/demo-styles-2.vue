<template>
  <div>
    <p>
      The route meta property can have a custom configuration to style some
      basic properties, including stroke and fill of the annulars. The CSS for
      this demo also shows changing the fill for each level in the hierarchy
    </p>
    <code-nav-wheel
      :isShowingCode="isShowingCss"
      :nav-wheel-config="navWheelConfig"
    >
      <template slot="code">
        <pre>
        ::v-deep .nav-wheel__route-annular-0 {
          fill: #002c00;
        }
        ::v-deep .nav-wheel__route-annular-1 {
          fill: #004700;
        }
        ::v-deep .nav-wheel__route-annular-2 {
          fill: #016d06;
        }
        ::v-deep .nav-wheel__route-annular-3 {
          fill: #03a80b;
        }
        ::v-deep .nav-wheel__route-label {
          filter: url(#dropshadow);
          fill: white;
          stroke: black;
          font-weight: bold;
        }
      </pre
        >
        <pre>
        routes: [
          {
            name: "1",
            path: "/styles-2-1",
            component: {
              template: "<div></div>"
            },
            meta: { navWheel: { style: { stroke: "red" } } }
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
                meta: { navWheel: { style: { stroke: "yellow" } } },
                children: [
                  {
                    name: "2-1-1",
                    path: "/styles-2/1/1",
                    component: {
                      template: "<div></div>"
                    },
                    meta: { navWheel: { style: { stroke: "yellow" } } },
                    children: [
                      {
                        name: "2-1-1-1",
                        path: "/styles-2/2/1/1/1",
                        component: {
                          template: "<div></div>"
                        },
                        meta: { navWheel: { style: { stroke: "yellow" } } }
                      },
                      {
                        name: "2-1-1-2",
                        path: "/styles-2/2/1/1/2",
                        component: {
                          template: "<div></div>"
                        },
                        meta: { navWheel: { style: { stroke: "yellow" } } }
                      }
                    ]
                  }
                ]
              },
              {
                name: "2-2",
                path: "/styles-2/2/2",
                component: {
                  template: "<div></div>"
                }
              },
              {
                name: "2-3",
                path: "/styles-2/2/3",
                component: {
                  template: "<div></div>"
                }
              }
            ]
          }
        ],
      </pre>
      </template>
    </code-nav-wheel>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .nav-wheel__route-annular-0 {
  fill: #002c00;
}
::v-deep .nav-wheel__route-annular-1 {
  fill: #004700;
}
::v-deep .nav-wheel__route-annular-2 {
  fill: #016d06;
}
::v-deep .nav-wheel__route-annular-3 {
  fill: #03a80b;
}
::v-deep .nav-wheel__route-label {
  filter: url(#dropshadow);
  fill: white;
  stroke: black;
  font-weight: bold;
}
</style>

<script>
import navWheelConfig from "../nav-wheel-config";
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
        routes: [
          {
            name: "1",
            path: "/styles-2-1",
            component: {
              template: "<div></div>",
            },
            meta: { navWheel: { style: { stroke: "red" } } },
          },
          {
            name: "2",
            path: "/styles-2/2",
            component: {
              template: "<div></div>",
            },
            meta: {
              navWheel: {
                transitionName: "fade",
                style: { stroke: "yellow", fill: "purple" },
              },
            },
            children: [
              {
                name: "2-1",
                path: "/styles-2/2/1",
                component: {
                  template: "<div></div>",
                },
                meta: { navWheel: { style: { stroke: "yellow" } } },
                children: [
                  {
                    name: "2-1-1",
                    path: "/styles-2/1/1",
                    component: {
                      template: "<div></div>",
                    },
                    meta: { navWheel: { style: { stroke: "yellow" } } },
                    children: [
                      {
                        name: "2-1-1-1",
                        path: "/styles-2/2/1/1/1",
                        component: {
                          template: "<div></div>",
                        },
                        meta: { navWheel: { style: { stroke: "yellow" } } },
                      },
                      {
                        name: "2-1-1-2",
                        path: "/styles-2/2/1/1/2",
                        component: {
                          template: "<div></div>",
                        },
                        meta: { navWheel: { style: { stroke: "yellow" } } },
                      },
                    ],
                  },
                ],
              },
              {
                name: "2-2",
                path: "/styles-2/2/2",
                component: {
                  template: "<div></div>",
                },
              },
              {
                name: "2-3",
                path: "/styles-2/2/3",
                component: {
                  template: "<div></div>",
                },
              },
            ],
          },
        ],
        ...navWheelConfig,
      },
    };
  },
};
</script>
