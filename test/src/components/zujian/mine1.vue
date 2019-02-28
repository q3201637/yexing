<template>
  <div class="hello">
    <Triangle v-for="(item,index) in haoyouwenzhang"
              :key="index"
              :item="JSON.stringify(item)"
              type="mine"
    ></Triangle>
    <Triangle
      type="tansuo"
      moretype="tansuo"
    ></Triangle>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        haoyouwenzhang:[],
      }
    },
    methods: {
      qingqiu(){
        var that=this;
        this.axios.post(this.$store.state.url+"/zhuye/mine1",{
          userid:localStorage.getItem("userid"),
          date:this.date
        }).then(function (res) {
          that.haoyouwenzhang=res.data
        }).catch(function (res) {
          console.log('err')
        })
      }
    },
    mounted:function () {
      this.qingqiu()
    },
    components:{

    },
    props:["minemore"],
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
