import Vue from 'vue'
import App from './App'
import store from '@/store'
import * as filters from '@/utils/filter.js'
import { ScEnumKeys, ScEnums } from '@/utils/enums'
import md5 from 'js-md5'
import './styles/iconfont.css';

Vue.config.productionTip = false
Vue.prototype.doMain = 'https://zhuixuncn.com/zapi/webService';
Vue.prototype.imgUrl = 'https://ptpic.oss-cn-hangzhou.aliyuncs.com/wechat_img';
Vue.prototype.version = '1.0.3';
Vue.prototype.$clearData = obj => JSON.parse(JSON.stringify(obj));
Vue.prototype.ScEnumKeys = ScEnumKeys;
Vue.prototype.ScEnums = ScEnums;
Vue.prototype.$store = store;
Vue.prototype.$md5 = md5;

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
