/* eslint-disable no-undef */

import { shallowMount } from "@vue/test-utils";
import CardForm from "../../src/components/CardForm.vue";

describe("CardForm", () => {
  it("renders the component correctly", () => {
    const wrapper = shallowMount(CardForm);
    expect(wrapper.exists()).toBe(true);
  });

  it("emits the 'input-card-name' event on changing the card name input", () => {
    const wrapper = shallowMount(CardForm);
    const inputCardName = "Test Card";
    wrapper.find("input#v-card-name").setValue(inputCardName);
    expect(wrapper.emitted("input-card-name")).toBeTruthy();
    expect(wrapper.emitted("input-card-name")[0][0]).toBe(inputCardName);
  });

  it("emits the 'input-card-number' event on changing the card number input", () => {
    const wrapper = shallowMount(CardForm);
    const inputCardNumber = "1234 5678 9012 3456";
    wrapper.find("input#v-card-number").setValue(inputCardNumber);
    expect(wrapper.emitted("input-card-number")).toBeTruthy();
    expect(wrapper.emitted("input-card-number")[0][0]).toBe(inputCardNumber);
  });

  it("emits the 'input-card-month' event on changing the card expiration month", () => {
    const wrapper = shallowMount(CardForm);
    const inputCardMonth = "05";
    wrapper.find("select#v-card-month").setValue(inputCardMonth);
    expect(wrapper.emitted("input-card-month")).toBeTruthy();
    expect(wrapper.emitted("input-card-month")[0][0]).toBe(inputCardMonth);
  });

  it("emits the 'input-card-year' event on changing the card expiration year", () => {
    const wrapper = shallowMount(CardForm);
    const inputCardYear = 2023;
    wrapper.find("select#v-card-year").setValue(inputCardYear);
    expect(wrapper.emitted("input-card-year")).toBeTruthy();
    expect(wrapper.emitted("input-card-year")[0][0]).toBe(inputCardYear);
  });

  it("emits the 'input-card-cvv' event on changing the card CVV input", () => {
    const wrapper = shallowMount(CardForm);
    const inputCardCvv = "123";
    wrapper.find("input#v-card-cvv").setValue(inputCardCvv);
    expect(wrapper.emitted("input-card-cvv")).toBeTruthy();
    expect(wrapper.emitted("input-card-cvv")[0][0]).toBe(inputCardCvv);
  });


it("toggles the mask on the card number input when the 'Show/Hide card number' button is clicked", async () => {
    const wrapper = shallowMount(CardForm);
    expect(wrapper.vm.isCardNumberMasked).toBe(true);
    const toggleButton = wrapper.find(".card-input__eye");
    const buttonElement = toggleButton.element;
    buttonElement.dispatchEvent(new Event("click"));
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isCardNumberMasked).toBe(false);
  
    // The card number input value should be unmasked
    expect(wrapper.find("input#v-card-number").element.value).toBe(
      wrapper.vm.mainCardNumber
    );
  
    buttonElement.dispatchEvent(new Event("click"));
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isCardNumberMasked).toBe(true);
  
    // The card number input value should be masked
    expect(wrapper.find("input#v-card-number").element.value).toBe(
      wrapper.vm.newFormData.cardNumber
    );
  });
  
});
