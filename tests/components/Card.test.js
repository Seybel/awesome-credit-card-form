/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import CardComp from '../../src/components/Card.vue';


describe('Card', () => {
    it('renders the component', () => {
      const wrapper = shallowMount(CardComp);
  
      expect(wrapper.exists()).toBe(true);
    });
  });


  