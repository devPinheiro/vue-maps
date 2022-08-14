import { mount } from "@vue/test-utils";
import Aside from "../../src/components/Aside.vue";

test("renders a list label in Aside", () => {
  const wrapper = mount(Aside);

  const aside = wrapper.get('[data-test="Buildings"]');

  expect(aside.text()).toBe("Building");
});
