<template>
    <div class="hello">
      <div class="top">
        <x-header  :left-options="{showBack:false,preventGoBack:true}" style="background-color: #000;margin-bottom: 10px" title="聊天">
          <div slot="left" >
            <i class="iconfont  icon-return" @click="$router.back(-1)"></i>
          </div>
          <div slot="right">
          </div>
        </x-header>
      </div>
      <swipeout>
        <swipeout-item   transition-mode="follow" class="swipeout-item" v-for="(item,index) in friendlist" :key="index"  style="">
          <div slot="right-menu">
            <swipeout-button  type="warn" @click.native="onButtonClick('fav')">删除</swipeout-button>
            <swipeout-button   type="default">忽略</swipeout-button>
          </div>
          <div slot="content" class="demo-content vux-1px-t" @click="todetail(item)" >
            <div class="imgdiv" >
              <img  :src="touxiangtransform(item.userid,item.photo)">
            </div>
            <div class="topdiv">
              <span class="name">{{item.name}}</span>
              <span class="time">{{dateFormat(item.time)}}</span>
            </div>
           <span class="text">{{item.text}}</span>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
</template>

<script>
  import moment from 'moment'
  import { Swipeout, SwipeoutItem, SwipeoutButton,XHeader } from 'vux'
        export default {
        name: 'HelloWorld',
        data() {
            return {
              friendlist:[]
            }
        },
        computed:{
          imgg(){
            return this.$store.state.picture+"/"+"1"+"/touxiang/"+"735d8090-1c80-11e9-8479-153c44ddac3a"+".jpg"
          }
        },
        methods: {
          dateFormat(time) {
            var str=moment(time).fromNow();
            str=str.replace('a few seconds ago', '刚刚');
            str=str.replace('minutes', '分钟');
            str=str.replace('hours', '小时');
            str=str.replace('days', '天')
            str=str.replace('months', '月')
            str=str.replace('years', '年')
            str=str.replace('minute', '分钟');
            str=str.replace('hour', '小时');
            str=str.replace('day', '天')
            str=str.replace('month', '月')
            str=str.replace('year', '年')
            str=str.replace('ago', '前')
            str=str.replace('an', '1')
            str=str.replace('a', '1')
            return str
          },
            hha(){
             // this.touxiangtransform(id,type)
              localStorage.setItem("userid",1)
              console.log(localStorage.getItem("userid"))
              console.log(this.$store.state.userid)
            },
          todetail(item){
            this.$router.push({
              name:"text",
              params:{
                data:item
              }
            })
          }
        },
        mounted:function () {

        },
        components: {
          Swipeout,
          SwipeoutItem,
          SwipeoutButton,XHeader
        },
        created:function () {
          var that=this
          this.friendget().then((result)=>{
            for(var i in result.rows){
              if(i=='length'||i=='item'){
                continue
              }
              this.friendlist.push(result.rows[i])
            }
          })
          this.$bus.on('chatback1',function (obj) {
            var wo=0
            that.friendlist.forEach(function (item,index) {
               if(item.userid==obj.send){
                 that.friendlist[index].text=obj.text;
                 that.friendlist[index].time=obj.time;
                 that.friendlist[index].type=obj.type;
                 wo=1
                 return
               }
             });
            if(wo==0){
              obj.userid=obj.send;
              that.friendlist.unshift(obj)
            }
          })
        },
        beforeDestroy() {
          this.$bus.off('chatback1');
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    height: 100%;
    background-color: #161823;
  }
  .swipeout-item{
    margin: 10px 0;
    border-bottom: 1px solid #332a3a;
  }
  .demo-content {
    background-color:  #161823;
    marigin: 10px 0px;
    padding: 0 20px;
    line-height: 25px;
  }
  .imgdiv{
    width: 50px;;
    height: 50px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    float: left;
    margin-right: 10px;
  }
  .imgdiv>img{
    height: 100%;
  }
  .topdiv{
    font-size: 18px;
  }
  .name{
    color: #ccc;
    font-size: 16px;
  }
  .time{
    float: right;
    color:#45b795;
    font-size: 10px;
  }
  .text{
    font-size: 14px;
    color:#45b795;
    white-space:nowrap;
    overflow: hidden;
    width: 50%;
    display: inline-block;
    text-overflow:ellipsis;/*超出部分文字以...显示*/
  }
</style>
