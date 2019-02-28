<template>
  <div class="hello">
    <div class="container" style="" ref="container">
      <croppa v-model="croppa"
              :placeholder="placeholder"
              :placeholder-font-size="14"
              :width="WindowWidth"
              :height="WindowHeight"
              :prevent-white-space="true"
              :show-remove-button="type=='new'||type=='edit'"
              :disabled="type!='new'&&type!='edit'"
              :show-loading="showDefaultSpinner"
      >
        <div class="spinner" v-if="croppa && croppa.loading"></div>
        <img crossOrigin="anonymous"
             :src="picturetransform(userid,photo)"
             slot="initial">
      </croppa>
      <div class="biaoti"  >
        <textarea placeholder="标题" maxlength="30" v-model="biaoti" v-bind:readonly="type!='edit'&&type!='new'"></textarea>
      </div>
      <bianjidiv v-model="content" :canEdit="canedit" :juzhong="juzhong"></bianjidiv>
    </div>
<!--    <div class="wenben" ref="edit"  :class="{'juzhong1':juzhong}" contentEditable='true' v-show="type=='new'||type=='edit'" :style="{ 'min-height': size + 'px' }" v-html="content" @input="handleinput()"></div>-->
    <!--<div class="wenben"  v-show="type='new'" :style="{ 'min-height': size + 'px' }" v-html="content" ></div>-->
    <div class="bottom" v-if="type=='new'||type=='edit'||type=='mine'">
      <i class="iconfont icon-return bottom-icon"  @click="fanhui"></i>
      <i class="iconfont icon-right bottom-icon" @click="shangchuan" v-show="type=='edit'||type=='new'" ></i>
      <i class="iconfont icon-brush bottom-icon" @click="edit" v-show="type=='mine'"></i>
      <i class="iconfont icon-youduiqi bottom-icon"  @click="juzhongduiqi" v-show="!juzhong"></i>
      <i class="iconfont icon-juzhongduiqi  bottom-icon" v-show="juzhong"  @click="juzhongduiqi"></i>
    </div>
    <div class="bottom" v-if="type=='others'">
      <i class="iconfont icon-return bottom-icon"  @click="fanhui"></i>
      <i class="iconfont icon-like bottom-icon" :class="{'red':red}" @click="shoucangupdate"></i>
      <i class="iconfont icon-nangua bottom-icon" @click="posshow" ></i>
      <i class="iconfont icon-more bottom-icon" @click="jubaoshow" ></i>
      <i class="iconfont icon-share bottom-icon" @click="fenxiangshow"></i>
    </div>
    <span class="datespan" @click="photoshow" v-show="type=='others'">{{date | timetrate}}</span>
    <div >
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img :src="touxiangtransform(userid,picture)" style="max-width:100%"  @click="togerenzhuye">
          <p>{{name}}</p>
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <popup v-model="show1" position="bottom">
      <div class="position" ref="position">
        <flexbox>
          <flexbox-item></flexbox-item>
          <flexbox-item style="text-align: right">
            <icon type="download" style="line-height: 40px"></icon>
          </flexbox-item>
        </flexbox>
        <flexbox >
          <flexbox-item :span="3"></flexbox-item>
          <flexbox-item :span="6">
            <input type="number"  max="3" placeholder="送多少南瓜呢" style="text-align: center;background-color:#c3c3c3;border: solid 1px #000" v-model="kapian">
            <!--<x-input class="pos-input" title="" type="number" placeholder="送多少南瓜呢"  :min="1" :max="6" text-align="center" :required="true" v-model="kapian"></x-input>-->
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item :span="9">
            <x-textarea class="pos-textarea"  placeholder="说点什么吧" :show-counter="false" :rows="1" :height="44" v-model="text"></x-textarea>
          </flexbox-item>
          <flexbox-item>
            <x-button type="warn" class="pos-button" @click.native="give">发送</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </popup>
    <actionsheet v-model="fenxiang" :menus="fenxiangmenu"  show-cancel></actionsheet>
    <div v-transfer-dom>
      <confirm v-model="jubao"
               show-input
               title="请说明举报理由"
               @on-cancel="jubaoCancel"
               @on-confirm="jubaoConfirm"
              >
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Loading,Toast ,XHeader,Popup,XInput, Group, XButton,XTextarea, Flexbox, FlexboxItem,Icon,XDialog,Actionsheet ,Confirm
  ,TransferDomDirective as TransferDom
  } from 'vux'
  import bianjidiv from './zujian/bianjidiv'
  import moment from 'moment'
  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        showDefaultSpinner:true,
        croppa: {},
        type:'',
        id:"",
        userid:"",
        biaoti:"",
        content:"",
        photo:"",
        picture:"",
        date:"",
        name:"",
        content:"",
        biaoti:"",
        show1:false,
        juzhong:true,
        canedit:true,
        showHideOnBlur:false,
        red:false,
        kapian:"",
        text:'',
        fenxiang:false,
        fenxiangmenu: {
          menu1: "功能还在完善呢",
        },
        jubao:false
      }
    },
    methods : {
      jubaoCancel(){
        this.jubao=false
      },
      jubaoConfirm(){
        this.jubao=false
      },
      fenxiangshow(){
        this.fenxiang=true
      },
      jubaoshow(){
        this.jubao=true
      },
      togerenzhuye(){
        this.$router.push({
          name:"Faxiandetail",
          params:{
            type:"others",
            data:this.$route.query
          }
        })
      },
      photoshow(){
        this.showHideOnBlur=true
      },
      handleinput () {
        this.content = this.$refs.edit.innerHTML
      },
      juzhongduiqi(){
        this.juzhong=!this.juzhong
      },
      fanhui(){
        this.$router.back(-1)
      },
      edit(){
        this.type="edit"
      },
      posshow(){
        this.show1=true
      },
      shangchuan(){
        if (!this.biaoti){
          this.$vux.toast.text('标题不能为空')
          return
        }
        if (!this.content){
          this.$vux.toast.text('内容不能为空')
          return
        }
        var id= this.id;
        var biaoti=this.biaoti;
        var content =this.content;
        var that=this;
        var url=this.$store.state.url;
        var userid=localStorage.getItem("userid");
        if(id){
          url=url+'/wenzhang/update'
        }else{
          url=url+'/wenzhang'
        }
        if (!this.croppa.hasImage()) {
          this.$vux.toast.text('请选择图片')
          return
        };
        this.croppa.generateBlob((blob) => {
            that.$vux.loading.show({
              text: '上传中'
            })
            var dataUrl = that.croppa.generateDataUrl('image/jpeg', 0.5)
       //   console.log(dataUrl)
            that.axios.post(url,{
              id:id,
              biaoti:biaoti,
              content:content,
              userid:userid,
              dataUrl:dataUrl,
              date:new Date()
          }).then(
            function (res) {
              console.log(res.data);
              that.$vux.loading.hide();
              that.photo=res.data.photo;
              that.conten=res.data.content;
              that.biaoti=res.data.biaoti;
              that.id=res.data.id;
              that.type="mine"
            }
          ).catch(function (res) {
              that.$vux.loading.hide();
          })
         // console.log(blob)
        })
      },
      shoucangget(){
        var that=this;
        var id =this.id;
        var userid =localStorage.getItem('userid');
        this.axios.post(this.$store.state.url+'/zhuye/shoucang/one',{
          kapian:id,
          userid:userid
        }).then(function (res) {
          if(res.data.length!=0){
            that.red=true
          }
        })
      },
      shoucangupdate(){
        var url;
        var that=this;
        if(this.red){
          url=this.$store.state.url+'/zhuye/shoucang/delete'
        }else{
          url=this.$store.state.url+'/zhuye/shoucang/insert'
        }
        this.axios.post(url,{
          kapian:that.id,
          userid:localStorage.getItem('userid')
        }).then(function (res) {
          that.red=!that.red
        })
      },
      give(){
        var that=this;
        if(!this.kapian){
          this.$vux.toast.text('送个南瓜呗')
          return
        }
        this.axios.post(this.$store.state.url+'/zhuye/nangua/kapianupdate',{
          userid:localStorage.getItem('userid'),
          kapian:this.kapian
        }).then(function (res) {
          if(res.data=='ok'){
            that.$vux.toast.text('OK');
            that.show1=false;
            var text=that.text;
            var send=localStorage.getItem('userid')
            var obj={"id":that.uuid(),"send":send,"receive":that.userid,"text":text,"type":1,"isread":1,"isreceived":0,userid:that.userid,time:new Date()};
            that.iochatsend(obj)
            that.friendadd(obj);
            that.chatdbinsert(obj);
            that.text="";
            that.kapian=""
          }else{
            that.$vux.toast.text('南瓜是不是不够了哦')
          }
        }).catch(function (err) {
          that.$vux.toast.text('好像哪里出了问题')
        })
      }
    },
    computed:{
      WindowHeight:function () {
        return (window.screen.availWidth-20)*0.6
      },
      WindowWidth:function () {
        return window.screen.availWidth
      },
      size:function () {
        var min =window.screen.availHeight-(window.screen.availWidth-20)*0.6-5-20-40-40-50;
        return min
      },
      placeholder() {
        return this.croppa && this.croppa.loading ? '' : '请 选 择 图 片'
      },
    },
    created:function () {
      this.type=this.$route.query.type;
      if(this.type!="new"){
        this.canedit=false
      }
      if(this.$route.query.id){
        this.id=this.$route.query.id;
        this.biaoti=this.$route.query.biaoti;
        this.content=this.$route.query.content;
        this.photo=this.$route.query.photo;
        this.userid=this.$route.query.userid;
        this.picture=this.$route.query.picture;
        this.name=this.$route.query.name;
        this.date=this.$route.query.date;
        this.shoucangget()
        // this.juzhong=this.$route.params.data.juzhong
      }
    },
    mounted:function () {
      var that=this
    //  container
      window.addEventListener('native.keyboardshow', keyboardShowHandler);
      function keyboardShowHandler(e){
        setTimeout(function(){
          that.$refs.position.style.paddingBottom=e.keyboardHeight+10+'px';
          that.$refs.container.style.bottom=e.keyboardHeight+10+'px'
        },300)
      }
      window.addEventListener('native.keyboardhide', keyboardHideHandler);
      function keyboardHideHandler(e){
        setTimeout(function(){
          that.$refs.position.style.paddingBottom=10+'px';
          that.$refs.container.style.bottom=48+'px'
        },300)
      }

    },
    filters:{
     timetrate:function (val) {
       return moment(val).format('YYYY-MM-DD ');
     }
    },
    components: {
      Loading, XHeader, Popup,XInput, Group, XButton,XTextarea, Flexbox, FlexboxItem,Icon,bianjidiv,XDialog,Actionsheet,Confirm
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  padding-top: 5px;
  margin: 0px;
  overflow: hidden;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
.container{
  position: absolute;
  bottom: 48px;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  overflow-x:hidden;
}
/*.container::-webkit-scrollbar {
  display:none
}
.container {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}*/

  .biaoti{
    text-align: center;
    border-bottom:1px solid #cccccc;
    margin: 0 10px;
    overflow: hidden;
  }
  .biaoti>textarea{
    outline:none;
    border:none;
    height:40px;
    white-space:nowrap;
    line-height: 40px;
    font-size:20px;
    text-align: center;
    overflow-x:scroll;
  }
  .biaoti>textarea::-webkit-scrollbar {
  display: none;
  }
  .wenben{
    padding:10px 20px;
    outline:none;
    letter-spacing:8px;
    font-size:16px;
    color: #808080;
    font-weight:400;
  }
  .juzhong1{
    text-align: center;
  }
.bottom{
  position: absolute;
  bottom: 0px;
  height: 44px;
  width: 100%;
  background-color: #000;

}
  .bottom-icon{
    font-size:30px;
    line-height: 44px;
    color: #fff;
  }
  .bottom .icon-brush{
    float: right;
    margin-right: 20px;
  }
  .bottom .icon-right{
    float: right;
    margin-right: 20px;
  }
  .bottom .icon-return{
    margin-left: 20px;
  }
  .icon-like{
    margin-left: 20px;
  }
  .icon-share{
    float: right;
    margin-right: 20px;
  }
  .icon-juzhongduiqi,.icon-youduiqi{
    float: right;
    margin-right: 20px;
  }
.icon-more{
   float: right;
  margin-right: 20px;
}
  .icon-nangua{
    position: absolute;
    left: 50%;
    top:-15px;
    color: greenyellow;
    font-size: 50px;
    margin:0 -25px ;
  }
  .position{
    background-color: #666;
    padding:10px;
  }
  .pos-input{
    background-color: #333;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  .pos-button{
    width: 100%;
  }
  .pos-textarea{
    -webkit-border-radius: 10px;
    -moz-border-radius: ;
    border-radius: ;
  }
  .datespan{
    top: 50%;
    right: 0;
    transform: translate(-50%, 0);
    position: fixed;
    display: inline-block;
    width: 14px;
    font-size: 14px;
    word-break:break-all;
    text-align: center;
    background-color: #9d2933;
    color: #ccc;
    padding: 10px 0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .datespan .icon-return{
    font-size: 20px;
  }
  .red{
    color: red;
  }
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 70px;
  width: 70px;
  margin-left: -35px;
  margin-top: -35px;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  border: 3px solid #ddd;
  border-top: 3px solid #42a5f5;
  border-radius: 50%;
}

@-webkit-keyframes spin {
  to {
    border-top-color: #ec407a;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  to {
    border-top-color: #ec407a;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
