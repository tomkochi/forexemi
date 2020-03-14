<template>
  <div
          :class="skinClass"
          class="emi-forex">
    <div
            v-if="!hideEmi"
            class="emi">
      <emi :emi-currency="emiCurrency" />
    </div>
    <!-- /.emi -->

    <div
            v-if="!hideEmi && !hideForex"
            class="separator"></div>

    <div
            v-if="!hideForex"
            class="forex">
      <forex />
    </div>
    <!-- /.forex -->
  </div>
  <!-- /.emi-forex -->
</template>

<script>
import Emi from "./emi";
import Forex from "./forex";

export default {
  name: "emi-forex",
  props: {
    skin:{
      type: String,
      default: 'blue'
    },
    emiCurrency: {
      type: String,
      default: 'Rs. '
    },
    hideEmi: {
      type: Boolean,
      default: false
    },
    hideForex: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      skinClass: {}
    }
  },
  created () {
    if (this.skin.toLowerCase() === 'blue') {
      this.skinClass = {'skin-blue': true}
    } else {
      this.skinClass = {'skin-grey': true}
    }
  },
  components: {
    Emi,
    Forex
  }
};
</script>

<style lang="scss" scoped>
.emi-forex {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  padding: 12px;
  -webkit-box-shadow: 4px 3px 21px rgba(53, 73, 165, 0.6);
  -moz-box-shadow: 4px 3px 21px rgba(53, 73, 165, 0.6);
  box-shadow: 4px 3px 21px rgba(53, 73, 165, 0.6);
  &.skin-blue {
    background: linear-gradient(135.18deg, #507EFF -5.4%, #3F5FF3 97.25%);
  }
  &.skin-grey {
    background: linear-gradient(135.18deg, grey -5.4%, lightgrey 97.25%);
  }
  .separator {
    border-bottom: 1px solid rgba(58, 76, 128, 0.196784);
    margin: 12px 0;
  }
}
</style>
