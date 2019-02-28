<template>
  <div class="hello">
    <Triangle v-for="(item,index) in haoyouwenzhang"
              :key="index"
              :item="JSON.stringify(item)"
              type="mine"
    ></Triangle>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        haoyouwenzhang:[],
        date:"2099-01-29T05:46:39.746Z",
        more:this.mineemore
      }
    },
    methods: {
      qingqiu(){
        var that=this;
        this.axios.post(this.$store.state.url+"/zhuye/mine",{
          userid:that.userid,
          ziji:localStorage.getItem('userid'),
          date:this.date
        }).then(function (res) {
          that.haoyouwenzhang=that.haoyouwenzhang.concat(res.data.data);
          that.date=res.data.data[res.data.data.length-1].date;
          if(res.data.data.length<10){
            if(that.userid!=localStorage.getItem('userid')){
              if(res.data.len==0){
                that.$vux.toast.text('还没订阅呢')
                that.$bus.emit('todingyue',true)
              }
            }
            that.$emit('bianhua',true)
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    mounted:function () {
      this.qingqiu();

    },
    components:{

    },
    props:["minemore",'userid',"type"],
    watch:{
      minemore:{
        handler: function ( newVal, oldVal ) {
          this.qingqiu()
        },
        deep: true
      }
      }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
