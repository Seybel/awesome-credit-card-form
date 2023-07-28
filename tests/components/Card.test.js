/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import CardComp from '../../src/components/Card.vue';


describe('Card', () => {
    it('renders the component', () => {
      const wrapper = shallowMount(CardComp);
  
      expect(wrapper.exists()).toBe(true);
    });

    // it('renders card number correctly', () => {
    //     const labels = { cardNumber: '1234567812345678' };
    //     const wrapper = shallowMount(CardComp, {
    //       propsData: { labels },
    //     });
    
    //     // Ensure the card number is rendered correctly
    //     const cardNumberElement = wrapper.find('.card-item__number');
    //     expect(cardNumberElement.text()).toBe('1234 5678 1234 5678');
    //   });
    it('changes the placeholder when the card type changes', async () => {
        const labels = { cardNumber: '4111111111111111' }; // VISA card number
        const wrapper = shallowMount(CardComp, {
          propsData: { labels },
        });
    
        // Ensure the default card type is VISA and the placeholder is correct
        expect(wrapper.vm.cardType).toBe('visa');
        expect(wrapper.vm.currentPlaceholder).toBe('#### #### #### ####');
    
        // Update the card number to be an American Express card number
        await wrapper.setProps({ labels: { cardNumber: '378282246310005' } });
    
        // Ensure the card type is now 'amex' and the placeholder is updated
        expect(wrapper.vm.cardType).toBe('amex');
        expect(wrapper.vm.currentPlaceholder).toBe('#### ###### #####');
      });
    
  });


  