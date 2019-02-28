<template>
    <div class="hello">
     <!-- <span class="no">空空如也</span>-->
      <Triangle v-for="(item,index) in haoyouwenzhang"
                :key="index"
                :item="JSON.stringify(item)"
                type="others"
      ></Triangle>
      <Triangle
        type="more"
        moretype="tansuo"
      ></Triangle>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
              haoyouwenzhang:{}
            }
        },
      methods: {
        qingqiu(){
          var that=this;
          this.axios.post(this.$store.state.url+"/zhuye/haoyou1",{
            userid:localStorage.getItem("userid"),
            type:"guanzhu",
            userid:localStorage.getItem("userid")
          }).then(function (res) {
            that.haoyouwenzhang=res.data
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    height: 100%;
    width: 100%;
    position: relative;
  }
  .no{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ccc;
  }
</style>
