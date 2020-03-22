<template>
  <div>
    <h2>Demo modal</h2>
    <p>
      Press "m", "n" or "o" to open the modal with the nav-wheel from anywhere
      on the page.
    </p>
    <button @click="isModalShowing = !isModalShowing">
      Toggle nav wheel via button
    </button>
    <pre class="code-box">
data() {
  return {
    navWheelConfig,
    isModalShowing: false
  };
},
created() {
  window.addEventListener("keydown", this.handleWindowKeydown);
},
destroyed() {
  window.removeEventListener("keydown", this.handleWindowKeydown);
},
methods: {
  handleWindowKeydown({ keyCode }) {
    const KEY_CODES = {
      ESC: 27,
      m: 77,
      n: 78,
      o: 79
    };
    if ([KEY_CODES.m, KEY_CODES.n, KEY_CODES.o].includes(keyCode)) {
      this.isModalShowing = true;
    } else if (keyCode === KEY_CODES.ESC) {
      this.isModalShowing = false;
    }
  }
}
    </pre>
    <modal v-if="isModalShowing" @close="isModalShowing = false">
      <h3 slot="header">Pick a route, then press 'Esc' to close</h3>
      <nav-wheel slot="body" :size="600" :config="navWheelConfig" />
    </modal>
  </div>
</template>

<script>
import navWheelConfig from "../nav-wheel-config";
import routes from "../routes";
import NavWheel from "./nav-wheel.vue";
import Modal from "./modal.vue";
export default {
  components: {
    NavWheel,
    Modal,
  },
  data() {
    return {
      navWheelConfig: {
        routes,
        ...navWheelConfig,
      },
      isModalShowing: false,
    };
  },
  created() {
    window.addEventListener("keydown", this.handleWindowKeydown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleWindowKeydown);
  },
  methods: {
    handleWindowKeydown({ keyCode }) {
      const KEY_CODES = {
        ESC: 27,
        m: 77,
        n: 78,
        o: 79,
      };
      if ([KEY_CODES.m, KEY_CODES.n, KEY_CODES.o].includes(keyCode)) {
        this.isModalShowing = true;
      } else if (keyCode === KEY_CODES.ESC) {
        this.isModalShowing = false;
      }
    },
  },
};
</script>
