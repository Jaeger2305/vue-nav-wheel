<template>
  <div>
    <!-- <input v-model.number="scale" type="range" min="0.5" max="1.5" step="0.1" />
    <span>{{ scale }}</span>-->
    <svg
      class="nav-wheel__svg"
      :width="size"
      :height="size"
      @mousemove="panSvg"
      @mouseleave="resetPan"
      @mousewheel.prevent="scaleSvg"
    >
      <nav-wheel-defs />
      <g
        :transform="
          `translate(${panTranslation[0]}, ${panTranslation[1]}),
          scale(${scale}, ${scale})`
        "
      >
        <g :transform="`translate(${size / scale / 2}, ${size / scale / 2})`">
          <route
            v-for="(route, index) in routes"
            class="nav-wheel__routes-0"
            :key="route.path"
            :route="route"
            :start-angle="((2 * Math.PI) / routes.length) * index"
            :end-angle="((2 * Math.PI) / routes.length) * (index + 1)"
            :pad-angle="
              (config.constants.padAngle / routes.length) * (2 * Math.PI)
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
import NavWheelDefs from "./nav-wheel-defs";

export default {
  components: {
    Route,
    NavWheelDefs
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
    },
    routes() {
      return this.config.routes.filter(
        ({ meta }) => !((meta || {}).navWheel || {}).isHidden
      );
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
