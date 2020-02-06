import { shallowMount } from "@vue/test-utils";
import NavWheel from "./nav-wheel.vue";

describe("nav-wheel.vue", () => {
  xit("renders props.msg when passed", () => {});
  xit("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(NavWheel, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
