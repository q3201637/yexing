<template>
    <div class="hello" >
      <drawer style="height:100vh;width:100vw "
              :show.sync="show"
              :placement="placement"
              :show-mode="mode"
              :drawer-style="{'background-color':'#ccc', width: '80%'}"
      >
        <div class="layout" slot="drawer" >
          <my @poshide1="personshow" v-on:zhuxiao="zhuxiao1"></my>
        </div>
        <div>
          <div class="header">
            <i class="iconfont  icon-xiaoxi" @click="chatshow"></i>
            <span class="yexing" @click="aaa">夜&nbsp&nbsp行</span>
            <i class="iconfont icon-wode" @click="personshow"></i>
            <i class="iconfont icon-add"  @click="tochuangjian"></i>
          </div>
          <tab style="position: fixed;bottom: 0;width: 100%;z-index: 999" :line-width="0" v-model="swiperItemIndex" default-color="#fff" >
            <tab-item ref="tab0" @on-item-click="swiperItemIndex = 0" style="background-color: #000" line-width=0>订阅</tab-item>
            <tab-item ref="tab1" @on-item-click="swiperItemIndex = 1" style="background-color: #000" line-width=0>探索</tab-item>
            <tab-item ref="tab1" @on-item-click="swiperItemIndex = 2" style="background-color: #000" line-width=0>发现</tab-item>
            <tab-item ref="tab2" @on-item-click="swiperItemIndex = 3" style="background-color: #000" line-width=0>我的</tab-item>
          </tab>
          <swiper :height="height" :show-dots="false"  v-model="swiperItemIndex">
            <swiper-item>
              <dingyue></dingyue>
            </swiper-item>
            <swiper-item>
              <tansuo></tansuo>
            </swiper-item>
            <swiper-item>
              <faxian></faxian>
            </swiper-item>
            <swiper-item>
              <mine1  @bianhua="gaibian"
                     :minemore="minemore"
                     v-infinite-scroll="loadMoremine"
                     infinite-scroll-distance="30"
                     :infinite-scroll-immediate-check="true"
                     infinite-scroll-disabled="loading"
              ></mine1>
            </swiper-item>
          </swiper>
        </div>
        <!-- page content -->
      </drawer>
    <div id="exit"></div>
    </div>
</template>

<script>
    import { Tab, TabItem,XHeader } from 'vux'
    import { Swiper,SwiperItem } from 'vux'
    import { Tabbar, TabbarItem,Drawer,Cell, Group } from 'vux'
    import my from "../zujian/my"
    import tansuo from "../zujian/tansuo"
    import faxian from "../zujian/faxian"
    import mine1 from "../zujian/mine1"
    import dingyue from "../zujian/dingyue"
    export default {
        name: 'HelloWorld',
        data() {
            return {
               xunhuan:0,
               haoyouwenzhang:{},
               show:false,
               placement:"right",
               mode:"push",
               swiperItemIndex:1,
               minemore:1,
               loading:false,
               time:"",
            }
        },
        methods: {
          aaa(){

          },
          zhuxiao1(){
          //  this.$destroy()
          },
          gaibian(){
            this.loading=true
          },
          loadMoremine(){
               this.minemore++
          },
          chang1(index){
          },
          switchCar(){
          },
          chatshow(){
            this.$router.push("./Chat")
          },
          personshow(){
            this.show=!this.show
          },
          tozhengwen(data){
            this.$router.push({
              name:"HelloWorld",
              params:{
                type:"others",
                data:data
              }
            })
          },
          tochuangjian(){
            /*const { href }  = this.$router.resolve({
              path: "/HelloWorld",
              query:{
                type:'new'
              }
            });
            window.open(href, '_blank');*/
            this.$router.push({
              path:"/HelloWorld",
              query:{
                type:"new"
              }
            })
          },
        },
      computed:{
          height(){
            return window.screen.availHeight-44-46+'px'
          },
          userid(){
            return this.$store.state.userid
          }
      },
      mounted:function () {
       // this.$socket.emit('connect')
      },
      watch:{
          /*userid:function(oldval,val){
            if(val==""||val==[]||val==undefined||val==null){
              return
            }else{
              console.log('111')
              this.iologin()
            }
          }*/
      },
      components: {
        Tab, TabItem, Swiper,SwiperItem, XHeader, Tabbar, TabbarItem, Drawer, Cell, Group,my,tansuo,faxian,mine1,dingyue
      },

      /*beforeRouteLeave(to, from, next) {
        if(to.name == 'Login'||to.name == 'Register') {
          console.log('1')
          this.$destroy()
        }
        next();
      },*/
      /*beforeRouteLeave(to, from, next) {
        if(to.name != 'Login'&&to.name != 'Register') {
          from.meta.keepAlive = true;
        }
        next();
      },*/
      /*activated() {
         console.log(this.$route)
         this.$route.meta.keepAlive=true
      }*/

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .hello{
    padding: 0;
    margin: 0;
    height: 100%;
    width:100%;
    background-color: #161823;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .header{
    height: 46px;
   /* background-color: #666666;*/
    background-color:#000;
    text-align: center;
    line-height: 46px;
    color: #fff;
    font-size:20px;
    padding: 0 20px;
  }
  .header>span{
    font-size:20px
  }
  .icon-xiaoxi{
    float: left;
  }
  .icon-add{
    float: right;
    margin-right: 20px;
  }
  .icon-wode{
    float: right;
  }
  .yexing{
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    color: #666666;
  }
  .content{
   /* background-color: #000;*/
    padding: 0;
    position: relative;
  }

</style>
