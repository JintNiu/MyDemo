// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import vuex from 'vuex'
import axios from 'axios'
// import Loading from './components/loading'
import stores from './store/store'
import MintUI from 'mint-ui'
import moment from 'moment'
import VueTouch from 'vue-touch'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 全局方法
// import getUrlParams from './components/getUrlParams'

import 'mint-ui/lib/style.css'
import '@/assets/css/reset.css'
import '@/assets/css/font-awesome.min.css'
import '@/assets/css/swiper.min.css'
import App from './App.vue'

// 安卓4.4版本兼容es6->es5
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.config.productionTip = false
Vue.use(MintUI)
// Vue.use(Loading)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueAwesomeSwiper)
import { Toast } from 'mint-ui';

// axios 请求超时时间 10s
axios.defaults.timeout = 10000
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
var axiosInterceptors = axios.interceptors.request.use(function (config) {
  //配置发送请求的信息
  if(config.method=='get'){  
      stores.dispatch('showLoadingPage');   
  }else if(config.method=='post'){  
     stores.dispatch('showLoadingState');
  }  
  return config;
}, function (error) {
  stores.dispatch('hideLoadingPage');
  stores.dispatch('hideLoadingState');
  Toast('请求超时，请检查网络');
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  stores.dispatch('hideLoadingPage');
  stores.dispatch('hideLoadingState');
  return response;
}, function (error) {
  stores.dispatch('hideLoadingPage');
  stores.dispatch('hideLoadingState');
  Toast('服务请求异常');
  return Promise.reject(error);
});

Vue.prototype.$http = axios;
Vue.prototype.$moment = moment; //Object.definePrototype(Vue.prototype, '$moment', { value: moment });
// Vue.prototype.$getUrlParams = getUrlParams

process.env.NODE_ENV === 'development' ? '/gp' : ''

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:stores,
  template: '<App/>',
  components: { App }
})
