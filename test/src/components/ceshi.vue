<template>
    <div class="hello">
      <div class="bangdan">
        打卡榜单
      </div>
      <div class="content" v-for="(item,index) in list" :key="index">
        <div class="imgdiv aa">
          <img :src="picturetransform(3,item.id)" alt="">
        </div>
        <div class="name aa">
          <span>{{item.name}}</span>
        </div>
        <div class="xingxing aa">
         {{item.number}}<!-- <i class="iconfont icon-nangua"></i>-->
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
              list:[]
            }
        },
        methods: {

        },
        mounted(){
          var self=this;
         this.axios.post(this.$store.state.url+"/zhuye/bangdan").then(function (res) {
           self.list=res.data;
           console.log(self.list)
         })
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    width: 100%;
    height: 100%;
    padding-top: 20px;
    background-color: #000;
    background: url("../assets/7.jpg") no-repeat ;
    background-size:100% 100%;
  }
  .bangdan{
    text-align: center;
    font-size: 30px;
    color: #cccccc;
    padding-top: 40px;
    padding-bottom: 10px;
    margin-bottom:0px;
    font-family:"Arial,Helvetica,sans-serif";
    text-shadow:yellow 1px 0 0,yellow 0 1px 0,yellow -1px 0 0,yellow 0 -1px 0;
    letter-spacing: 8px;
  }
  .content{
    width: 100%;
    height: 30px;
    position: relative;
  }
  .aa{
    display: inline-block;
  }
  .imgdiv{
    height: 25px;
    width:80px;
    padding-left: 50px;
  }
  .imgdiv img{
    height: 100%;
  }
  .name{
    position: absolute;
    height: 60px;
    left: 60px;
    right: 60px;
    color: #fff;
    font-size: 14px;
    line-height: 30px;
    box-sizing: border-box;
    text-align: center;
    font-weight: 50;
    letter-spacing: 2px;
  }
  .xingxing{
    position: absolute;
    height: 60px;
    top: 0;
    left: 320px;
    color: #fff;

  }
  .icon-nangua{
    color: #ffa400;
    font-size: 12px;
    line-height: 30px;
  }

</style>
