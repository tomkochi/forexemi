<template>
  <div class="dropdown">
    <input type="text"
           v-model="search"
           ref="search"
           class="currency-search" placeholder="Search">
    <div class="currencies">
      <div
              v-for="c in filteredCurrencies"
              :key="c.key"
              @click="$emit('currencySelection', c)"
              class="currency">{{ c.currency }}</div>
    </div>
    <!-- /.currencies -->

  </div>
  <!-- /.dropdown -->
</template>
<script>
  export default {
    name: 'currency-dropdown',
    props: ['currencies'],
    data() {
      return {
        search: ''
      }
    },
    mounted () {
      this.$refs.search.focus()
    },
    computed: {
      filteredCurrencies() {
        if (this.search) {
          return this.currencies.filter(c => c.currency.substring(0, this.search.length) === this.search.toUpperCase())
        } else {
          return this.currencies
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dropdown {
    width: 130px;
    overflow-y: auto;
    overflow-x: hidden;
    .currency-search {
      padding: 10px;
      border: none;
      outline: none;
      font-size: 18px;
      font-weight: 400;
      color: #747474;
      &::placeholder {
        color: #a1a1a1;
      }
      &:-ms-input-placeholder {
        color: #a1a1a1;
      }
      &:-moz-placeholder {
        color: #a1a1a1;
      }
      &::-ms-input-placeholder {
        color: #a1a1a1;
      }
      &::-ms-input-placeholder {
        color: #a1a1a1;
      }
      &::-webkit-input-placeholder {
        color: #a1a1a1;
      }
    }
    .currencies {
      max-height: 230px;
      overflow-y: auto;
      background: #eeeeee;
    }
    .currency {
      padding: 5px 10px;
      color: #747474;
      font-size: 18px;
      font-weight: 400;
      -webkit-transition: all 0.2s;
      -moz-transition: all 0.2s;
      -ms-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
      &:hover {
        background: #747474;
        color: #ffffff;
      }
    }


  }
</style>