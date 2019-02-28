<template>
  <div class="hello">
    <div class="top" style="height:44px;width: 100%;background-color: #000">
      <i class="iconfont icon-return" @click="$router.back(-1)" ></i>
      <span class="name" style="">{{name}}</span>
    </div>
      <div class="content" ref="content">
        <div style="width: 100%" v-for="(item,index) in chatlist">
          <p class="time">qqq</p>
          <div class="left" v-show="item.send==userid">
            <div class="imgdiv">
              <img :src="touxiangtransform(userid,photo)" style="width: 100%">
            </div>
            <div class="textdiv">{{item.text}}</div>
          </div>
          <div class="right" v-show="item.send!=userid">
            <div class="textdiv"><inline-loading v-show="item.isreceived==0"></inline-loading>{{item.text}}</div>
            <div class="imgdiv">
              <img :src="touxiangtransform(zijiuserid,zijiphoto)" style="width: 100%">
            </div>
          </div>
        </div>
      </div>
    <div class="bottom" style="" ref="bottom">
     <!-- <div class="textdiv1" style="">
       <chatdiv v-model="text" v-on:mefocus="mefocus1" v-on:meblur="meblur1"></chatdiv>
      </div>
      <div class="right-icon icon-div" style="">
        <i class="iconfont icon-right" style="font-size: 44px"  @click="send"></i>
      </div>-->
      <flexbox>
        <flexbox-item :span="10">
          <x-textarea style="margin: 0;padding:  0;background: #ccc;line-height: 22px;font-size: 16px;letter-spacing: 6px;color: #000" height=40 :max=500 class="pos-textarea"  placeholder="" :show-counter="false" :rows="1" :height="44" v-model="text"></x-textarea>
        </flexbox-item>
        <flexbox-item style="padding: 0;text-align: center">
          <i class="iconfont icon-right" style="font-size: 44px;color: red"  @click="send"></i>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import { Swiper,SwiperItem ,Flexbox, FlexboxItem,XHeader,Group,XTextarea,InlineLoading ,XButton} from 'vux'
  import chatdiv from "@/components/zujian/chatdiv"
  export default {
    data () {
      return {
        font1:"",
        lineHeight:"",
        text:"",
        name:"",
        userid:"",
        photo:"",
        chatlist:[],
        zijiuserid:localStorage.getItem('userid'),
        zijiphoto:localStorage.getItem('photo')
      }
    },
    updated:function(){
      this.scrollToBottom();
    },
    methods : {
      meblur1(){
       // this.$vux.toast.text(window.innerHeight)
      },
      mefocus1(){
       // this.$vux.toast.text(window.innerHeight)
      },
      scrollToBottom(){
        this.$nextTick(function(){
          var div = this.$refs.content;
          div.scrollTop = div.scrollHeight;
        })
      },
      send(){
       // this.msgsetsee(1);
       /*this.dbdrop("friend1");
        this.dbdrop("chat1");
        return*/
      /*this.chatdbbcreat('chat1')
      this.frienddbbcreat('friend1')
        return*/
        if(this.text==""){
          return
        }
        var send=localStorage.getItem("userid");
        var receive=this.userid;
        var text=this.text;
        var obj={"id":this.uuid(),"send":send,"receive":receive,"text":text,"type":1,"isreceived":0,userid:this.userid,time:new Date()};
        //var len=Object.keys(this.chatlist).length;
        obj.isread=1
        this.chatlist.push(obj)
        this.friendadd(obj);
        this.chatdbinsert(obj);
        obj.isread=0
        this.iochatsend(obj)
        this.text="";
      },
      update(){
        var url=this.$store.state.url;
        var that=this;
        this.axios.post(url+"/gerendetail/imgnameget",{"userid":this.userid}).then(function (result) {
          that.name=result.data[0].name;
          that.photo=result.data[0].picture;
          that.frienddbupdate2({"name":result.data[0].name,"photo":result.data[0].picture,"userid":that.userid})
        })
      }
    },
    mounted:function () {
      var that=this;
      //得到聊天数据
      this.chatget(this.userid).then((result)=>{
        for(var i in result.rows){
          if(i=='length'||i=='item'){
            continue
          }
          this.chatlist.push(result.rows[i])
        }
        //this.chatlist=this.chatlist.concat(result.rows)[0]
      }).catch((reason)=>{console.log(reason)});
      //将本地和后台的issee全设置已读
      this.msgsetsee(this.userid,localStorage.getItem("userid"))
      //访问后台得到好友的名字和图片信息 并更新本地
      this.update();
      this.scrollToBottom()
      //软键盘事件
      window.addEventListener('native.keyboardshow', keyboardShowHandler);
      function keyboardShowHandler(e){
        setTimeout(function(){
          that.$refs.bottom.style.bottom=e.keyboardHeight+'px'
        },300)
      }
      window.addEventListener('native.keyboardhide', keyboardHideHandler);
      function keyboardHideHandler(e){
        setTimeout(function(){
          that.$refs.bottom.style.bottom=0+'px'
        //  alert(document.activeElement.className)
        },300)
      }
    },
    created:function () {
      this.userid=this.$route.params.data.userid;
      this.name=this.$route.params.data.name;
      this.photo=this.$route.params.data.photo;
      var that=this
      this.$bus.on('chatback',function (obj) {
        console.log('obj.receive='+obj.receive)
        console.log('this.userid='+that.userid)
        if(obj.receive==that.userid){
          var id =obj.id;
          that.chatlist.forEach(function (item,index) {
            if(item.id==id){
              that.chatlist[index].isreceived=1
            }
          })
        }
      })
      this.$bus.on('chatbacktext',function (obj) {
        if(obj.send=that.userid){
          that.chatlist.push(obj)
        }
      })
    },
    beforeDestroy() {
      this.$bus.off('chatback');
      this.$bus.off('chatbacktext');
    },
    components: {
      Swiper,SwiperItem,Flexbox, FlexboxItem,XHeader,chatdiv,InlineLoading,XTextarea, Group,XButton
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #161823;
  overflow: hidden;
}
.top{
  position: fixed;
  z-index: 999;
  text-align: center;
}
.icon-return{
  position: absolute;
  color: #fff;
  font-size: 25px;
  line-height: 46px;
  left: 20px;
}
.top .name{
  color: #fff;
  font-size: 20px;
  line-height: 46px;
  color: #ccc;
}
  .content{
    position: absolute;
    top:46px;
    bottom: 44px;
    padding-top:10px ;
    width: 100%;
    overflow-y: scroll;
  }
  .left,.right{
    box-sizing: border-box;
    width: 100%;
    margin-bottom:20px ;
    padding: 0px 10px;
  }
  .imgdiv{
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: #666666;
    vertical-align: top;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
  }
  .textdiv{
    display: inline-block;
    max-width: 60%;
    background-color: #ef5728;
    line-height: 20px;
    word-break:break-all;
    padding: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius:5px ;
    border-radius: 5px;
  }
  .right{
    text-align: right;
  }

  .textedit{
    outline: none;
    max-height: 200px;
    overflow: hidden;
  }
  .bottom{
    width: 100%;
    background-color: #ccc;
    position: absolute;
    bottom: 0;
    z-index: 999;
    color: #ccc;
    height: 44px
  }

  .textdiv1{
    position:absolute;
    right: 54px;
    min-height: 44px;
    bottom: 0;
    left: 0;
  }
  .right-icon{
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 0;
    width: 44px;
    height: 44px;
    color: red;
  }
  .time{
    text-align: center;
    font-size: 14px;
    color: #666;
  }
</style>
