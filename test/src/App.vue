<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted:function () {
    var userid=localStorage.getItem('userid');
    if(userid!=""&&userid!=undefined&&userid!=null){
      this.iologin()
    }
  },
  sockets:{
    connect(){
      var userid=localStorage.getItem('userid');
      if(userid!=""&&userid!=undefined&&userid!=null){
        this.iologin()
      }
    },
    //收到别人发的信息
    iochatreceive(obj){
      obj.userid=obj.send;
      obj.time=new Date();
      obj.isreceived=1
      this.chatdbinsert(obj);
      this.friendadd(obj);
      this.$bus.emit('chatback1',obj)//向chat页面报告
      this.$bus.emit('chatbacktext',obj)//向text页面报告
    },
    //初次登录将没收到的信息保存
    iochatreceive1(obj){
      if(obj&&obj!=''&&obj!=[]&&obj!=null&&obj!='undefined'){
        //  navigator.notification.beep(1)
      }
      for(var i in obj.rows){
        this.chatdbinsert(obj.rows[i]);
        obj.rows[i].userid=obj.send;
        obj.rows[i].time=new Date();
        this.friendadd(obj.rows[i]);
      }
    },
    //发送信息后io已经插入数据库了
    iochatreceive2(obj){
      //更新数据库中此news的isreceived
      this.iochatback(obj);
      //告诉text页面 让其chatlist也修改下
      this.$bus.emit('chatback',obj)
    }
  },
}
</script>

<style>
  @import './assets/css/clipper.css';
  html,body,#app{
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;

  }


</style>
