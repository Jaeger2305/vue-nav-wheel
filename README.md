# vue-nav-wheel

A lightweight and customisable component using SVG that takes a basic [vue-router](https://www.npmjs.com/package/vue-router) config and renders it radially.

There is a [demo page](https://vue-nav-wheel-demo.netlify.com/#/) which also serves as documentation.

## Getting started

```
npm install vue-nav-wheel
```

In the app entrypoint file (main.js)

```
import NavWheel from "vue-nav-wheel";
import("vue-nav-wheel/dist/nav-wheel.css");
Vue.component("nav-wheel", NavWheel);
```

Use the component with 2 parameters, as size and a config

```
<nav-wheel :size="600" :config="navWheelConfig" />
```

### CSS Styling customisation

Take a look at `node_modules/vue-nav-wheel/dist/nav-wheel.css` for the available classes to style.
A custom css file with some or all of those classes can be loaded to override that stylesheet. There are some examples in the demo site.

```
import("./nav-wheel-overrides.css")
```

### Nav wheel styling/functional toggles

Take a look at the parameters available in `node_modules/vue-nav-wheel/src/nav-wheel-config.js` for the configurable parameters.

```
{
    padAngle: 0.04,
    spaceBetweenParentChild: 10,
    shrinkRouteScale: 5,
    scale: 1,
    cornerSharpness: 100,
    startRadius: 100,
    childAngleSpread: 0.04,
    defaultTransition: "fade",
    isPanOnSelectEnabled: true, // For touch, should the touched route be panned into focus.
    isPanOnMouseMoveEnabled: true, // Pan according to the currently mouse position.
    hierarchyLevelsDisplayLimit: 3, // The limit of levels of hierarchy to display at once.
    hierarchyLevelFocus: 2 // The limit at which routes stop displaying the parent's hierarchy.
  }
```

## Development guidelines

Built using Vue CLI, so the normal commands will work for setting up your development environment

### Project setup for hot-reload of the demo page

```
npm install
npm run test
npm run serve
```

### Build the project for production (hosted on Netlify)

```
npm run build:demo
```
