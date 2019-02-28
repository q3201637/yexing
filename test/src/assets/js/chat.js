export  default {
  install(Vue) {
    //登录
    Vue.prototype.iologin=function () {
      this.$socket.emit('login', {userid:localStorage.getItem("userid"), name:localStorage.getItem("name")});
    };
    //发送信息
    Vue.prototype.iochatsend=function (obj) {
      this.$socket.emit('chatnews', obj);
    };
    Vue.prototype.disconnect=function (obj) {
      this.$socket.emit('disconnect', obj);
    };
  }
}
