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

<style lang="scss">
.codebox {
  height: 500px;
  width: 500px;
  overflow: auto;
}
.simple-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
body {
  font-size: 110%;
  font-family: Arial, Helvetica, sans-serif;
}
h1,
h2 {
  text-decoration: underline;
}
button {
  font-family: "Candara";
  font-weight: bold;
  font-size: 110%;
  background-color: #4caf50; /* Green */
  color: white;
  border-radius: 0.5em;
  transition-duration: 0.4s;
  padding: 1em;
  height: 4em;
}

button:hover {
  background-color: lightgray;
  color: #1f7950;
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
    DemoModal,
  },
};
</script>
