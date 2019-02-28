<template>
  <div class="hello">
    <div class="top">探索</div>
    <div div class="content"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="30"
         :infinite-scroll-immediate-check="true"
    >
        <Triangle v-for="(item,index) in haoyouwenzhang"
                  :key="index"
                  :item="JSON.stringify(item)"
                  type="others"
        ></Triangle>
    </div>
    <div class="bottom">
      <i class="iconfont icon-return" @click="$router.back(-1)"></i>
    </div>
  </div>
</template>
<script>
    export default {
        name: "more",
        data:function () {
          return{
            haoyouwenzhang:[],
            date:"2099-01-29T05:46:39.746Z",
            loading:false
          }
        },
        methods:{
          loadMore(){
            this.qingqiu()
          },
          qingqiu(){
            var that=this;
            this.axios.post(this.$store.state.url+"/zhuye/haoyou1",{
              userid:localStorage.getItem("userid"),
              type:"guanzhumore",
              date:this.date
            }).then(function (res) {
              that.haoyouwenzhang=that.haoyouwenzhang.concat(res.data);
              that.date=res.data[res.data.length-1].date
              if(res.data.length<10){
                that.loading=true
                that.$vux.toast.text('快到底了')
              }
            }).catch(function (res) {
              console.log('err')
            })
          }
        },
        mounted:function () {
          this.qingqiu()
        }
    }
</script>

<style scoped>
  .hello{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #161823;
    box-sizing: border-box;
  }
  .top{
    width: 100%;
    height: 46px;
    background-color: #000;
    font-size: 16px;
    line-height: 46px;
    text-align: center;
    color:#fff;
    letter-spacing: 5px;
  }
  .content{
    position: absolute;
    top:46px;
    bottom:44px;
    overflow-y: scroll;
    width: 100%;
  }
  .bottom{
    position: fixed;
    background-color: #000;
    height: 44px;
    width: 100%;
    bottom: 0;
    line-height: 44px;
    color: #fff;
  }
  .icon-return{
    font-size: 30px;
    margin-left: 20px;
  }
</style>
