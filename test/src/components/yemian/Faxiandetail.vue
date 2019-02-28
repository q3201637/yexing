<template>
  <div class="hello">
    <div v-transfer-dom>
      <confirm
        v-model="conshow"
        :show-cancel-button="true"
        :title="suretitle"
        :content="suretitle"
        @on-confirm="dingyuesure"
      >
        <p style="text-align:center;" :html="suretitle"></p>
      </confirm>
    </div>
    <swiper  :show-dots="false"  :height="height">
      <swiper-item>
        <div class="content">
          <div class="biaoti">
            <input type="text" :readonly="inputreadonly" style="" placeholder="嗯哼?" maxlength="30" v-model="biaoti">
          </div>
          <div class="text">
            <bianji v-model="text" :canEdit="readonly" :juzhong="false"></bianji>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div>
          <div class="top"><span >{{name}}</span></div>
          <tansuo v-if="$route.params.type=='tansuo'"></tansuo>
          <Minemy class="container" v-if="$route.params.type=='mine'||$route.params.type=='others'"
                @bianhua="gaibian"
                :minemore="minemore"
                v-infinite-scroll="loadMoremine"
                infinite-scroll-distance="30"
                :infinite-scroll-immediate-check="true"
                infinite-scroll-disabled="loading"
                :userid="userid"
                :type="type"
          ></Minemy>
        </div>
      </swiper-item>
    </swiper>
    <div class="bottom">
      <i class="iconfont icon-return bottom-icon"  @click="$router.back(-1)"></i>
      <span class="canyu" v-show="type=='faxian'">参与</span>
      <span class="canyu" v-show="type=='mine'" @click="sure">{{bianji}}</span>
      <span class="canyu" v-show="dingyue && userid !=me &&type=='others'" @click="showcon">订阅</span>
      <span class="canyu" v-show="!dingyue && userid !=me &&type=='others'" @click="showcon">取消</span>
    </div>
  </div>
</template>

<script>
  import { Swiper,SwiperItem,TransferDomDirective as TransferDom ,Confirm} from 'vux'
  import bianji from "../zujian/bianjidivv"
  import tansuo from "../zujian/tansuo"
  export default {
    name: "faxiandetail",
    directives: {
      TransferDom
    },
    data(){
      return{
        height:"",
        biaoti:"",
        text:"",
        readonly:false,
        inputreadonly:true,
        type:"",
        minemore:1,
        loading:false,
        name:"",
        bianji:"编辑",
        userid:"",
        dingyue:false,
        me:localStorage.getItem('userid'),
        suretitle:"11",
        conshow:false
      }
    },
    methods:{
      showcon(){
        this.conshow=true
        if(!this.dingyue){
          this.suretitle="确定取消订阅么，南瓜将不会返还"
        }else{
          this.suretitle="赠送5个南瓜"
        }
      },
      dingyuesure(){
        var from=localStorage.getItem('userid');
        var to=this.userid;
        var that=this
        if(that.dingyue){
          var url=this.$store.state.url+"/zhuye/guanzhu/insert"
        }else{
          var url=this.$store.state.url+"/zhuye/guanzhu/delete"
        }
        this.axios.post(url,{
          from:from,
          to:to,
        }).then(function (res) {
          that.dingyue=!that.dingyue
          that.$vux.toast.text('OK')
        })
      },
      sure(){
        if(this.bianji=="编辑"){
          this.bianji="确定"
          this.readonly=true;
          this.inputreadonly=false
        }else if(this.bianji=="确定"){
          if(this.biaoti==""||this.text==""){
            return
          }
          var biaoti=this.biaoti;
          var text=this.text;
          var userid=this.userid;
          var that=this;
          this.axios.post(this.$store.state.url+"/zhuye/xuyan/insert",{
            userid:userid,
            biaoti:biaoti,
            text:text
          }).then(function (res) {
            that.$vux.toast.text('OK');
            that.bianji=="编辑"
          })
        }
      },
      xuyanget(){
        var userid=this.userid;
        var that=this;
        this.axios.post(this.$store.state.url+"/zhuye/xuyan/select",{
          userid:userid,
        }).then(function (res) {
          if(res.data.length!=0){
            that.biaoti=res.data[0].biaoti
            that.text=res.data[0].text
          }
        })
      },
      gaibian(){
        this.loading=true
      },
      loadMoremine(){
        this.minemore++
      },
    },
    components: {
      Swiper,tansuo,SwiperItem,bianji,TransferDom,Confirm
    },
    mounted(){
      this.xuyanget()
    },
    beforeDestroy() {
      this.$bus.off('todingyue');
    },
    created(){
      this.$bus.on('todingyue',num=>{
        this.dingyue=true
      })
      this.type=this.$route.params.type;
      var h =window.screen.availHeight;
      this.height=(h-46)+'px';
      if(this.$route.params.type=="faxian"){
        this.biaoti=this.$route.params.data.biaoti;
        this.text=this.$route.params.data.text;
        this.name="平行世界"
      }else if(this.$route.params.type=="mine"){
        localStorage.setItem("name","泽");
        this.name=localStorage.getItem("name");
        this.userid=localStorage.getItem("userid");
      }else if(this.$route.params.type=="others"){
        this.name=this.$route.params.data.name;
        this.userid=this.$route.params.data.userid;
      }
    }
  }
</script>

<style scoped>
.hello{
  width: 100%;
  height: 100%;
  background-color:#161823;
  color: #fff;
  box-sizing: border-box;
  position: relative;
}
  .content{
    padding: 20px;
    letter-spacing:6px;
    height: 100%;
    overflow: scroll;
    padding-bottom:58px ;
    font-size:14px;
    color: #808080;
    font-weight:400;
  }
  .biaoti{
    text-align: center;
    font-size: 18px;
    white-space:nowrap;
    overflow-x:scroll;

  }
  .biaoti input{
    text-align: center;
    background-color:#161823;
    border: none;outline: none;
    color: #cccccc;
    font-size: 16px;
    letter-spacing: 6px;
  }
  .text{
    margin-top: 40px;
    line-height: 20px;
    font-size: 15px;
  }
.bottom{
  height: 44px;
  width: 100%;
  background-color: #000;
  position: fixed;
  bottom: 0px;
  font-size:30px;
  line-height: 44px;
  color: #fff;
}
  .icon-return{
    font-size: 30px;
    margin-left: 20px;
  }
  .canyu{
    display: inline-block;
    float: right;
    font-size: 16px;
    margin:12px 20px 12px 0;
    border: solid 1px #c93757;
    line-height: 20px;
    padding: 0 5px;
    color: #c32136;
  }
   .container{
     position: absolute;
     top: 46px;
     overflow-y: scroll;
     padding-bottom: 46px;
   }
  .top{
    position: absolute;
    z-index: 99;
    height: 46px;
    width: 100%;
    background-color: #000;
    text-align: center;
    line-height: 46px;
    font-size: 20px;
  }
</style>
