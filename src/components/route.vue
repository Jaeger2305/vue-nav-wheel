<template>
  <g
    :ref="`route-${route.path}`"
    @click.stop="selectRoute"
    @mouseover.stop="mouseover"
    @mouseleave.stop="mouseleave"
  >
    <path
      :class="['nav-wheel__route-annular', {'nav-wheel__route-annular--visited': showChildren}, {'nav-wheel__route-annular--active': isUnderCursor}]"
      :style="navWheelMeta.style"
      :d="routeArc"
      filter="url(#dropshadow)"
    />
    <defs>
      <mask :id="`route-${route.path}-mask`" x="0" y="0" width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="black" />
        <path :style="{fill: 'white'}" :d="routeArc" />
      </mask>
    </defs>
    <g :mask="`url(#route-${route.path}-mask)`">
      <transition name="ripple" tag="circle">
        <circle
          v-if="isRippling"
          class="nav-wheel__route-ripple"
          :style="{transformOrigin: `${labelCentroid[0]}px  ${labelCentroid[1]}px`}"
          :cx="labelCentroid[0]"
          :cy="labelCentroid[1]"
          :r="rippleRadius"
        />
      </transition>
    </g>
    <text
      :x="labelCentroid[0]"
      :y="labelCentroid[1]"
      class="nav-wheel__route-label"
      @click.stop="goToRoute(route.path)"
    >{{ route.name }}</text>
    <transition-group
      :name="
          navWheelMeta.transitionName || config.constants.defaultTransition
        "
      tag="g"
    >
      <route
        v-for="(child, index) in route.children"
        v-show="showChildren"
        :class="`nav-wheel__route-level-${level + 1}`"
        :key="child.path"
        :route="child"
        :start-radius="outerRadius + config.constants.spaceBetweenParentChild"
        :size="size"
        :start-angle="
            (segmentRadiansWithPadding / route.children.length) * index +
              startAngle -
              config.constants.childAngleSpread * route.children.length
          "
        :end-angle="
            (segmentRadiansWithPadding / route.children.length) * (index + 1) +
              startAngle -
              config.constants.childAngleSpread * route.children.length
          "
        :pad-angle="
            (config.constants.padAngle / route.children.length) * segmentRadiansWithPadding
          "
        :config="config"
        @route-select="$emit('route-select', $event)"
        @route-deselect="$emit('route-deselect', $event)"
        @route-mouseover="$emit('route-mouseover', $event)"
        @route-mouseleave="$emit('route-mouseleave', $event)"
      />
    </transition-group>
  </g>
</template>
<style></style>

<script>
import { arc } from "d3-shape";

export default {
  components: {
    Route: () => import("./route.vue")
  },
  props: {
    route: {
      type: Object,
      required: true
    },
    startAngle: {
      type: Number,
      required: true
    },
    endAngle: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: 1
    },
    startRadius: {
      type: Number,
      required: true
    },
    padAngle: {
      type: Number,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      arcGenerator: arc(),
      showChildren: false,
      isUnderCursor: false,
      isRippling: false
    };
  },
  computed: {
    routeArc() {
      return this.arcGenerator.cornerRadius(
        this.size / this.config.constants.cornerSharpness
      )(this.arcOptions);
    },
    labelCentroid() {
      return this.arcGenerator.centroid(this.arcOptions);
    },
    innerRadius() {
      return this.startRadius;
    },
    outerRadius() {
      return (
        this.size / this.config.constants.shrinkRouteScale + this.startRadius
      );
    },
    segmentRadiansWithPadding() {
      return (
        this.segmentRadians +
        this.config.constants.childAngleSpread *
        2 * // Adds the padding at the start and end.
          (this.route.children || []).length
      );
    },
    segmentRadians() {
      return this.endAngle - this.startAngle;
    },
    rippleRadius() {
      const ratio = this.segmentRadians / (2 * Math.PI);
      return ratio * this.outerRadius;
    },
    arcOptions() {
      return {
        innerRadius: this.innerRadius,
        outerRadius: this.outerRadius,
        startAngle: this.startAngle,
        endAngle: this.endAngle,
        padAngle: this.padAngle
      };
    },
    navWheelMeta() {
      return (this.route.meta || {}).navWheel || {};
    }
  },
  methods: {
    goToRoute(path) {
      this.$router.push({ path });
    },
    selectRoute($event) {
      this.isRippling = true;
      // Debounce the rippling, so the effect isn't relentless.
      setTimeout(() => (this.isRippling = false), 500);
      this.showChildren = !this.showChildren;
      this.$emit(this.showChildren ? "route-select" : "route-deselect", $event);
    },
    mouseover() {
      this.isUnderCursor = true;
      this.$emit("route-mouseover", this.route);
    },
    mouseleave() {
      this.isUnderCursor = false;
      this.$emit("route-mouseleave", this.route);
    }
  }
};
</script>
