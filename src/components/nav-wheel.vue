<template>
  <div>
    <input v-model.number="scale" type="range" min="0.5" max="1.5" step="0.1" />
    <svg :width="size" :height="size" style="border: solid" @mousemove="log">
    <span>{{ scale }}</span>
      <g
        :transform="
          `translate(${panTranslation[0]}, ${panTranslation[1]}),
          scale(${scale}, ${scale})`
        "
      >
        <route
          v-for="(route, index) in config.routes"
          :key="route.path"
          :route="route"
          :start-angle="((2 * Math.PI) / config.routes.length) * index"
          :end-angle="((2 * Math.PI) / config.routes.length) * (index + 1)"
          :pad-angle="config.constants.padAngle / config.routes.length * (2 * Math.PI)"
          :config="config"
          :size="size"
          :transform="`translate(${size / scale / 2}, ${size / scale / 2})`"
          @clicked="log"
        />
      </g>
    </svg>
  </div>
</template>

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
      mouse: [
        this.size / this.config.constants.scale / 2,
        this.size / this.config.constants.scale / 2
      ],
    };
  },
  computed: {
    panTranslation() {
      return [
        -(this.mouse[0] - this.size / 2),
        -(this.mouse[1] - this.size / 2)
      ];
    }
  },
  methods: {
    log($event) {
      // eslint-disable-next-line no-console
      console.log($event);
      this.mouse = [Math.abs($event.offsetX), Math.abs($event.offsetY)];
    }
  },
  watch: {
    $route() {
      this.$emit("route-change");
    }
  }
};
</script>
