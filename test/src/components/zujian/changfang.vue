<template>
  <div class="wenben" :style="{width:wenbenwidth+'px',height:wenbenheight+'px'}" >
      <div v-if="type!='more'&&type!='tansuo'" @click="tozhengwen()">
        <div class="top" :style="{height:topheight+'px',width:topwidth+'px'}">
          <div class="imgdiv" :style="{width:imgdivheight+'px',height:imgdivheight+'px'}">
            <img :src="picturetransform(itemtrans.userid,itemtrans.photo)" alt="">
          </div>
        </div>
        <div class="biaoti" v-html="itemtrans.biaoti"></div>
        <div class="text" v-html="itemtrans.content"></div>
        <div class="person">
          <div class="picturediv">
            <img :src="touxiangtransform(itemtrans.userid,itemtrans.picture)" alt="">
          </div>
          <div class="namediv">
            <span>{{itemtrans.name}}</span>
          </div>
        </div>
      </div>
    <div v-if="type=='more'" style="background-color: #161823;width: 100%;height: 100%;position: relative;">
      <img class="more" src="../../assets/yuan.png" style="width: 60%" @click="tomore">
    </div>
    <div v-if="type=='tansuo'"  style="background-color: #161823;width: 100%;height: 100%;position: relative;">
      <img class="more" src="../../assets/yuan.png" style="width: 60%" @click="tomine">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        wenbenheight:"",
        wenbenwidth:"",
        topwidth:"",
        topheight:"",
        imgdivheight:"",
        juzhong:""
      }
    },
    methods:{
      tozhengwen(){
        /*const { href }  = this.$router.resolve({
          path: "/HelloWorld",
          query:{
            type:this.type,
            biaoti:this.itemtrans.biaoti,
            id:this.itemtrans.id,
            content:this.itemtrans.content,
            photo:this.itemtrans.photo,
            userid:this.itemtrans.userid,
            picture:this.itemtrans.picture,
            name:this.itemtrans.name,
            date:this.itemtrans.date,
          }
        });
        window.open(href, '_blank');*/

        this.$router.push({
          path:"/HelloWorld",
          query:{
            type:this.type,
            biaoti:this.itemtrans.biaoti,
            id:this.itemtrans.id,
            content:this.itemtrans.content,
            photo:this.itemtrans.photo,
            userid:this.itemtrans.userid,
            picture:this.itemtrans.picture,
            name:this.itemtrans.name,
            date:this.itemtrans.date,
          }
        })
      },
      tomore(){
        this.$router.push({
          name:"more",
          params:{
            type:"more",
          }
        })
      },
      tomine(){
        this.$router.push({
          name:"Faxiandetail",
          params:{
            type:"mine",
          }
        })
      }
    },
    computed:{
      photozuhe:function(){
        return this.$store.state.picture+"/"+this.userid+"/wenzhang/"+this.photo+".jpg"
      },
      itemtrans:function () {
        var pp=JSON.parse(this.item)
       /* if(this.type=="mine"){
          pp.name=localStorage.getItem("name");
          pp.photo=localStorage.getItem("photo")
        }*/
        return pp
      }
    },
    props:[
      "type","item","moretype"
    ],
    mounted:function () {
     //console.log(window.screen.availWidth)
     // console.log(window.screen.availHeight)
      var x=window.screen.availWidth;
      var y=window.screen.availHeight;
      this.wenbenwidth=x/2-30;
      this.wenbenheight=(y-44-40)/2-30;
      this.topwidth=this.wenbenwidth;
      this.topheight=this.wenbenheight-30-80-40;
      if(this.topwidth>=this.topheight){
        this.imgdivheight=(this.topheight)*0.8;
      }else{
        this.imgdivheight=(this.topwidth)*0.8;
      }

    }
  }
</script>
<style scoped>
  .wenben{
    display: inline-block;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    background-color: #fff;
  }
  .top{
    width: 100%;
    position: relative;
    background-color: #fff;
  }
  .imgdiv{
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    text-align: center;
    overflow: hidden;
  }
  .imgdiv>img{
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
  }
  .biaoti{
    height: 30px;
    width: 100x;
    line-height: 30px;
    text-align: center;
    letter-spacing:2px;
    font-size: 16px;
    padding:0 10px ;
    white-space:nowrap;
    overflow: hidden;
    text-overflow:ellipsis;/*超出部分文字以...显示*/
  }
  .text{/*高为80*/
    overflow: hidden;
    word-break:break-all;
    font-size:14px;
    line-height: 20px;
    letter-spacing: 6px;
    height: 60px;
    padding:10px 10px;
    text-align: center;
    color: #50616d;
  }
  .person{
    height: 40px;
    padding:0 10px ;
  }
  .picturediv{
    width: 30px;
    height: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    margin: 5px 0;
    display: inline-block;
  }
  .picturediv img{
    width: 100%;
  }
  .namediv{
    height: 100%;
    display: inline-block;
    vertical-align:top;
    line-height: 40px;
    color:#665757;
    padding-left: 10px;
    font-size: 14px;
  }
  .more{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
  .tansuo{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 10px 40px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    border: solid 1px #fff;
    color: #ff0097;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #000;
  }
</style>
