// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import elementLocale from 'element-ui/lib/locale/lang/en';
import VueMaterial from 'vue-material';
import materialIcons from 'material-design-icons-iconfont/dist/material-design-icons.css';

import 'babel-polyfill';
import 'es6-promise/auto';
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-material/dist/vue-material.css';
import 'font-awesome/css/font-awesome.css';

import MyPlugin from "./my-vue-plugin";
import App from './App';

Vue.config.productionTip = false

// axios
Vue.prototype.$http = axios;

// Fillters
Vue.filter('snippet', value => {
  return value.slice(0, 100) + '...';
});


// spliceArr
// Vue.prototype.$spliceHome = (home, stranger, loop) => {
//   for (var i = 0; i < loop; i++) {
//     home.splice(home.indexOf(stranger[i]), 1);
//   }
// }

// vue use
Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: 'indigo',
    accent: 'red',
    warn: 'grey',
  },
  about: {
    primary: 'blue',
    accent: 'red',
    warn: 'grey',
  }
});
Vue.material.setCurrentTheme('default');

Vue.use(materialIcons);
Vue.use(ElementUI, { locale: elementLocale });

Vue.use(MyPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
