<template>
  <div>
    <input v-model.number="scale" type="range" min="0.5" max="1.5" step="0.1" />
    <span>{{ scale }}</span>
    <svg
      class="nav-wheel__svg"
      :width="size"
      :height="size"
      @mousemove="panSvg"
      @mouseleave="resetPan"
      @mousewheel.prevent="scaleSvg"
    >
      <defs xmlns="http://www.w3.org/2000/svg">
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feMerge>
            <feMergeNode in="offsetblur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="linear-gradient" gradientTransform="rotate(65)">
          <stop class="linear-gradient-stop-1" offset="0%" />
          <stop class="linear-gradient-stop-2" offset="50%" />
          <stop class="linear-gradient-stop-3" offset="100%" />
        </linearGradient>
        <linearGradient id="linear-gradient--visited" gradientTransform="rotate(65)">
          <stop class="linear-gradient-stop-1--visited" offset="0%" />
          <stop class="linear-gradient-stop-2--visited" offset="50%" />
          <stop class="linear-gradient-stop-3--visited" offset="100%" />
        </linearGradient>
        <linearGradient id="linear-gradient--active" gradientTransform="rotate(65)">
          <stop class="linear-gradient-stop-1--active" offset="0%" />
          <stop class="linear-gradient-stop-2--active" offset="50%" />
          <stop class="linear-gradient-stop-3--active" offset="100%" />
        </linearGradient>
        <linearGradient id="linear-gradient--hover" gradientTransform="rotate(65)">
          <stop class="linear-gradient-stop-1--hover" offset="0%" />
          <stop class="linear-gradient-stop-2--hover" offset="50%" />
          <stop class="linear-gradient-stop-3--hover" offset="100%" />
        </linearGradient>
      </defs>
      <g
        :transform="
          `translate(${panTranslation[0]}, ${panTranslation[1]}),
          scale(${scale}, ${scale})`
        "
      >
        <g :transform="`translate(${size / scale / 2}, ${size / scale / 2})`">
          <route
            v-for="(route, index) in config.routes"
            class="nav-wheel__routes-0"
            :key="route.path"
            :route="route"
            :start-angle="((2 * Math.PI) / config.routes.length) * index"
            :end-angle="((2 * Math.PI) / config.routes.length) * (index + 1)"
            :pad-angle="
              (config.constants.padAngle / config.routes.length) * (2 * Math.PI)
            "
            :start-radius="config.constants.startRadius"
            :config="config"
            :size="size"
            @route-select="$emit('route-select', $event)"
            @route-deselect="$emit('route-deselect', $event)"
            @route-mouseover="$emit('route-mouseover', $event)"
            @route-mouseleave="$emit('route-mouseleave', $event)"
          />
          <g
            :transform="
              `translate(${centerTranslation[0]}, ${centerTranslation[1]}), scale(${centerScale}, ${centerScale})`
            "
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

export default {
  components: {
    Route
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      scale: this.config.constants.scale,
      panCoords: [
        this.size / this.config.constants.scale / 2,
        this.size / this.config.constants.scale / 2
      ],
      centerSlotBox: { width: 100, height: 100 },
      initialSize: this.size
    };
  },
  computed: {
    panTranslation() {
      return [
        -(this.panCoords[0] - this.size / 2),
        -(this.panCoords[1] - this.size / 2)
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
          2
      ];
    }
  },
  methods: {
    panSvg($event) {
      this.panCoords = [Math.abs($event.offsetX), Math.abs($event.offsetY)];
    },
    scaleSvg($event) {
      this.scale -= $event.deltaY / 1000;
    },
    resetPan() {
      this.panCoords = [this.size / 2, this.size / 2];
    }
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
    }
  }
};
</script>
