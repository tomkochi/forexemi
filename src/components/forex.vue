<template>
  <div class="forex">
    <div class="heading">Forex Calculator</div>

    <div class="inputs">
      <div class="currency currency-1 d-flex">
        <div
                @click="currency1Click"
                v-outside-click="{
                  exclude: ['dropdown1'],
                  handler: 'clickedOutside1'
                }"
                class="label">{{ currency1.currency }}</div>
        <input
                @focus="$event.target.select()"
                @input="changeCurrency(2, currency2)"
                @blur="addCommas(1); addCommas(2)"
                v-model="currency1.value"
                type="text" class="value" />
        <div class="dropdown" ref="dropdown1">
          <currency-dropdown
                  v-if="showCurrency1"
                  v-on:currencySelection="changeCurrency(1, $event)"
                  :currencies="currencies"/>
        </div>
      </div>
      <!-- /.currency-1 -->

      <div class="currency currency-2 d-flex">
        <div
                @click="currency2Click"
                v-outside-click="{
                  exclude: ['dropdown2'],
                  handler: 'clickedOutside2'
                }"
                class="label">{{ currency2.currency }}</div>
        <input
                @focus="$event.target.select()"
                @input="changeCurrency(1, currency1)"
                @blur="addCommas(1); addCommas(2)"
                v-model="currency2.value"
                type="text" class="value" />
        <div class="dropdown" ref="dropdown2">
          <currency-dropdown
                  v-if="showCurrency2"
                  v-on:currencySelection="changeCurrency(2, $event)"
                  :currencies="currencies"/>
        </div>
      </div>
      <!-- /.currency-2 -->
    </div>
    <!-- /.inputs -->

    <div class="math">
      <div class="unit-price">
        1 <span class="c-1">{{ currency1.currency }}</span> = <span class="amount">{{ unitValue }}</span> <span class="c-2">{{ currency2.currency }}</span>
      </div>
    </div>
    <!-- /.math -->
  </div>
  <!-- /.forex -->
</template>

<script>
  import axios from 'axios'
  import CurrencyDropdown from "./currencyDropdown"
  import { outsideClick } from '../clickOutside'

  export default {
    name: "forex",
    components: {CurrencyDropdown},
    data() {
      return {
        currencies: [],
        showCurrency1: false,
        showCurrency2: false,
        currency1: {
          currency: 'USD',
          value: 0
        },
        currency2: {
          currency: 'INR',
          value: 0
        },
      }
    },
    methods: {
      clickedOutside1 () {
        this.showCurrency1 = false
      },
      clickedOutside2 () {
        this.showCurrency2 = false
      },
      currency1Click() {
        this.showCurrency1 = true
        this.showCurrency2 = false
      },
      currency2Click() {
        this.showCurrency2 = true
        this.showCurrency1 = false
      },
      changeCurrency(currency, e) {
        if (currency === 1) {
          this.currency2.value = this.currency2.value.replace(/[^0-9.]/g,'')
          this.currency1.currency = e.currency
          this.showCurrency1 = false

          // get original values
          let v1 = this.currencies.find(c => c.currency === this.currency1.currency)
          let v2 = this.currencies.find(c => c.currency === this.currency2.currency)
          v1 = JSON.parse(JSON.stringify(v1))
          v2 = JSON.parse(JSON.stringify(v2))

          const unchanged = this.currency2.value
          const unit = v1.value / v2.value

          this.currency1.value = (unchanged * unit).toFixed(2)
        }
        if (currency === 2) {
          this.currency1.value = this.currency1.value.replace(/[^0-9.]/g,'')
          this.currency2.currency = e.currency
          this.showCurrency2 = false

          // get original values
          let v1 = this.currencies.find(c => c.currency === this.currency2.currency)
          let v2 = this.currencies.find(c => c.currency === this.currency1.currency)
          v1 = JSON.parse(JSON.stringify(v1))
          v2 = JSON.parse(JSON.stringify(v2))

          const unchanged = this.currency1.value
          const unit = v1.value / v2.value

          this.currency2.value = (unchanged * unit).toFixed(2)
        }
      },
      addCommas(elm) {
        let nStr = elm === 1 ? this.currency1.value.toString() : this.currency2.value.toString()
        var x = nStr.split('.');
        var x1 = x[0];
        // keep the last digit
        // because we use indian type comma formating
        var lastDigit = x1.substr(x1.length-1, 1);
        x1 = x1.substr(0, x1.length-1);
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{2})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        if (elm === 1) {
          this.currency1.value = x1 + lastDigit + x2
        } else {
          this.currency2.value = x1 + lastDigit + x2
        }
      },
    },
    created() {
      axios.get('https://us-central1-forex-api-proxy.cloudfunctions.net/forex')
          .then(response => {
            let tmp = Object.entries(response.data.quotes)
            tmp.forEach(o => {
              this.currencies.push({
                currency: o[0].substring(3),
                value: o[1]
              })
            })
            // find USD and INR
            this.currency1 = (JSON.parse(JSON.stringify(this.currencies.find(c => c.currency === 'USD'))))
            this.currency2 = (JSON.parse(JSON.stringify(this.currencies.find(c => c.currency === 'INR'))))
            this.currency1.value = this.currency1.value.toFixed(2)
            this.currency2.value = this.currency2.value.toFixed(2)
          })
    },
    computed: {
      unitValue() {
        if (!this.currencies.length) return 0
        let v1 = this.currencies.find(c => c.currency === this.currency1.currency)
        let v2 = this.currencies.find(c => c.currency === this.currency2.currency)
        return (v2.value / v1.value).toFixed(2)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .forex {
    padding: 12px;
    .heading {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 16px;
    }
    .inputs {
      .currency-1, .currency-2 {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        height: 40px;
        margin-bottom: 10px;
        width: 100%;
      }
      .currency {
        position: relative;
        .dropdown {
          position: absolute;
          top: 22px;
          z-index: 2000;
        }
      }
      .label {
        font-size: 16px;
        font-weight: 500;
        color: #747474;
        padding: 0 16px;
        line-height: 46px;
        white-space: nowrap;
        width: 130px;
        background: #ffffff url("data:image/svg+xml,%3Csvg width='16' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 1.5L14.5 0L8 6.5L1.5 0L0 1.5L8 9.5L16 1.5Z' fill='%239B9B9B'/%3E%3C/svg%3E%0A") no-repeat 80px center;
        cursor: pointer;
        -webkit-border-radius: 4px 0 0 4px;
        -moz-border-radius: 4px 0 0 4px;
        border-radius: 4px 0 0 4px;
      }
      .value {
        background: #EDEDED;
        font-size: 16px;
        font-weight: 400;
        color: #747474;
        padding-left: 16px;
        border: none;
        outline: none;
        display: block;
        width: 100%;
        -webkit-box-shadow: inset 2px 0px 3px rgba(0, 0, 0, 0.105469);
        -moz-box-shadow: inset 2px 0px 3px rgba(0, 0, 0, 0.105469);
        box-shadow: inset 2px 0px 3px rgba(0, 0, 0, 0.105469);
        -webkit-border-radius: 0 4px 4px 0;
        -moz-border-radius: 0 4px 4px 0;
        border-radius: 0 4px 4px 0;
      }
    }
    .math {
      .unit-price {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        text-align: right;
      }
    }
  }
</style>
