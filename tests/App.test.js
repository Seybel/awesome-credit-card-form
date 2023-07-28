/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import App from '../src/App.vue';

describe('App.vue', () => {
  it('renders without errors', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.exists()).toBe(true);
  });
});
