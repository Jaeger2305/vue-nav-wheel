<template>
  <div>
    <!-- Show configuring the shapes -->
    <demo-shapes />
    <hr />
    <!-- Show configuring the styles -->
    <demo-styles />
    <hr />
    <!-- Show configuring the functionality -->
    <demo-functionality />
    <hr />
    <!-- Show adding something into the slot -->
    <demo-slot />
    <hr />
    <!-- Show disabling/hiding routes -->
    <demo-conditional />
    <hr />
    <!-- Show using a modal and hot key -->
    <demo-modal />
    <hr />
    <!-- API -->
    <!-- properties -->
    <!-- events -->
    <!-- slots -->
  </div>
</template>

<style lang="scss" scoped>
::v-deep .codebox {
  height: 500px;
  width: 500px;
  overflow: auto;
}
::v-deep .simple-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<script>
import DemoShapes from "./demo-shapes";
import DemoStyles from "./demo-styles";
import DemoFunctionality from "./demo-functionality";
import DemoSlot from "./demo-slot";
import DemoConditional from "./demo-conditional";
import DemoModal from "./demo-modal";
export default {
  components: {
    DemoShapes,
    DemoStyles,
    DemoFunctionality,
    DemoSlot,
    DemoConditional,
    DemoModal
  }
};
</script>
