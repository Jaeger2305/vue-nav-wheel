<template>
  <g
    :ref="`route-${route.path}`"
    @click.stop="selectRoute(route)"
    @mouseover.stop="mouseover"
    @mouseleave.stop="mouseleave"
  >
    <path
      v-if="isParentRouteVisible"
      :class="[
        'nav-wheel__route-annular',
        `nav-wheel__route-annular-${level}`,
        { 'nav-wheel__route-annular--disabled': navWheelMeta.isDisabled },
        { 'nav-wheel__route-annular--visited': isActiveRoute },
        { 'nav-wheel__route-annular--active': isUnderCursor }
      ]"
      :style="navWheelMeta.style"
      :d="routeArc"
      filter="url(#dropshadow)"
    />
    <defs>
      <mask :id="`route-${route.path}-mask`" x="0" y="0" width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="black" />
        <path :style="{ fill: 'white' }" :d="routeArc" />
      </mask>
    </defs>
    <g :mask="`url(#route-${route.path}-mask)`">
      <transition name="ripple" tag="circle">
        <circle
          v-if="isRippling"
          class="nav-wheel__route-ripple"
          :style="{
            transformOrigin: `${labelCentroid[0]}px  ${labelCentroid[1]}px`
          }"
          :cx="labelCentroid[0]"
          :cy="labelCentroid[1]"
          :r="rippleRadius"
        />
      </transition>
    </g>
    <text
      v-if="isParentRouteVisible"
      :x="labelCentroid[0]"
      :y="labelCentroid[1]"
      :class="[
        'nav-wheel__route-label',
        { 'nav-wheel__route-label--disabled': navWheelMeta.isDisabled }
      ]"
      @click.stop="goToRoute(route.path)"
    >{{ route.name }}</text>
    <transition-group
      :name="navWheelMeta.transitionName || config.constants.defaultTransition"
      tag="g"
    >
      <route
        v-for="(child, index) in childRoutes"
        :class="`nav-wheel__route-level-${level + 1}`"
        :key="child.path"
        :level="level + 1"
        :active-route="activeRoute"
        :active-hierarchy-key="activeHierarchyKey"
        :parent-hierarchy-key="[...parentHierarchyKey, child.hierarchyKey]"
        :route="child"
        :start-radius="isParentRouteVisible ? outerRadius + config.constants.spaceBetweenParentChild : startRadius"
        :size="size"
        :start-angle="
          (segmentRadiansWithPadding / childRoutes.length) * index +
            startAngle -
            config.constants.childAngleSpread * childRoutes.length
        "
        :end-angle="
          (segmentRadiansWithPadding / childRoutes.length) * (index + 1) +
            startAngle -
            config.constants.childAngleSpread * childRoutes.length
        "
        :pad-angle="
          (config.constants.padAngle / childRoutes.length) *
            segmentRadiansWithPadding
        "
        :config="config"
        @route-select="$emit('route-select', $event)"
        @route-deselect="$emit('route-deselect', $event)"
        @route-mouseover="$emit('route-mouseover', $event)"
        @route-mouseleave="$emit('route-mouseleave', $event)"
        @update-hierarchy="$emit('update-hierarchy', $event)"
      />
    </transition-group>
  </g>
</template>
<style></style>

<script>
import { arc } from "d3-shape";
import uuidv4 from "uuid/v4";
import { intersection } from "lodash";

export default {
  components: {
    Route: () => import("./route.vue")
  },
  props: {
    route: {
      type: Object,
      required: true
    },
    activeRoute: {
      type: Object,
      required: false,
      default: () => ({})
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
    },
    parentHierarchyKey: {
      type: Array,
      required: true
    },
    activeHierarchyKey: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      arcGenerator: arc(),
      isUnderCursor: false,
      isRippling: false
    };
  },
  computed: {
    keyedChildRoutes() {
      return (this.route.children || [])
        .map(route => ({
          ...route,
          hierarchyKey: uuidv4()
        }))
        .filter(({ meta }) => !((meta || {}).navWheel || {}).isHidden);
    },
    childRoutes() {
      return this.navWheelMeta.isDisabled
        ? []
        : this.keyedChildRoutes.filter(({ hierarchyKey }) => {
            const commonAncestorHierarchyDepth = intersection(
              this.activeHierarchyKey,
              this.parentHierarchyKey
            ).length;
            const distanceFromCommonAncestor =
              this.activeHierarchyKey.length - commonAncestorHierarchyDepth;
            const isChildInDrawDistance =
              this.activeHierarchyKey.includes(hierarchyKey) ||
              distanceFromCommonAncestor <
                this.config.constants.hierarchyLevelsDisplayLimit;
            const isChildInFocusDistance =
              distanceFromCommonAncestor <
              this.config.constants.hierarchyLevelFocus;
            const isActiveRoute =
              this.activeHierarchyKey.slice(-1)[0] ===
              this.parentHierarchyKey.slice(-1)[0];
            return (
              (isChildInFocusDistance ||
                this.activeHierarchyKey.includes(hierarchyKey) ||
                isActiveRoute) &&
              this.isRouteShowingChildren &&
              isChildInDrawDistance
            );
          });
    },
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
          this.childRoutes.length
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
    },
    isActiveRoute() {
      return (
        this.activeHierarchyKey.slice(-1)[0] ===
        this.parentHierarchyKey.slice(-1)[0]
      );
    },
    isRouteShowingChildren() {
      return this.activeHierarchyKey.includes(this.route.hierarchyKey);
    },
    isParentRouteVisible() {
      const commonAncestorHierarchyDepth = intersection(
        this.activeHierarchyKey,
        this.parentHierarchyKey
      ).length;
      const distanceFromCommonAncestor =
        this.activeHierarchyKey.length - commonAncestorHierarchyDepth;
      return (
        distanceFromCommonAncestor <
        this.config.constants.hierarchyLevelsDisplayLimit
      );
    }
  },
  methods: {
    goToRoute(path) {
      if (this.navWheelMeta.isDisabled) return;
      this.$router.push({ path });
    },
    selectRoute($event) {
      if (this.navWheelMeta.isDisabled) {
        this.$emit("disabled-select", $event);
        return;
      }
      this.isRippling = true;
      // Debounce the rippling, so the effect isn't relentless.
      setTimeout(() => (this.isRippling = false), 500);
      this.$emit(
        "update-hierarchy",
        !this.isRouteShowingChildren
          ? this.parentHierarchyKey
          : this.parentHierarchyKey.slice(0, -1)
      );
      this.$emit("route-select", $event);
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
