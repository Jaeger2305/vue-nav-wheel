<template>
  <g @click.stop="selectRoute">
    <g>
      <path
        class="route-annular"
        fill="blue"
        :stroke="route.meta.navWheel.style.stroke"
        :d="routeArc"
      />
      <text
        :x="labelCentroid[0]"
        :y="labelCentroid[1]"
        class="route-label"
        @click.stop="goToRoute(route.path)"
        >{{ route.name }}</text
      >
      <route
        v-for="(child, index) in route.children"
        v-show="showChildren"
        :key="child.path"
        :route="child"
        :start-radius="outerRadius + config.constants.spaceBetweenParentChild"
        :size="size"
        :start-angle="
          (segmentRadians / route.children.length) * index +
            startAngle -
            config.constants.childAngleSpread * route.children.length
        "
        :end-angle="
          (segmentRadians / route.children.length) * (index + 1) +
            startAngle -
            config.constants.childAngleSpread * route.children.length
        "
        :pad-angle="
          (config.constants.padAngle / route.children.length) * segmentRadians
        "
        :config="config"
      />
    </g>
  </g>
</template>
<style>
.route-annular {
  fill: darkblue;
  stroke: red;
}
.route-annular:hover {
  fill: navy;
  stroke: red;
}
.route-label {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 12px;
  font-weight: bold;
  fill: white;
  text-anchor: middle;
  cursor: pointer;
}
.route-label:hover {
  fill: purple;
}
</style>

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
    }
  },
  data() {
    return {
      arcGenerator: arc(),
      showChildren: false
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
    segmentRadians() {
      return (
        this.endAngle -
        this.startAngle +
        this.config.constants.childAngleSpread * 2 * this.route.children.length
      );
    },
    arcOptions() {
      return {
        innerRadius: this.innerRadius,
        outerRadius: this.outerRadius,
        startAngle: this.startAngle,
        endAngle: this.endAngle,
        padAngle: this.padAngle
      };
    }
  },
  methods: {
    goToRoute(path) {
      this.$router.push({ path });
    },
    selectRoute($event) {
      this.showChildren = !this.showChildren;
      this.$emit("clicked", $event);
    }
  }
};
</script>
