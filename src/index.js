import Vue from 'vue';
import App from './App';
 
if (module.hot) {
  module.hot.accept();
}

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});