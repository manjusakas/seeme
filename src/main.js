// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import router           from './router'
import 'font-awesome/css/font-awesome.min.css';
import cookieHandle from './util/cookie';



Vue.config.productionTip = false;
Vue.use(VueResource);

Vue.prototype.CookieHandle = cookieHandle;

Vue.http.options.emulateJSON = true;

Vue.filter('time', function (value, format) {
    let c_time = new Date(parseInt(value));
    format = format || 'YYYY-MM-DD hh:mm:ss'
      var o = {
            "M+": c_time.getMonth() + 1, //month
            "D+": c_time.getDate(), //day
            "h+": c_time.getHours(), //hour
            "m+": c_time.getMinutes(), //minute
            "s+": c_time.getSeconds(), //second
            "q+": Math.floor((c_time.getMonth() + 3) / 3), //quarter
            "S": c_time.getMilliseconds() //millisecond
        }
        if (/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1,(c_time.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o){
            if (new RegExp("(" + k + ")").test(format)){
                format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
  })

Vue.filter('to_date', (date) => {                   // 2017-5-10 at 15：35
    if (date) {
        const d = new Date(date)
        const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' +
            d.getDate() + ' ' + hours + ': ' + minutes
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data(){
    return {
    }
  },
  template: '<App />',
  components: { App },
})


