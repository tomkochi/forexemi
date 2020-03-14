<template>
  <div id="app">
    <div class="app-container">
      <div class="forex-container">
        <forex-emi skin="blue" emi-currency="$"/>
      </div>
    </div>
  </div>
</template>

<script>
import ForexEmi from "./components/forex-emi.vue";

export default {
  name: "App",
  components: {
    ForexEmi
  }
};
</script>

<style>
  html,
  body {
    padding: 0;
    margin: 0;
  }
  .app-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
    height: 100vh;
  }
  .forex-container {
    max-width: 300px;
  }
</style>
