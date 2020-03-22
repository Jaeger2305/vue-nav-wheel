export default [
  {
    name: "test-name-1",
    path: "/test1",
    component: {
      template: '<div>test1<font-awesome-icon icon="coffee" /></div>',
    },
  },
  {
    name: "test-name-2",
    path: "/test2",
    component: {
      template: '<div>test2<font-awesome-icon icon="archive" /></div>',
    },
    meta: { navWheel: { style: { stroke: "red" } } },
  },
  {
    name: "test-name-3",
    path: "/test3",
    component: {
      template:
        '<div>test3<font-awesome-icon icon="coffee" /><router-view /></div>',
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
              template:
                '<div><font-awesome-icon icon="child" />subchild-1</div>',
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
  },
  {
    name: "test-name-4",
    path: "/test4",
    component: {
      template: '<div><font-awesome-icon icon="circle" />test4</div>',
    },
  },
];
