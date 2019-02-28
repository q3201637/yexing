import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import  { LoadingPlugin,ToastPlugin  } from 'vux'
import clipper from './assets/js/clipper'
import phototransform from './assets/js/phototransform'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import moment from 'moment'//导入文件
/*import VueSocketio from 'vue-socket.io';

import socketio from 'socket.io-client';

Vue.use(VueSocketio, socketio('http://127.0.0.1:3031'));*/
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://47.99.122.154:3031',
  vuex: {
  }
}))



//引用Croppa图片裁剪
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import Minemy from './components/js/Minemy.js'
import Triangle from './components/js/index.js'
import Websqldb from './assets/js/websql'
import VueScroller from "vue-scroller"
import { InfiniteScroll } from 'mint-ui';
import Chat from './assets/js/chat'
import VueBus from 'vue-bus';
Vue.use(VueBus);
Vue.use(InfiniteScroll);
Vue.use(VueScroller);
Vue.use(phototransform)
Vue.use(Websqldb)
Vue.use(Chat)
Vue.use(clipper)
Vue.use(Minemy)
Vue.use(Triangle)
Vue.use(Websqldb)
Vue.use(MintUI)
Vue.use(Croppa,Croppa);
Vue.use(VueAxios,axios);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);


Vue.config.productionTip = false;
var that=this;
document.addEventListener('deviceready', function() {
  let testVueInstance= new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
  //手机状态栏隐藏
  StatusBar.hide();
  var time;
  //物理返回键
  document.addEventListener("backbutton", function(){
    var that =this;
    var pp=new Date() -time
    var x=document.getElementById('exit')
    if(x){
      if(pp<3000){
        navigator.Backbutton.goHome()
      }else{
        time=new Date()
      }
    }else{
     // navigator.Backbutton.goBack()
      testVueInstance.$router.back(-1)
    }

  }, false);
  //消息提醒插件
  document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      console.log(navigator.notification);
  }

}, false);
/* eslint-disable no-new */
/*new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})*/
