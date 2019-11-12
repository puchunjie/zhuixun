import Vue from 'vue'
import App from './App'
import store from '@/store'
import * as filters from '@/utils/filter.js'
import { ScEnumKeys, ScEnums } from '@/utils/enums'

Vue.config.productionTip = false
Vue.prototype.doMain = '';
Vue.prototype.imgUrl = '';
Vue.prototype.$clearData = obj => JSON.parse(JSON.stringify(obj));
Vue.prototype.ScEnumKeys = ScEnumKeys;
Vue.prototype.ScEnums = ScEnums;

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false

App.mpType = 'app';
App.store = store;

const app = new Vue({
  ...App
})
app.$mount()
