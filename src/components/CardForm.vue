<template>
  <div class="card-form">
    <div class="card-list">
      <Card
        :fields="fields"
        :labels="newFormData"
        :isCardNumberMasked="isCardNumberMasked"
        :randomBackgrounds="randomBackgrounds"
        :backgroundImage="backgroundImage"
      />
    </div>
    <div class="card-form__inner">
      <div class="card-input">
        <label for="cardNumber" class="card-input__label">{{
          cardForm.cardNumber
        }}</label>
        <input
          type="tel"
          :id="fields.cardNumber"
          @input="changeNumber"
          @focus="focusCardNumber"
          @blur="blurCardNumber"
          class="card-input__input"
          :value="newFormData.cardNumber"
          :maxlength="cardNumberMaxLength"
          data-card-field
          autocomplete="off"
        />
        <button
          class="card-input__eye"
          :class="{ '-active': !isCardNumberMasked }"
          title="Show/Hide card number"
          tabindex="-1"
          :disabled="newFormData.cardNumber === ''"
          @click="toggleMask"
        ></button>
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label">{{
          cardForm.cardName
        }}</label>
        <input
          type="text"
          :id="fields.cardName"
          v-letter-only
          @input="changeName"
          class="card-input__input"
          :value="newFormData.cardName"
          data-card-field
          autocomplete="off"
        />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label">{{
              cardForm.expirationDate
            }}</label>
            <select
              class="card-input__input -select"
              :id="fields.cardMonth"
              v-model="newFormData.cardMonth"
              @change="changeMonth"
              data-card-field
            >
              <option value disabled selected>
                {{ cardForm.month }}
              </option>
              <option
                :value="n < 10 ? '0' + n : n"
                v-for="n in 12"
                :disabled="n < minCardMonth"
                :key="n"
              >
                {{ generateMonthValue(n) }}
              </option>
            </select>
            <select
              class="card-input__input -select"
              :id="fields.cardYear"
              v-model="newFormData.cardYear"
              @change="changeYear"
              data-card-field
            >
              <option value disabled selected>{{ cardForm.year }}</option>
              <option
                :value="$index + minCardYear"
                v-for="(n, $index) in 12"
                :key="n"
              >
                {{ $index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">{{
              cardForm.CVV
            }}</label>
            <input
              type="tel"
              class="card-input__input"
              v-number-only
              :id="fields.cardCvv"
              maxlength="4"
              :value="newFormData.cardCvv"
              @input="changeCvv"
              data-card-field
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <button class="card-form__button" @click="invaildCard">Submit</button>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  name: "CardForm",
  directives: {
    "number-only": {
      bind(el) {
        function checkValue(event) {
          event.target.value = event.target.value.replace(/[^0-9]/g, "");
          if (event.charCode >= 48 && event.charCode <= 57) {
            return true;
          }
          event.preventDefault();
        }
        el.addEventListener("keypress", checkValue);
      },
    },
    "letter-only": {
      bind(el) {
        function checkValue(event) {
          if (event.charCode >= 48 && event.charCode <= 57) {
            event.preventDefault();
          }
          return true;
        }
        el.addEventListener("keypress", checkValue);
      },
    },
  },

  props: {
    formData: {
      type: Object,
      default: () => {
        return {
          cardName: "",
          cardNumber: "",
          cardNumberNotMask: "",
          cardMonth: "",
          cardYear: "",
          cardCvv: "",
        };
      },
    },
    backgroundImage: [String, Object],
    randomBackgrounds: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    Card,
  },

  data() {
    return {
      newFormData: {},
      fields: {
        cardNumber: "v-card-number",
        cardName: "v-card-name",
        cardMonth: "v-card-month",
        cardYear: "v-card-year",
        cardCvv: "v-card-cvv",
      },
      cardForm: {
        cardNumber: "Card Number",
        cardName: "Card Name",
        expirationDate: "Expiration Date",
        month: "Month",
        year: "Year",
        CVV: "CVV",
        invalidCardNumber: "Invalid Card Number",
      },
      minCardYear: new Date().getFullYear(),
      isCardNumberMasked: true,
      mainCardNumber: this.cardNumber,
      cardNumberMaxLength: 19,
    };
  },
  computed: {
    minCardMonth() {
      if (this.newFormData.cardYear === this.minCardYear)
        return new Date().getMonth() + 1;
      return 1;
    },
  },
  watch: {
    formData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.newFormData = newVal;
        }
      },
      deep: true,
    },
    cardYear() {
      if (this.newFormData.cardMonth < this.minCardMonth) {
        this.newFormData.cardMonth = "";
      }
    },
  },
  mounted() {
    this.maskCardNumber();
  },
  methods: {
    generateMonthValue(n) {
      return n < 10 ? `0${n}` : n;
    },
    changeName(e) {
      this.newFormData.cardName = e.target.value;
      this.$emit("input-card-name", this.newFormData.cardName);
    },
    changeNumber(e) {
      this.newFormData.cardNumber = e.target.value;
      let value = this.newFormData.cardNumber.replace(/\D/g, "");
      // american express, 15 digits
      if (/^3[47]\d{0,13}$/.test(value)) {
        this.newFormData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        this.cardNumberMaxLength = 17;
      } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
        // diner's club, 14 digits
        this.newFormData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        this.cardNumberMaxLength = 16;
      } else if (/^\d{0,16}$/.test(value)) {
        // regular cc number, 16 digits
        this.newFormData.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
          .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
        this.cardNumberMaxLength = 19;
      }

      if (e.inputType == "deleteContentBackward") {
        let lastChar = this.newFormData.cardNumber.substring(
          this.newFormData.cardNumber.length,
          this.newFormData.cardNumber.length - 1
        );

        if (lastChar == " ") {
          this.newFormData.cardNumber = this.newFormData.cardNumber.substring(
            0,
            this.newFormData.cardNumber.length - 1
          );
        }
      }
      this.$emit("input-card-number", this.newFormData.cardNumber);
    },
    changeMonth() {
      this.$emit("input-card-month", this.newFormData.cardMonth);
    },
    changeYear() {
      this.$emit("input-card-year", this.newFormData.cardYear);
    },
    changeCvv(e) {
      this.newFormData.cardCvv = e.target.value;
      this.$emit("input-card-cvv", this.newFormData.cardCvv);
    },
    invaildCard() {
      let number = this.newFormData.cardNumberNotMask.replace(/ /g, "");
      var sum = 0;
      for (var i = 0; i < number.length; i++) {
        var intVal = parseInt(number.substr(i, 1));
        if (i % 2 === 0) {
          intVal *= 2;
          if (intVal > 9) {
            intVal = 1 + (intVal % 10);
          }
        }
        sum += intVal;
      }
      if (sum % 10 !== 0) {
        alert(this.cardForm.invalidCardNumber);
      }
    },
    blurCardNumber() {
      if (this.isCardNumberMasked) {
        this.maskCardNumber();
      }
    },
    maskCardNumber() {
      this.newFormData.cardNumberNotMask = this.newFormData.cardNumber;
      this.mainCardNumber = this.newFormData.cardNumber;
      let arr = this.newFormData.cardNumber.split("");
      arr.forEach((element, index) => {
        if (index > 4 && index < 14 && element.trim() !== "") {
          arr[index] = "*";
        }
      });
      this.newFormData.cardNumber = arr.join("");
    },
    unMaskCardNumber() {
      this.newFormData.cardNumber = this.mainCardNumber;
    },
    focusCardNumber() {
      this.unMaskCardNumber();
    },
    toggleMask() {
      this.isCardNumberMasked = !this.isCardNumberMasked;
      if (this.isCardNumberMasked) {
        this.maskCardNumber();
      } else {
        this.unMaskCardNumber();
      }
    },
  },
};
</script>
