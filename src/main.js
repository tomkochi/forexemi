// import Vue from 'vue';
// import wrap from '@vue/web-component-wrapper';
// import VueWebComponent from './components/forex-emi';
//
// const CustomElement = wrap(Vue, VueWebComponent);
//
// window.customElements.define('emi-forex', CustomElement);
//


import Vue from 'vue'
import App from './App.vue'
import CustomElement from './components/forex-emi.vue?shadow'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
