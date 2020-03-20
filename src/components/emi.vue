<template>
  <div class="emi">
    <div class="heading">EMI Calculator</div>

    <div class="inputs">
      <div class="loan-amount d-flex flex-column">
        <label for="loan-amount" class="label">Loan Amount</label>
        <input
                @focus="$event.target.select()"
                v-model="loanAmount"
                @input="amountChange"
                @blur="addCommasToAmount"
                type="text"
                id="loan-amount"
                class="value"/>
      </div>
      <!-- /.loan-amount -->

      <div class="d-flex j-c-between">
        <div class="interest d-flex">
          <label for="interest" class="label">Int %</label>
          <input
                  @focus="$event.target.select()"
                  v-model="interest"
                  @input="interestChange"
                  @blur="interestBlur"
                  type="text"
                  id="interest"
                  class="value"/>
        </div>
        <!-- /.interest -->

        <div class="months d-flex">
          <label for="months" class="label">Months</label>
          <input
                  @focus="$event.target.select()"
                  v-model="months"
                  @input="monthsChange"
                  type="text"
                  id="months"
                  class="value"/>
        </div>
        <!-- /.months -->
      </div>
    </div>
    <!-- /.inputs -->

    <div class="math">
      <div class="total">
        Total (Principal + Interest) = {{ emiCurrency }}<span>{{ addCommas((emi * months).toString()) }}</span>
      </div>
      <div class="emi">
        EMI - {{ emiCurrency }}<span>{{ addCommas(emi.toString()) }}</span>
      </div>
    </div>
    <!-- /.math -->
  </div>
  <!-- /.emi -->
</template>

<script>
  export default {
    name: "emi",
    props: {
      emiCurrency: {
        type: String,
        default: 'Rs.'
      }
    },
    data() {
      return {
        loanAmount: '1,00,000',
        interest: 10.50,
        months: 12,
      }
    },
    methods: {
      amountChange() {
        this.loanAmount = this.loanAmount.replace(/[^0-9]/g,'')
      },

      interestChange() {
        this.interest = this.interest.replace(/[^0-9.]/g,'')
      },

      monthsChange() {
        this.months = this.months.replace(/[^0-9]/g,'')
      },

      interestBlur() {
        this.interest = parseFloat(this.interest)
      },

      addCommas(nStr) {
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
        // if( x2.length == 0 ) x2 = '.00';
        // if( x2.length == 2 ) x2 = x2 + '0';


        return x1 + lastDigit + x2;
      },

      addCommasToAmount() {
        this.loanAmount = this.addCommas(this.loanAmount.toString())
      },

    },

    computed: {
      emi() {
        let ans = 0;
        // R, P and N are the usual constants used in this equation EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
        const R = parseFloat(this.interest)/(12*100) // rate of interest per month
        let P = this.loanAmount.toString( )
        P = parseInt(P.split(',').join(''))
        const N = parseInt(this.months) | 0
        // emi equation
        ans = P * R / (1 - (Math.pow(1/(1 + R), N)))

        return Math.ceil(ans) | 0
      }
    },
  };
</script>

<style lang="scss" scoped>
  .d-block {
    display: block;
  }
  .d-flex {
    display: flex;
  }
  .a-i-center {
    align-items: center;
  }
  .j-c-center {
    justify-content: center;
  }
  .j-c-between {
    justify-content: space-between;
  }

  .emi {
    padding: 12px;
    .heading {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 16px;
    }
    .inputs {
      .interest, .months, .loan-amount {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        height: 40px;
        margin-bottom: 10px;
      }
      .label {
        background: #ffffff;
        font-size: 16px;
        font-weight: 500;
        color: #747474;
        padding: 0 10px 0 16px;
        line-height: 40px;
        white-space: nowrap;
        -webkit-border-radius: 4px 0 0 4px;
        -moz-border-radius: 4px 0 0 4px;
        border-radius: 4px 0 0 4px;
      }
      .value {
        background: #EDEDED;
        font-size: 16px;
        font-weight: 400;
        color: #747474;
        padding-left: 10px;
        border: none;
        outline: none;
        line-height: 40px;
        -webkit-box-shadow: inset 2px 0px 3px rgba(0, 0, 0, 0.105469);
        -moz-box-shadow: inset 2px 0px 3px rgba(0, 0, 0, 0.105469);
        box-shadow: inset 2px 0px 3px rgba(0, 0, 0, 0.105469);
        -webkit-border-radius: 0 4px 4px 0;
        -moz-border-radius: 0 4px 4px 0;
        border-radius: 0 4px 4px 0;
      }
      .label, .value {
        width: 50%;
      }
      .interest, .months {
        width: calc(50% - 5px);
      }
      .months {
        .label {
          width: 60%;
        }
        .value {
          width: 40%;
          padding: 0;
          text-align: center;
        }
      }
    }
    .math {
      .total {
        color: #ffffff;
        font-size: 12px;
        font-weight: 400;
        text-align: right;
        margin: 10px 0 10px 0;
      }
      .emi {
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;
        text-align: right;
        padding: 0;
      }
    }
  }
</style>
