import { shallowMount, mount } from "@vue/test-utils";
import Vue from "vue";
import sinon from "sinon";
import Route from "./route.vue";
import {
  defaultRouteProps,
  mockedRoute,
  disabledRouteWithKey,
} from "../assets/example-data";
import uuidv4 from "uuid/v4";

describe("route.vue", () => {
  // Events
  it("tests the ref is set up", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    expect(
      wrapper.vm.$refs[`route-${defaultRouteProps.route.path}`]
    ).toBeTruthy();
  });
  it("selects a route when it's touched", () => {
    const selectRouteSpy = sinon.spy();
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
      methods: {
        selectRouteSpy,
      },
    });
    wrapper
      .get(`#nav-wheel__route-annular__group__${wrapper.vm.route.hierarchyKey}`)
      .trigger("touchstart");
    expect(selectRouteSpy.calledOnceWith(wrapper.vm.route));
  });
  it("registers the ref of the route properly", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    expect(wrapper.get({ ref: `route-${wrapper.vm.route.path}` }));
  });
  xit("emits the pan route event on touch", () => {
    // Refs can't be mocked on the same component.
    // SVG elements aren't handled by JSDom in Jest, and as this calls an SVG element method, an error is thrown during this test, before the event can be fired.
    // https://github.com/jsdom/jsdom/issues/918
    // Integration testing with a real browser seems more apt.
    // https://github.com/vuejs/vue-test-utils/issues/271#issuecomment-436408873
    // Running the tests in browser has the SVG elements, so the tests succeed. See the following for a reproduction:
    // https://codesandbox.io/s/floral-glade-k1hu0
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper
      .get(`#nav-wheel__route-annular__group__${wrapper.vm.route.hierarchyKey}`)
      .trigger("touchstart");
    expect(wrapper.emitted()["pan-route"]).toBeTruthy();
  });
  it("identifies when the mouse is over a route", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper
      .get(`#nav-wheel__route-annular__group__${wrapper.vm.route.hierarchyKey}`)
      .trigger("mouseover");
    expect(wrapper.vm.isUnderCursor).toBe(true);
    expect(wrapper.emitted()["route-mouseover"]).toBeTruthy();
  });
  it("identifies when a mouse has left a route", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper
      .get(`#nav-wheel__route-annular__group__${wrapper.vm.route.hierarchyKey}`)
      .trigger("mouseleave");
    expect(wrapper.vm.isUnderCursor).toBe(false);
    expect(wrapper.emitted()["route-mouseleave"]).toBeTruthy();
  });
  it("selects a route when it's clicked", () => {
    const selectRouteSpy = sinon.spy();
    // Refs don't seem to work on the same component, hence this function being mocked.
    // Integration testing seems more apt.
    // https://github.com/vuejs/vue-test-utils/issues/271#issuecomment-436408873
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
      methods: {
        selectRouteSpy,
      },
    });
    wrapper
      .get(`#nav-wheel__route-annular__group__${wrapper.vm.route.hierarchyKey}`)
      .trigger("click");
    expect(selectRouteSpy.calledOnceWith(wrapper.vm.route));
  });
  it("emits event on child route select", () => {
    const wrapper = mount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.get(Route).vm.$emit("route-select", mockedRoute);
    expect(wrapper.emitted()["route-select"]).toBeTruthy();
    expect(wrapper.emitted()["route-select"].length).toBe(1);
  });
  it("emits event on child route deselect", () => {
    const wrapper = mount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.get(Route).vm.$emit("route-deselect", mockedRoute);
    expect(wrapper.emitted()["route-deselect"]).toBeTruthy();
    expect(wrapper.emitted()["route-deselect"].length).toBe(1);
  });
  it("emits event on child route mouseover", () => {
    const wrapper = mount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.get(Route).vm.$emit("route-mouseover", mockedRoute);
    expect(wrapper.emitted()["route-mouseover"]).toBeTruthy();
    expect(wrapper.emitted()["route-mouseover"].length).toBe(1);
  });
  it("emits event on child route mouseleave", () => {
    const wrapper = mount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.get(Route).vm.$emit("route-mouseleave", mockedRoute);
    expect(wrapper.emitted()["route-mouseleave"]).toBeTruthy();
    expect(wrapper.emitted()["route-mouseleave"].length).toBe(1);
  });
  it("emits event on child pan route", () => {
    const wrapper = mount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.get(Route).vm.$emit("pan-route", mockedRoute);
    expect(wrapper.emitted()["pan-route"]).toBeTruthy();
    expect(wrapper.emitted()["pan-route"].length).toBe(1);
  });
  it("emits event on hierarchy update", () => {
    const wrapper = mount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.get(Route).vm.$emit("update-hierarchy", mockedRoute);
    expect(wrapper.emitted()["update-hierarchy"]).toBeTruthy();
    expect(wrapper.emitted()["update-hierarchy"].length).toBe(1);
  });

  // Functionality config
  it("removes route children with a common ancestor that are out of focus", () => {
    const hierarchyLevelFocus = 4;
    const hierarchyLevelsDisplayLimit = hierarchyLevelFocus; // This needs to match the above, or be higher, for this test to work.
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        config: {
          ...defaultRouteProps.config,
          constants: {
            ...defaultRouteProps.config.constants,
            hierarchyLevelsDisplayLimit,
            hierarchyLevelFocus,
          },
        },
      },
    });
    // If the focus level is above the distance to the route in the hierarchy, then the route should be shown
    // If the focus level is below the distance to the route in the hierarchy, then only one child should be shown
    // If the distance to the route is above the display limit, then it should be invisible, but still there.
    // Check when it's in draw distance (4), but out of focus distance

    // The route is showing children, but it's not the active one, nor is it in the active hierarchy key.
    // Given a route:
    // [0] - route.hierarchyKey
    //   1
    //     1.1
    //   [2]
    //     [2.1]
    //       [2.1.1]
    //       2.1.2
    //     2.2
    // The active hierarchy is 2.1.1 and its ancestors, but we're testing whether 2.0 should show.
    // We test this at the common ancestor, the one that's mounted, root.
    // If the focus is less than the distance to the common ancestor, 2.0 wouldn't have children.
    // In the case of the above, the distance to the common ancestor is 4.
    // This complements the hierarchyLevelsDisplayLimit, which toggles the visibility of 2.0, but the component remains there.
    const mockHierarchyInFocusDistance = [
      wrapper.vm.route.hierarchyKey, // root
      // -1 to account for the root
      // [2], [2.1]
      ...Array.from({ length: hierarchyLevelFocus - 1 }, uuidv4),
    ];
    // Set the hierarchy to be something other than the one we're currently looking at.
    // They do have a common ancestor, within focus distance.
    wrapper.setProps({
      activeHierarchyKey: mockHierarchyInFocusDistance,
      parentHierarchyKey: mockHierarchyInFocusDistance.slice(0, 1),
    });
    expect(wrapper.vm.childRoutes.length).toEqual(
      wrapper.vm.keyedChildRoutes.length
    );

    // Check when it's out of focus (4)
    const mockHierarchyOutOfFocusDistance = [
      wrapper.vm.route.hierarchyKey, // [root]
      // -1 to account for the root
      // [2], [2.1], [2.1.1], [2.1.1.1]
      ...Array.from({ length: hierarchyLevelFocus }, uuidv4),
    ];
    wrapper.setProps({ activeHierarchyKey: mockHierarchyOutOfFocusDistance });
    // The distance to the root common ancestor is greater than the config limit, so the route doesn't keep its children.
    expect(wrapper.vm.childRoutes.length).toEqual(0);
  });
  it("removes route children when there is no common ancestor, and out of focus", () => {
    const hierarchyLevelFocus = 4;
    const hierarchyLevelsDisplayLimit = hierarchyLevelFocus; // This needs to match the above, or be higher, for this test to work.
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        config: {
          ...defaultRouteProps.config,
          constants: {
            ...defaultRouteProps.config.constants,
            hierarchyLevelsDisplayLimit,
            hierarchyLevelFocus,
          },
        },
      },
    });

    const mockHierarchyInFocusDistance = [
      wrapper.vm.route.hierarchyKey, // root
      // -1 to account for the root and -1 to get below the limit
      // [2] and [2.1]
      ...Array.from({ length: hierarchyLevelFocus - 2 }, uuidv4),
    ];
    // Set the hierarchy to be something other than the one we're currently looking at.
    // They do have a common ancestor, within focus distance.
    wrapper.setProps({
      activeHierarchyKey: mockHierarchyInFocusDistance,
      parentHierarchyKey: [uuidv4()],
    });
    expect(wrapper.vm.childRoutes.length).toEqual(
      wrapper.vm.keyedChildRoutes.length
    );

    // Check when it's out of focus, at the focus limit (4)
    const mockHierarchyOutOfFocusDistance = [
      wrapper.vm.route.hierarchyKey, // [root]
      // [2], [2.1], [2.1.1]
      ...Array.from({ length: hierarchyLevelFocus - 1 }, uuidv4),
    ];
    wrapper.setProps({ activeHierarchyKey: mockHierarchyOutOfFocusDistance });
    // The distance to the root common ancestor is greater than the config limit, so the route doesn't keep its children.
    expect(wrapper.vm.childRoutes.length).toEqual(0);
  });
  it("doesn't show a route if it's not in focus", async () => {
    // This test explicitly calls out functionality.
    // The wheel is currently designed to only show one hierarchy at a time.
    // The check of "isRouteShowingChildren" will always be false when the active hierarchy doesn't include this route's hierarchyKey.
    const hierarchyLevelFocus =
      defaultRouteProps.config.constants.hierarchyLevelFocus;
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    const mockUnrelatedActiveHierarchy = Array.from(
      { length: hierarchyLevelFocus },
      uuidv4
    );
    wrapper.setProps({ activeHierarchyKey: mockUnrelatedActiveHierarchy });

    await Vue.nextTick();
    // The child routes shouldn't exist.
    expect(wrapper.vm.childRoutes.length).toEqual(0);

    // And also the paths of the parent shouldn't be found.
    // It's conceivable that this changes, should multiple different hierarchies want to be displayed at once.
    // In that case, I would expect the parent path to be not found, but the children to exist.
    expect(
      wrapper
        .find(
          `#nav-wheel__route-annular__path__${wrapper.vm.route.hierarchyKey}`
        )
        .exists()
    ).toBe(false);
  });
  it("shows a route, if it's within a configurable display level", async () => {
    const hierarchyLevelsDisplayLimit = 4;
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        config: {
          ...defaultRouteProps.config,
          constants: {
            ...defaultRouteProps.config.constants,
            hierarchyLevelsDisplayLimit,
          },
        },
      },
    });
    const mockUnrelatedActiveHierarchyWithinLimit = Array.from(
      { length: hierarchyLevelsDisplayLimit - 1 },
      uuidv4
    );
    wrapper.setProps({
      activeHierarchyKey: mockUnrelatedActiveHierarchyWithinLimit,
    });

    await Vue.nextTick();
    expect(
      wrapper.get(
        `#nav-wheel__route-annular__path__${wrapper.vm.route.hierarchyKey}`
      )
    );

    const mockUnrelatedActiveHierarchySurpassedLimit = Array.from(
      { length: hierarchyLevelsDisplayLimit },
      uuidv4
    );
    wrapper.setProps({
      activeHierarchyKey: mockUnrelatedActiveHierarchySurpassedLimit,
    });

    await Vue.nextTick();
    expect(
      wrapper
        .find(
          `#nav-wheel__route-annular__path__${wrapper.vm.route.hierarchyKey}`
        )
        .exists()
    ).toBe(false);
  });
  it("adjusts the start radius of the children according to the config", () => {
    const spaceBetweenParentChild = 50;
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        config: {
          ...defaultRouteProps.config,
          constants: {
            ...defaultRouteProps.config.constants,
            spaceBetweenParentChild,
          },
        },
      },
    });
    const mockActiveHierarchy = [
      wrapper.vm.route.hierarchyKey,
      ...Array.from(
        {
          length:
            defaultRouteProps.config.constants.hierarchyLevelsDisplayLimit - 1,
        },
        uuidv4
      ),
    ];
    wrapper.setProps({
      activeHierarchyKey: mockActiveHierarchy,
      parentHierarchyKey: mockActiveHierarchy.slice(0, 1),
    });
    expect(wrapper.vm.childRoutes.length).toBeGreaterThan(0);

    wrapper.vm.childRoutes.forEach(({ startRadius }) => {
      expect(startRadius).toEqual(
        wrapper.vm.outerRadius + spaceBetweenParentChild
      );
    });

    const newSpaceBetweenParentChild = 75;
    wrapper.setProps({
      config: {
        ...defaultRouteProps.config,
        constants: {
          ...defaultRouteProps.config.constants,
          spaceBetweenParentChild: newSpaceBetweenParentChild,
        },
      },
    });
    wrapper.vm.childRoutes.forEach(({ startRadius }) => {
      expect(startRadius).toEqual(
        wrapper.vm.outerRadius + newSpaceBetweenParentChild
      );
    });
  });

  // Simple config
  it("hides child routes according to route meta", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    const testConfigHiddenRoute = defaultRouteProps.route.children.find(
      ({ meta: { navWheel: { isHidden } } = { navWheel: {} } }) => isHidden
    );
    expect(testConfigHiddenRoute).toBeTruthy();
    const hiddenRouteInRoutes = wrapper.vm.childRoutes.find(
      ({ meta: { navWheel: { isHidden } } = { navWheel: {} } }) => isHidden
    );
    expect(hiddenRouteInRoutes).toBeFalsy();

    expect(wrapper.find(`[id="${testConfigHiddenRoute.path}"]`).exists()).toBe(
      false
    );
  });
  it("applies the pad angle from the config", () => {
    const defaultPadAngle = 0.04;
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        config: {
          ...defaultRouteProps.config,
          constants: {
            ...defaultRouteProps.config.constants,
            padAngle: defaultPadAngle,
          },
        },
      },
    });
    const mockActiveHierarchy = [
      wrapper.vm.route.hierarchyKey,
      ...Array.from(
        {
          length:
            defaultRouteProps.config.constants.hierarchyLevelsDisplayLimit - 1,
        },
        uuidv4
      ),
    ];
    wrapper.setProps({
      activeHierarchyKey: mockActiveHierarchy,
      parentHierarchyKey: mockActiveHierarchy.slice(0, 1),
    });
    expect(wrapper.vm.childRoutes.length).toBeGreaterThan(0);

    wrapper.vm.childRoutes.forEach(({ padAngle, segmentRadians }) => {
      expect(padAngle).toEqual(
        (defaultPadAngle / wrapper.vm.childRoutes.length) * segmentRadians
      );
    });

    const largerPadAngle = 0.1;
    wrapper.setProps({
      config: {
        ...defaultRouteProps.config,
        constants: {
          ...defaultRouteProps.config.constants,
          padAngle: largerPadAngle,
        },
      },
    });
    wrapper.vm.childRoutes.forEach(({ padAngle, segmentRadians }) => {
      expect(padAngle).toEqual(
        (largerPadAngle / wrapper.vm.childRoutes.length) * segmentRadians
      );
    });
  });

  // Visuals
  it("applies a unique ID to the visible route objects", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    expect(
      wrapper.get(
        `#nav-wheel__route-annular__path__${wrapper.vm.route.hierarchyKey}`
      )
    );
    expect(
      wrapper.get(
        `#nav-wheel__route-label__text__${wrapper.vm.route.hierarchyKey}`
      )
    );
  });
  it("applies disabling styling to disabled routes", () => {
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        route: disabledRouteWithKey,
      },
    });
    expect(
      wrapper
        .get(
          `#nav-wheel__route-annular__path__${wrapper.vm.route.hierarchyKey}`
        )
        .classes()
    ).toContain("nav-wheel__route-annular--disabled");
    expect(
      wrapper
        .get(`#nav-wheel__route-label__text__${wrapper.vm.route.hierarchyKey}`)
        .classes()
    ).toContain("nav-wheel__route-label--disabled");
  });
  it("applies visited styling to the active route", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.setProps({
      activeHierarchyKey: [wrapper.vm.route.hierarchyKey],
      parentHierarchyKey: [wrapper.vm.route.hierarchyKey],
    });
    expect(wrapper.vm.isActiveRoute).toBe(true);
    expect(
      wrapper
        .get(
          `#nav-wheel__route-annular__path__${wrapper.vm.route.hierarchyKey}`
        )
        .classes()
    ).toContain("nav-wheel__route-annular--visited");
  });
  it("applies active styling to the route underneath the cursor", async () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.setData({ isUnderCursor: true });
    await Vue.nextTick();
    expect(
      wrapper
        .get(
          `#nav-wheel__route-annular__path__${wrapper.vm.route.hierarchyKey}`
        )
        .classes()
    ).toContain("nav-wheel__route-annular--active");
  });

  // Internals
  it("keys child routes", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });

    // Check the key exists.
    expect(
      wrapper.vm.keyedChildRoutes.filter(({ hierarchyKey }) => hierarchyKey)
        .length
    ).toEqual(wrapper.vm.keyedChildRoutes.length);

    // Check the key is unique.
    expect(
      new Set(
        wrapper.vm.keyedChildRoutes.map(({ hierarchyKey }) => hierarchyKey)
      ).size
    ).toEqual(wrapper.vm.keyedChildRoutes.length);
  });
  it("generates an arc from d3", () => {
    // Not a great test, but it's something, and there's no sense in testing an external library.
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    expect(wrapper.vm.routeArc).toBeTruthy();
    expect(typeof wrapper.vm.routeArc).toBe("string");
  });
  it("calculates the center of an arc from d3", () => {
    // Not a great test, but it's something, and there's no sense in testing an external library.
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    expect(Array.isArray(wrapper.vm.labelCentroid)).toBe(true);
    expect(wrapper.vm.labelCentroid.length).toBe(2);
  });
  it("applies a level to all child routes, and those children are a level higher", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    const mockActiveHierarchy = [
      wrapper.vm.route.hierarchyKey,
      ...Array.from(
        {
          length:
            defaultRouteProps.config.constants.hierarchyLevelsDisplayLimit - 1,
        },
        uuidv4
      ),
    ];
    wrapper.setProps({
      activeHierarchyKey: mockActiveHierarchy,
      parentHierarchyKey: mockActiveHierarchy.slice(0, 1),
    });
    expect(wrapper.vm.childRoutes.length).toBeGreaterThan(0);
    wrapper.vm.childRoutes.forEach(({ level }) => {
      expect(level).toBeGreaterThan(wrapper.vm.level);
    });
  });
  it("matches the parent start radius if the parent isn't visible", () => {
    const hierarchyLevelFocus =
      defaultRouteProps.config.constants.hierarchyLevelFocus;
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        config: {
          ...defaultRouteProps.config,
          constants: {
            ...defaultRouteProps.config.constants,
            hierarchyLevelFocus,
          },
        },
      },
    });

    const mockUnrelatedActiveHierarchy = Array.from(
      { length: hierarchyLevelFocus },
      uuidv4
    );
    wrapper.setProps({ activeHierarchyKey: mockUnrelatedActiveHierarchy });

    wrapper.vm.childRoutes.forEach(({ startRadius }) => {
      expect(startRadius).toEqual(wrapper.vm.startRadius);
    });
  });
  it("spreads children out according to the child angle spread", () => {
    const childAngleSpread = 0;
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        config: {
          ...defaultRouteProps.config,
          constants: {
            ...defaultRouteProps.config.constants,
            childAngleSpread,
          },
        },
      },
    });
    const mockActiveHierarchy = [
      wrapper.vm.route.hierarchyKey,
      ...Array.from(
        {
          length:
            defaultRouteProps.config.constants.hierarchyLevelsDisplayLimit - 1,
        },
        uuidv4
      ),
    ];
    wrapper.setProps({
      activeHierarchyKey: mockActiveHierarchy,
      parentHierarchyKey: mockActiveHierarchy.slice(0, 1),
    });
    expect(wrapper.vm.childRoutes.length).toBeGreaterThan(0);
    wrapper.vm.childRoutes.forEach(({ segmentRadians }) => {
      expect(segmentRadians).toEqual(
        wrapper.vm.segmentRadians / wrapper.vm.childRoutes.length
      );
    });
    wrapper.setProps({
      config: {
        ...defaultRouteProps.config,
        constants: {
          ...defaultRouteProps.config.constants,
          childAngleSpread: 0.5,
        },
      },
    });
    wrapper.vm.childRoutes.forEach(({ segmentRadians }) => {
      expect(segmentRadians).toBeGreaterThan(
        wrapper.vm.segmentRadians / wrapper.vm.childRoutes.length
      );
    });
  });
  it("doesn't overlap children, even with obscene child angle spreads", () => {
    const childAngleSpread = 0;
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        config: {
          ...defaultRouteProps.config,
          constants: {
            ...defaultRouteProps.config.constants,
            childAngleSpread,
          },
        },
      },
    });
    const mockActiveHierarchy = [
      wrapper.vm.route.hierarchyKey,
      ...Array.from(
        {
          length:
            defaultRouteProps.config.constants.hierarchyLevelsDisplayLimit - 1,
        },
        uuidv4
      ),
    ];
    wrapper.setProps({
      activeHierarchyKey: mockActiveHierarchy,
      parentHierarchyKey: mockActiveHierarchy.slice(0, 1),
    });
    expect(wrapper.vm.childRoutes.length).toBeGreaterThan(0);
    const radiansInCircle = Math.PI * 2;
    wrapper.vm.childRoutes.forEach(({ segmentRadians }) => {
      expect(segmentRadians).toBeLessThanOrEqual(
        radiansInCircle / wrapper.vm.childRoutes.length
      );
    });
  });
  it("calculates the segment size from the props", () => {
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        startAngle: 0,
        endAngle: 1,
      },
    });
    expect(wrapper.vm.segmentRadians).toBe(1);
    wrapper.setProps({
      startAngle: 1,
      endAngle: 3,
    });
    expect(wrapper.vm.segmentRadians).toBe(2);
  });
  it("has a larger ripple radius for a larger segment", () => {
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        startAngle: 0,
        endAngle: 1,
      },
    });
    const originalRippleSize = wrapper.vm.rippleRadius;
    wrapper.setProps({
      startAngle: 0,
      endAngle: 2,
    });
    const resizedRippleSize = wrapper.vm.rippleRadius;

    expect(originalRippleSize).toBeLessThan(resizedRippleSize);
  });
  it("retrieves the nav wheel metadata", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    expect(wrapper.vm.navWheelMeta).toBeTruthy();
    expect(wrapper.vm.navWheelMeta).toEqual(
      defaultRouteProps.route.meta.navWheel
    );
  });
  it("can determine if the route is active or not", () => {
    // A given route is active, if the last entry in the active its parentHierarchyKey match.
    // in a hierarchy like so:
    // root
    //   1
    //    1.1
    //      1.1.1
    // Route 1.1 parent key is 1, but if 1.1 has been selected, it will update the active hierarchy with a concatenation of its parents + its own.
    // Thus, [root, 1] becomes [root, 1, 1.1], and route 1.1 is active.
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    wrapper.setProps({
      activeHierarchyKey: [wrapper.vm.route.hierarchyKey],
      parentHierarchyKey: [wrapper.vm.route.hierarchyKey],
    });
    expect(wrapper.vm.isActiveRoute).toBe(true);

    const mockNestedHierarchy = [uuidv4(), wrapper.vm.route.hierarchyKey];
    wrapper.setProps({
      activeHierarchyKey: [...mockNestedHierarchy],
      parentHierarchyKey: [...mockNestedHierarchy],
    });
    expect(wrapper.vm.isActiveRoute).toBe(true);
    wrapper.setProps({
      activeHierarchyKey: [...mockNestedHierarchy],
      parentHierarchyKey: mockNestedHierarchy.slice(0, -1),
    });
    expect(wrapper.vm.isActiveRoute).toBe(false);
  });
  it("can determine if the route is showing visible children", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    const mockActiveHierarchy = [
      wrapper.vm.route.hierarchyKey,
      ...Array.from(
        {
          length:
            defaultRouteProps.config.constants.hierarchyLevelsDisplayLimit - 1,
        },
        uuidv4
      ),
    ];
    wrapper.setProps({
      activeHierarchyKey: mockActiveHierarchy,
    });
    expect(wrapper.vm.isRouteShowingChildren).toBe(true);
  });
  it("can determine if the parent route is still visible", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    const mockActiveHierarchy = [
      ...Array.from(
        {
          length:
            defaultRouteProps.config.constants.hierarchyLevelsDisplayLimit - 1,
        },
        uuidv4
      ),
    ];
    wrapper.setProps({
      activeHierarchyKey: mockActiveHierarchy,
    });
    expect(wrapper.vm.isParentRouteVisible).toBe(true);
    const mockDifferentHierarchy = [
      ...Array.from(
        {
          length:
            defaultRouteProps.config.constants.hierarchyLevelsDisplayLimit,
        },
        uuidv4
      ),
    ];
    wrapper.setProps({
      activeHierarchyKey: mockDifferentHierarchy,
    });
    expect(wrapper.vm.isParentRouteVisible).toBe(false);
  });
  it("visits a route when the text is clicked", () => {
    const routerPushSpy = sinon.spy();
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
      mocks: {
        $router: {
          push: routerPushSpy,
        },
      },
    });
    wrapper
      .get(`#nav-wheel__route-label__text__${wrapper.vm.route.hierarchyKey}`)
      .trigger("click");
    expect(routerPushSpy.calledOnceWith({ path: wrapper.vm.route.path }));
  });
  it("doesn't visit a route if it's disabled", async () => {
    const routerPushSpy = sinon.spy();
    const wrapper = shallowMount(Route, {
      propsData: {
        ...defaultRouteProps,
        route: {
          ...defaultRouteProps.route,
          meta: {
            navWheel: {
              isDisabled: true,
            },
          },
        },
      },
      mocks: {
        $router: {
          push: routerPushSpy,
        },
      },
    });
    wrapper
      .get(`#nav-wheel__route-label__text__${wrapper.vm.route.hierarchyKey}`)
      .trigger("click");
    expect(routerPushSpy.notCalled);
  });
  it("matches the route mask to the route shape", () => {
    const wrapper = shallowMount(Route, {
      propsData: defaultRouteProps,
    });
    expect(
      wrapper.get(`[mask="url(#route-${wrapper.vm.route.path}-mask)"]`)
    ).toBeTruthy();
  });
});
