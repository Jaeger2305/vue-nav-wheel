<template>
  <div class="config-container">
    <div class="input-container">
      <label>Pan on select (affects touchscreens)</label>
      <input v-model="inputIsPanOnSelectEnabled" type="checkbox" />
    </div>
    <div class="input-container">
      <label>Pan on mousemove</label>
      <input v-model="inputIsPanOnMouseMoveEnabled" type="checkbox" />
    </div>
    <div class="input-container">
      <label>Hierarchy levels display limit</label>
      <input
        v-model.number="inputHierarchyLevelsDisplayLimit"
        type="range"
        min="1"
        max="5"
        step="1"
      />
    </div>
    <div class="input-container">
      <label>Hierarchy level at which to focus</label>
      <input
        v-model.number="inputHierarchyLevelFocus"
        type="range"
        min="1"
        max="5"
        step="1"
      />
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
}
</style>

<script>
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
export default {
  props: {
    isPanOnSelectEnabled: {
      type: Boolean,
      required: true
    },
    isPanOnMouseMoveEnabled: {
      type: Boolean,
      required: true
    },
    hierarchyLevelsDisplayLimit: {
      type: Number,
      required: true
    },
    hierarchyLevelFocus: {
      type: Number,
      required: true
    }
  },
  computed: {
    inputIsPanOnSelectEnabled: {
      get() {
        return this.isPanOnSelectEnabled;
      },
      set(isPanOnSelectEnabled) {
        this.$emit("update:isPanOnSelectEnabled", isPanOnSelectEnabled);
      }
    },
    inputIsPanOnMouseMoveEnabled: {
      get() {
        return this.isPanOnMouseMoveEnabled;
      },
      set(isPanOnMouseMoveEnabled) {
        this.$emit("update:isPanOnMouseMoveEnabled", isPanOnMouseMoveEnabled);
      }
    },
    inputHierarchyLevelsDisplayLimit: {
      get() {
        return this.hierarchyLevelsDisplayLimit;
      },
      set(hierarchyLevelsDisplayLimit) {
        this.$emit(
          "update:hierarchyLevelsDisplayLimit",
          hierarchyLevelsDisplayLimit
        );
      }
    },
    inputHierarchyLevelFocus: {
      get() {
        return this.hierarchyLevelFocus;
      },
      set(hierarchyLevelFocus) {
        this.$emit("update:hierarchyLevelFocus", hierarchyLevelFocus);
      }
    }
  },
  methods: {
    randomize() {
      this.inputIsPanOnSelectEnabled = Math.random() > 0.5;
      this.inputIsPanOnMouseMoveEnabled = Math.random() > 0.5;
      this.inputHierarchyLevelsDisplayLimit = randomInRange(1, 5);
      this.inputHierarchyLevelFocus = randomInRange(1, 5);
    }
  }
};
</script>
