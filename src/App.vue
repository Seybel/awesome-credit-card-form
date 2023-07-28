<template>
  <div class="wrapper">
    <CardForm
      :form-data="formData"
    />
  </div>
</template>

<script>
import CardForm from "@/components/CardForm.vue";

export default {
  name: "App",
  components: {
    CardForm,
  },

  data() {
    return {
      formData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
    };
  },
};
</script>

<style lang="scss">
@import "../src/app.scss";
</style>
