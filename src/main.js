import Vue from 'vue'
import App from './App'
import store from '@/store'
import * as filters from '@/utils/filter.js'
import { ScEnumKeys, ScEnums } from '@/utils/enums'
import './styles/iconfont.css';

Vue.config.productionTip = false
Vue.prototype.doMain = 'http://zhuixuncn.com/zapi/webService';
Vue.prototype.imgUrl = 'http://ptpic.oss-cn-hangzhou.aliyuncs.com/wechat_img';
Vue.prototype.$clearData = obj => JSON.parse(JSON.stringify(obj));
Vue.prototype.ScEnumKeys = ScEnumKeys;
Vue.prototype.ScEnums = ScEnums;
Vue.prototype.$store = store;

Vue.prototype.$setTitle = title => {
  wx.setNavigationBarTitle({ title });
}

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
