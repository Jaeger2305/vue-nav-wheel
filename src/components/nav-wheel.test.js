import { shallowMount } from "@vue/test-utils";
import NavWheel from "./nav-wheel.vue";
import baseConfig from "../nav-wheel-config";

const testConfig = {
  ...baseConfig,
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
  ]
};

describe("nav-wheel.vue", () => {
  // Basic functionality
  it("renders an SVG element", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600
      }
    });
    expect(wrapper.find("svg").exists()).toBe(true);
  });
  xit("scales the SVG according to DOM mousewheel", () => {});
  xit("scales only the SVG, not the parent container", () => {});
  xit("pans according to DOM mousemove", () => {});
  xit("pans to a target SVG element", () => {});
  xit("resets the pan according to DOM mouseleave", () => {});
  xit("throws an error if multiple elements provided in the center slot", () => {});
  xit("hides routes that are explicitly hidden", () => {});
  xit("hides routes that are hidden by the active hierarchy", () => {});

  // Events emitted
  xit("emits a route-select event when a route is selected", () => {});
  xit("emits a route-deselect event when a route is deselected", () => {});
  xit("emits a route-mouseover event when a route is under the mouse cursor", () => {});
  xit("emits a route-mouseleave event when a route is no longer under the mouse cursor", () => {});
  xit("emits disabled-select event when a disabled route is selected", () => {});
  xit("emits a route-change event when the route is changed.", () => {});

  // Feature toggles
  xit("pans on mousemove only when the feature is enabled", () => {});
  xit("pans on route select only when the feature is enabled", () => {});
});
