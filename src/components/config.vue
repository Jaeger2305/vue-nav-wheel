<template>
  <div class="config-container">
    <div class="input-container">
      <input
        v-model.number="inputPadAngle"
        type="range"
        min="0"
        max="0.5"
        step="0.01"
      />
      <label>Pad angle</label>
    </div>
    <div class="input-container">
      <input
        v-model.number="inputSpaceBetweenParentChild"
        type="range"
        min="0"
        max="100"
        step="1"
      />
      <label>Space between parent and child</label>
    </div>
    <div class="input-container">
      <input
        v-model.number="inputShrinkRouteScale"
        type="range"
        min="1"
        max="10"
        step="1"
      />
      <label>Shrink route scale</label>
    </div>
    <div class="input-container">
      <input
        v-model.number="inputCornerSharpness"
        type="range"
        min="0"
        max="300"
        step="10"
      />
      <label>Corner sharpness</label>
    </div>
    <div class="input-container">
      <input
        v-model.number="inputStartRadius"
        type="range"
        min="0"
        max="300"
        step="10"
      />
      <label>Start radius</label>
    </div>
    <div class="input-container">
      <input
        v-model.number="inputChildAngleSpread"
        type="range"
        min="0"
        max="0.5"
        step="0.01"
      />
      <label>Child angle spread</label>
    </div>
    <button @click="randomize">Randomize</button>
  </div>
</template>

<style>
.config-container {
  display: flex;
}
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
  width: 10em;
}
label {
  text-align: center;
}
</style>

<script>
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
export default {
  props: {
    padAngle: {
      type: Number,
      required: true
    },
    spaceBetweenParentChild: {
      type: Number,
      required: true
    },
    shrinkRouteScale: {
      type: Number,
      required: true
    },
    scale: {
      type: Number,
      required: true
    },
    cornerSharpness: {
      type: Number,
      required: true
    },
    startRadius: {
      type: Number,
      required: true
    },
    childAngleSpread: {
      type: Number,
      required: true
    }
  },
  computed: {
    inputPadAngle: {
      get() {
        return this.padAngle;
      },
      set(padAngle) {
        this.$emit("update:padAngle", padAngle);
      }
    },
    inputSpaceBetweenParentChild: {
      get() {
        return this.spaceBetweenParentChild;
      },
      set(spaceBetweenParentChild) {
        this.$emit("update:spaceBetweenParentChild", spaceBetweenParentChild);
      }
    },
    inputShrinkRouteScale: {
      get() {
        return this.shrinkRouteScale;
      },
      set(shrinkRouteScale) {
        this.$emit("update:shrinkRouteScale", shrinkRouteScale);
      }
    },
    inputScale: {
      get() {
        return this.scale;
      },
      set(scale) {
        this.$emit("update:scale", scale);
      }
    },
    inputCornerSharpness: {
      get() {
        return this.cornerSharpness;
      },
      set(cornerSharpness) {
        this.$emit("update:cornerSharpness", cornerSharpness);
      }
    },
    inputStartRadius: {
      get() {
        return this.startRadius;
      },
      set(startRadius) {
        this.$emit("update:startRadius", startRadius);
      }
    },
    inputChildAngleSpread: {
      get() {
        return this.childAngleSpread;
      },
      set(childAngleSpread) {
        this.$emit("update:childAngleSpread", childAngleSpread);
      }
    }
  },
  methods: {
    randomize() {
      this.inputPadAngle = randomInRange(0, 0.5);
      this.inputSpaceBetweenParentChild = randomInRange(0, 100);
      this.inputShrinkRouteScale = randomInRange(1, 10);
      this.inputScale = randomInRange(0, 2);
      this.inputCornerSharpness = randomInRange(0, 300);
      this.inputStartRadius = randomInRange(0, 300);
      this.inputChildAngleSpread = randomInRange(0, 0.5);
    }
  }
};
</script>
