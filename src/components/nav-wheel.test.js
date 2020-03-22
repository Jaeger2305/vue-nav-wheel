import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import NavWheel from "./nav-wheel.vue";
import Route from "./route.vue";
import baseConfig from "../nav-wheel-config";
import Vue from "vue";
import VueRouter from "vue-router";
import uuidv4 from "uuid/v4";
import sinon from "sinon";

const localVue = createLocalVue();
localVue.use(VueRouter);

const testConfig = {
  ...baseConfig,
  routes: [
    {
      name: "1",
      path: "/styles-2-1",
      component: {
        template: "<div></div>",
      },
      meta: { navWheel: { style: { stroke: "red" }, isDisabled: true } },
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
          meta: {
            navWheel: { style: { stroke: "yellow" }, isHidden: true },
          },
        },
        {
          name: "2-2",
          path: "/styles-2/2/2",
          component: {
            template: "<div></div>",
          },
        },
      ],
    },
    {
      name: "3",
      path: "/styles-3-1",
      component: {
        template: "<div></div>",
      },
      meta: { navWheel: { isHidden: true } },
    },
  ],
};

const mockedRoute = { path: "mocked" };

describe("nav-wheel.vue", () => {
  // Basic functionality
  it("renders an SVG element", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    expect(wrapper.get("svg"));
  });
  it("scales the SVG according to DOM wheel", async () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get("svg").trigger("wheel.prevent", { deltaY: 20 });
    expect(wrapper.vm.scale).toBeLessThan(1);

    await Vue.nextTick();
    // The first group should contain the scale element.
    expect(wrapper.get("g").attributes("transform")).toContain(
      `scale(${wrapper.vm.scale}, ${wrapper.vm.scale})`
    );
  });
  it("doesn't scale the SVG on initial pinch", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 10, pageY: 10 },
      ],
    });
    expect(wrapper.vm.scale).toBe(1);
  });
  it("scales up the SVG on expanding pinch", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 10, pageY: 10 },
      ],
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 20, pageY: 20 },
      ],
    });
    expect(wrapper.vm.scale).toBeGreaterThan(1);
  });
  it("scales down the SVG on contracting pinch", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 20, pageY: 20 },
      ],
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 10, pageY: 10 },
      ],
    });
    expect(wrapper.vm.scale).toBeLessThan(1);
  });
  it("scales the SVG only on touchmove change", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 10, pageY: 10 },
      ],
    });
    expect(wrapper.vm.scale).toBe(1);
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 30, pageY: 20 },
      ],
    });
    // Testing it works, rather than scaling by a certain amount to keep a robust test.
    expect(wrapper.vm.scale).not.toBe(1);
  });
  it("scales the SVG further on multiple distinct pinches", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 20, pageY: 20 },
      ],
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 10, pageY: 10 },
      ],
    });
    const firstPinchEndScale = wrapper.vm.scale;
    wrapper.get("svg").trigger("touchend");
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 20, pageY: 20 },
      ],
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 10, pageY: 10 },
      ],
    });
    expect(wrapper.vm.scale).toBeLessThan(firstPinchEndScale);
  });
  it("resets the touches on touchend", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get("svg").trigger("touchmove", {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 10, pageY: 10 },
      ],
    });
    expect(wrapper.vm.scale).toBe(1);
    wrapper.get("svg").trigger("touchend");
    // Testing it works, rather than scaling by a certain amount to keep a robust test.
    expect(wrapper.vm.touches.length).toBe(0);
  });
  it("pans according to DOM mousemove", () => {
    // The touch handling still needs some work, but add a placeholder test for now.
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    // Starting position should be without any panning.
    expect(wrapper.vm.panTranslation).toStrictEqual([-0, -0]);
    // Offsetting by less than half the size should pan the whole thing away from the cursor.
    wrapper.get("svg").trigger("mousemove", { offsetX: 10, offsetY: 10 });
    expect(wrapper.vm.panTranslation).toStrictEqual([290, 290]);
    // The midpoint should have no pan translation applied.
    wrapper.get("svg").trigger("mousemove", { offsetX: 300, offsetY: 300 });
    expect(wrapper.vm.panTranslation).toStrictEqual([-0, -0]);

    // Scale down the route - more is in view, so less panning is needed.
    // This scales linearly the pan translation.
    wrapper.setData({ scale: 0.5 });
    wrapper.get("svg").trigger("mousemove", { offsetX: 10, offsetY: 10 });
    expect(wrapper.vm.panTranslation).toStrictEqual([145, 145]);
    wrapper.get("svg").trigger("mousemove", { offsetX: 300, offsetY: 300 });
    expect(wrapper.vm.panTranslation).toStrictEqual([-0, -0]);
  });
  it("pans to a target SVG element", () => {
    const wrapper = mount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    expect(wrapper.vm.panTranslation).toStrictEqual([-0, -0]);
    wrapper.vm.panToTargetRect({ x: 10, y: -10, width: 50, height: 50 });
    expect(wrapper.vm.panTranslation).toStrictEqual([-35, -15]);
    wrapper.vm.panToTargetRect({ x: 10, y: -100, width: 500, height: 10 });
    expect(wrapper.vm.panTranslation).toStrictEqual([-260, 95]);

    // Scale down the route - more is in view, so less panning is needed.
    // This scales linearly the pan translation.
    wrapper.setData({ scale: 0.5 });
    expect(wrapper.vm.panTranslation).toStrictEqual([-130, 47.5]);
  });
  it("resets the pan according to DOM mouseleave", () => {
    // The touch handling still needs some work, but add a placeholder test for now.
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    // Starting position should be without any panning.
    expect(wrapper.vm.panTranslation).toStrictEqual([-0, -0]);
    wrapper.get("svg").trigger("mousemove", { offsetX: 10, offsetY: 10 });
    expect(wrapper.vm.panTranslation).toStrictEqual([290, 290]);
    wrapper.get("svg").trigger("mouseleave");
    expect(wrapper.vm.panTranslation).toStrictEqual([-0, -0]);
  });
  it("throws an error if multiple elements provided in the center slot", () => {
    const spy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});
    try {
      shallowMount(NavWheel, {
        propsData: {
          config: testConfig,
          size: 600,
        },
        slots: {
          center: [
            '<g id="slotgroup-test"><circle cx="50" cy="50" r="50"/></g><g></g>',
          ],
        },
      });
    } catch (error) {
      expect(String(error)).toBe(
        "Error: Expecting only one element, please wrap in a <g> tag."
      );
    }
    expect(spy).toBeCalled();
    spy.mockRestore();
  });
  it("hides routes that are explicitly hidden", () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    const testConfigHiddenRoute = testConfig.routes.find(
      ({ meta: { navWheel: { isHidden } } = { navWheel: {} } }) => isHidden
    );
    expect(testConfigHiddenRoute).toBeTruthy();
    const hiddenRouteInRoutes = wrapper.vm.routes.find(
      ({ meta: { navWheel: { isHidden } } = { navWheel: {} } }) => isHidden
    );
    expect(hiddenRouteInRoutes).toBeFalsy();

    expect(wrapper.find(`[id="${testConfigHiddenRoute.path}"]`).exists()).toBe(
      false
    );
  });
  it("hides routes that are hidden by the active hierarchy", async () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    const initialVisibleRoutes = wrapper.vm.routes;
    wrapper.setData({
      activeHierarchyKey: [wrapper.vm.routes[0].hierarchyKey],
    });
    await Vue.nextTick();
    const visibleRoute = wrapper.vm.routes.find(({ hierarchyKey }) =>
      wrapper.vm.activeHierarchyKey.includes(hierarchyKey)
    );
    expect(visibleRoute).toBeTruthy();
    expect(wrapper.vm.routes.length).not.toEqual(initialVisibleRoutes.length);
    expect(wrapper.vm.routes.length).toEqual(1);

    expect(wrapper.get(`[id="${visibleRoute.path}"]`));

    const hiddenRoute = initialVisibleRoutes.find(
      ({ hierarchyKey }) => hierarchyKey !== visibleRoute.hierarchyKey
    );

    expect(wrapper.find(`[id="${hiddenRoute.path}"]`).exists()).toBe(false);
  });

  // Events handling
  it("emits a route-select event when a route is selected", () => {
    const wrapper = mount(NavWheel, {
      mocks: {
        $route: {
          path: "some/path",
        },
      },
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get(Route).vm.$emit("route-select", mockedRoute);
    expect(wrapper.emitted()["route-select"]).toBeTruthy();
    expect(wrapper.emitted()["route-select"].length).toBe(1);
  });
  it("sets the active route on route select", () => {
    const wrapper = mount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    expect(wrapper.vm.activeRoute).toEqual({});
    wrapper.get(Route).vm.$emit("route-select", mockedRoute);
    expect(wrapper.vm.activeRoute).toEqual(mockedRoute);
  });
  it("emits a route-deselect event when a route is deselected", () => {
    const wrapper = mount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get(Route).vm.$emit("route-deselect", mockedRoute);
    expect(wrapper.emitted()["route-deselect"]).toBeTruthy();
    expect(wrapper.emitted()["route-deselect"].length).toBe(1);
  });
  it("emits a route-mouseover event when a route is under the mouse cursor", () => {
    const wrapper = mount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get(Route).vm.$emit("route-mouseover", mockedRoute);
    expect(wrapper.emitted()["route-mouseover"]).toBeTruthy();
    expect(wrapper.emitted()["route-mouseover"].length).toBe(1);
  });
  it("emits a route-mouseleave event when a route is no longer under the mouse cursor", () => {
    const wrapper = mount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    wrapper.get(Route).vm.$emit("route-mouseleave", mockedRoute);
    expect(wrapper.emitted()["route-mouseleave"]).toBeTruthy();
    expect(wrapper.emitted()["route-mouseleave"].length).toBe(1);
  });
  it("emits disabled-select event when a disabled route is selected", () => {
    const wrapper = mount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    // Only emit the disabled route.
    const disabledRouteWrapper = wrapper.findAll(Route).at(0);
    disabledRouteWrapper.vm.$emit("disabled-select", mockedRoute);
    expect(wrapper.emitted()["disabled-select"]).toBeTruthy();
    expect(wrapper.emitted()["disabled-select"].length).toBe(1);
  });
  it("emits a route-change event when the route is changed.", async () => {
    const wrapper = shallowMount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
      localVue,
      router: new VueRouter({ routes: testConfig.routes }),
    });

    wrapper.vm.$router.push({ path: "/path/new" });
    await localVue.nextTick();
    expect(wrapper.emitted()["route-change"]).toBeTruthy();
    expect(wrapper.emitted()["route-change"].length).toBe(1);
  });
  it("updates the active hierarchy key on update hierarchy", () => {
    const wrapper = mount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
    });
    expect(wrapper.vm.activeHierarchyKey).toEqual([]);
    // Hierarchy keys are uuids, which are added as a computed.
    // This is close to testing that computed, but I think it's important here too.
    const updatedHierarchy = [wrapper.vm.keyedRoutes[0].hierarchyKey, uuidv4()];
    wrapper.get(Route).vm.$emit("update-hierarchy", updatedHierarchy);
    expect(wrapper.vm.activeHierarchyKey).toEqual(updatedHierarchy);
  });
  it("calls the pan to target rect on pan-route event", () => {
    const spyPanToTargetRect = sinon.spy();
    const wrapper = mount(NavWheel, {
      propsData: {
        config: testConfig,
        size: 600,
      },
      methods: {
        panToTargetRect: spyPanToTargetRect,
      },
    });
    wrapper.get(Route).vm.$emit("pan-route");
    expect(spyPanToTargetRect.callCount).toEqual(1);
  });

  // Feature toggles
  it("pans on mousemove only when the feature is enabled", () => {
    const featureEnabledConfig = {
      ...testConfig,
      constants: {
        ...testConfig.constants,
        isPanOnMouseMoveEnabled: true,
      },
    };
    const featureDisabledConfig = {
      ...testConfig,
      constants: {
        ...testConfig.constants,
        isPanOnMouseMoveEnabled: false,
      },
    };
    const wrapper = mount(NavWheel, {
      propsData: {
        config: featureDisabledConfig,
        size: 600,
      },
    });
    const startingPanTranslation = wrapper.vm.panTranslation;
    wrapper.get("svg").trigger("mousemove", { offsetX: 10, offsetY: -10 });
    expect(wrapper.vm.panTranslation).toEqual(startingPanTranslation);

    wrapper.setProps({ config: featureEnabledConfig });
    wrapper.get("svg").trigger("mousemove", { offsetX: 10, offsetY: -10 });
    expect(wrapper.vm.panTranslation).not.toEqual(startingPanTranslation);
  });
  it("pans on route select only when the feature is enabled", () => {
    const featureEnabledConfig = {
      ...testConfig,
      constants: {
        ...testConfig.constants,
        isPanOnSelectEnabled: true,
      },
    };
    const featureDisabledConfig = {
      ...testConfig,
      constants: {
        ...testConfig.constants,
        isPanOnSelectEnabled: false,
      },
    };
    const wrapper = mount(NavWheel, {
      propsData: {
        config: featureDisabledConfig,
        size: 600,
      },
    });
    const mockTargetRect = { x: 10, y: -10, width: 50, height: 50 };
    const startingPanTranslation = wrapper.vm.panTranslation;
    wrapper.vm.panToTargetRect(mockTargetRect);
    expect(wrapper.vm.panTranslation).toEqual(startingPanTranslation);

    wrapper.setProps({ config: featureEnabledConfig });
    wrapper.vm.panToTargetRect(mockTargetRect);
    expect(wrapper.vm.panTranslation).not.toEqual(startingPanTranslation);
  });
});
