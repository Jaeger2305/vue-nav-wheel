<template>
  <div class="simple-flex">
    <div v-if="isShowingCode" class="codebox">
      <slot name="code"></slot>
    </div>
    <nav-wheel :size="600" :config="navWheelConfig" />
  </div>
</template>

<script>
import NavWheel from "./nav-wheel.vue";
export default {
  components: {
    NavWheel,
  },
  props: {
    isShowingCode: {
      type: Boolean,
      default: true,
    },
    navWheelConfig: {
      type: Object,
      required: true,
    },
  },
};
</script>
