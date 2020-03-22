<template>
  <div>
    <svg
      class="nav-wheel__svg"
      :width="size"
      :height="size"
      @touchmove="touchmove"
      @touchend="touchend"
      @mousemove="panSvg"
      @mouseleave="resetPan"
      @wheel.prevent="scaleSvg"
    >
      <nav-wheel-defs />
      <g
        :transform="`translate(${panTranslation[0]}, ${panTranslation[1]}),
          scale(${scale}, ${scale})`"
      >
        <g :transform="`translate(${size / scale / 2}, ${size / scale / 2})`">
          <route
            v-for="(route, index) in routes"
            class="nav-wheel__routes-0"
            :id="route.path"
            :key="route.path"
            :route="route"
            :is-parent-active-route="activeRoute.path === route.path"
            :start-angle="((2 * Math.PI) / routes.length) * index"
            :end-angle="((2 * Math.PI) / routes.length) * (index + 1)"
            :pad-angle="
              (config.constants.padAngle / routes.length) * (2 * Math.PI)
            "
            :start-radius="config.constants.startRadius"
            :config="config"
            :size="size"
            :active-route="activeRoute"
            :active-hierarchy-key="activeHierarchyKey"
            :parent-hierarchy-key="[route.hierarchyKey]"
            @route-select="
              ($event) => {
                $emit('route-select', $event);
                activeRoute = $event;
              }
            "
            @route-deselect="$emit('route-deselect', $event)"
            @route-mouseover="$emit('route-mouseover', $event)"
            @route-mouseleave="$emit('route-mouseleave', $event)"
            @disabled-select="$emit('disabled-select', $event)"
            @update-hierarchy="activeHierarchyKey = $event"
            @pan-route="panToTargetRect"
          />
          <g
            :transform="`translate(${centerTranslation[0]}, ${centerTranslation[1]}), scale(${centerScale}, ${centerScale})`"
          >
            <slot name="center" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style>
@import "./nav-wheel.css";
</style>

<script>
import Route from "./route";
import NavWheelDefs from "./nav-wheel-defs";
import uuidv4 from "uuid/v4";

export default {
  components: {
    Route,
    NavWheelDefs,
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      scale: this.config.constants.scale,
      panCoords: [
        this.size / this.config.constants.scale / 2,
        this.size / this.config.constants.scale / 2,
      ],
      centerSlotBox: { width: 100, height: 100 },
      initialSize: this.size,
      activeRoute: {},
      activeHierarchyKey: [],
      touches: [],
    };
  },
  computed: {
    panTranslation() {
      return [
        -(this.panCoords[0] - this.size / 2) * this.scale,
        -(this.panCoords[1] - this.size / 2) * this.scale,
      ];
    },
    centerScale() {
      return (
        ((this.config.constants.startRadius / this.centerSlotBox.width) *
          this.initialSize) /
        this.size
      );
    },
    centerTranslation() {
      return [
        (-this.centerSlotBox.width * this.config.constants.startRadius) /
          this.centerSlotBox.width /
          2,
        (-this.centerSlotBox.height * this.config.constants.startRadius) /
          this.centerSlotBox.height /
          2,
      ];
    },
    keyedRoutes() {
      return this.config.routes.map((route) => ({
        ...route,
        hierarchyKey: uuidv4(),
      }));
    },
    routes() {
      return this.keyedRoutes.filter(
        ({ meta, hierarchyKey }) =>
          !((meta || {}).navWheel || {}).isHidden &&
          (this.activeHierarchyKey.includes(hierarchyKey) ||
            !this.activeHierarchyKey.length)
      );
    },
  },
  methods: {
    scaleSvg($event) {
      this.scale -= $event.deltaY / 1000;
    },
    touchmove(e) {
      if (e.touches.length < 2) return;
      const previousTouches =
        this.touches.length < 2 ? e.touches : this.touches;
      this.touches = e.touches;

      const previousDistance = Math.hypot(
        previousTouches[0].pageX - previousTouches[1].pageX,
        previousTouches[0].pageY - previousTouches[1].pageY
      );

      const newDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      this.scaleSvg({ deltaY: previousDistance - newDistance });
    },
    touchend() {
      this.touches = [];
    },
    panSvg($event) {
      if (!this.config.constants.isPanOnMouseMoveEnabled) return;

      this.panCoords = [Math.abs($event.offsetX), Math.abs($event.offsetY)];
    },
    resetPan() {
      this.panCoords = [this.size / 2, this.size / 2];
    },
    panToTargetRect(targetRect) {
      if (!this.config.constants.isPanOnSelectEnabled) return;

      this.panCoords = [
        this.size / 2 + (targetRect.x + targetRect.width / 2),
        this.size / 2 + (targetRect.y + targetRect.height / 2),
      ];
    },
  },
  mounted() {
    // Reposition the slot to be inline with the radial wheel.
    if (this.$slots.center) {
      if (this.$slots.center.length > 1)
        throw new Error(
          "Expecting only one element, please wrap in a <g> tag."
        );
      this.centerSlotBox = this.$slots.center[0].elm.getBBox();
    }
  },
  watch: {
    $route() {
      this.$emit("route-change");
    },
  },
};
</script>
