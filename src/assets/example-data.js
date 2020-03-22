import baseConfig from "../nav-wheel-config";

export const testConfig = {
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

export const simpleConfig = {
  ...baseConfig,
  routes: [
    {
      name: "1",
      path: "/styles-2-1",
      component: { template: "<div></div>" },
      meta: { navWheel: { style: { stroke: "red" } } },
    },
    {
      name: "2",
      path: "/styles-2/2",
      component: { template: "<div></div>" },
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
          component: { template: "<div></div>" },
          meta: { navWheel: { style: { stroke: "yellow" } } },
          children: [
            {
              name: "2-1-1",
              path: "/styles-2/1/1",
              component: { template: "<div></div>" },
              meta: { navWheel: { style: { stroke: "yellow" } } },
              children: [
                {
                  name: "2-1-1-1",
                  path: "/styles-2/2/1/1/1",
                  component: { template: "<div></div>" },
                  meta: { navWheel: { style: { stroke: "yellow" } } },
                },
                {
                  name: "2-1-1-2",
                  path: "/styles-2/2/1/1/2",
                  component: { template: "<div></div>" },
                  meta: { navWheel: { style: { stroke: "yellow" } } },
                },
              ],
            },
          ],
        },
        {
          name: "2-2",
          path: "/styles-2/2/2",
          component: { template: "<div></div>" },
        },
        {
          name: "2-3",
          path: "/styles-2/2/3",
          component: { template: "<div></div>" },
        },
      ],
    },
  ],
  constants: {
    padAngle: 0.04,
    spaceBetweenParentChild: 10,
    shrinkRouteScale: 5,
    scale: 1,
    cornerSharpness: 100,
    startRadius: 100,
    childAngleSpread: 0.04,
    defaultTransition: "fade",
    isPanOnSelectEnabled: true,
    isPanOnMouseMoveEnabled: true,
    hierarchyLevelsDisplayLimit: 3,
    hierarchyLevelFocus: 4,
  },
};

export const mockedRoute = { path: "mocked" };

export const routeConfigWithKey = {
  name: "test-name-3",
  path: "/test3",
  component: {
    template: "<div><router-view /></div>",
  },
  meta: {
    navWheel: {
      transitionName: "fade",
      style: { stroke: "yellow", fill: "purple" },
    },
  },
  children: [
    {
      name: "test-name-3-child-1",
      path: "/test3/child1",
      component: {
        template: '<div><font-awesome-icon icon="child" />child-1</div>',
      },
      meta: { navWheel: { style: { stroke: "yellow" } } },
      children: [
        {
          name: "test-name-3-child-1-subchild1",
          path: "/test3/child1/subchild1",
          component: {
            template: '<div><font-awesome-icon icon="child" />subchild-1</div>',
          },
          meta: { navWheel: { style: { stroke: "yellow" } } },
          children: [
            {
              name: "test-name-3-child-1-subchild1-toddler-1",
              path: "/test3/child1/subchild1/toddler1",
              component: {
                template:
                  '<div><font-awesome-icon icon="child" />toddler-1</div>',
              },
              meta: { navWheel: { style: { stroke: "yellow" } } },
            },
            {
              name: "test-name-3-child-1-subchild1-toddler-2",
              path: "/test3/child1/subchild1/toddler2",
              component: {
                template:
                  '<div><font-awesome-icon icon="child" />toddler-2</div>',
              },
              meta: { navWheel: { style: { stroke: "yellow" } } },
            },
          ],
        },
      ],
    },
    {
      name: "test-name-3-child-2",
      path: "/test3/child2",
      component: {
        template: '<div><font-awesome-icon icon="child" />child-2</div>',
      },
    },
    {
      name: "test-name-3-child-3",
      path: "/test3/child3",
      component: {
        template: '<div><font-awesome-icon icon="child" />child-3</div>',
      },
    },
    {
      name: "test-name-3-child-4",
      path: "/test3/child4",
      component: {
        template: '<div><font-awesome-icon icon="child" />child-4</div>',
      },
      meta: { navWheel: { isHidden: true } },
    },
    {
      name: "test-name-3-child-5",
      path: "/test3/child5",
      component: {
        template: '<div><font-awesome-icon icon="child" />child-5</div>',
      },
      meta: { navWheel: { isDisabled: true } },
    },
    {
      name: "test-name-3-child-6",
      path: "/test3/child6",
      component: {
        template: '<div><font-awesome-icon icon="child" />child-6</div>',
      },
    },
  ],
  hierarchyKey: "aa447b64-a90c-4436-9968-590ea42e6f19",
};

export const defaultRouteProps = {
  activeHierarchyKey: ["12354b5a-0466-4a0f-bd66-84961c6527dc"],
  parentHierarchyKey: ["12354b5a-0466-4a0f-bd66-84961c6527dc"],
  config: simpleConfig,
  padAngle: 0,
  startRadius: 0,
  size: 600,
  startAngle: 0,
  endAngle: 1,
  route: routeConfigWithKey,
};

export const disabledRouteWithKey = {
  name: "test-name-3-child-5",
  path: "/test3/child5",
  component: {
    template: "<div>child-5</div>",
  },
  meta: { navWheel: { isDisabled: true } },
  hierarchyKey: "bb847b64-a90c-4436-9968-590ea42b779c",
};

export const nestedRouteProps = {
  ...defaultRouteProps,
  route: {
    name: "2-1-1",
    path: "/styles-2/1/1",
    component: { template: "<div></div>" },
    meta: { navWheel: { style: { stroke: "yellow" } } },
    children: [
      {
        name: "2-1-1-1",
        path: "/styles-2/2/1/1/1",
        component: { template: "<div></div>" },
        meta: { navWheel: { style: { stroke: "yellow" } } },
      },
      {
        name: "2-1-1-2",
        path: "/styles-2/2/1/1/2",
        component: { template: "<div></div>" },
        meta: { navWheel: { style: { stroke: "yellow" } } },
      },
    ],
    hierarchyKey: "2870ea4e-b148-4cb5-addc-9948c98f8ea2",
  },
  activeRoute: {
    name: "2-1-1",
    path: "/styles-2/1/1",
    component: { template: "<div></div>" },
    meta: { navWheel: { style: { stroke: "yellow" } } },
    children: [
      {
        name: "2-1-1-1",
        path: "/styles-2/2/1/1/1",
        component: { template: "<div></div>" },
        meta: { navWheel: { style: { stroke: "yellow" } } },
      },
      {
        name: "2-1-1-2",
        path: "/styles-2/2/1/1/2",
        component: { template: "<div></div>" },
        meta: { navWheel: { style: { stroke: "yellow" } } },
      },
    ],
    hierarchyKey: "2870ea4e-b148-4cb5-addc-9948c98f8ea2",
  },
  level: 2,
  parentHierarchyKey: [
    "12354b5a-0466-4a0f-bd66-84961c6527dc",
    "d5082925-ea4d-4f3d-b294-ff10d7b9ec61",
    "2870ea4e-b148-4cb5-addc-9948c98f8ea2",
  ],
  activeHierarchyKey: [
    "12354b5a-0466-4a0f-bd66-84961c6527dc",
    "d5082925-ea4d-4f3d-b294-ff10d7b9ec61",
  ],
};
