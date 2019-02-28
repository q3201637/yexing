<template>
    <div class="hello">
      <div style="margin: 20px;overflow: hidden;" @click="tiaozhuan(item)" v-for="(item,index) in faxianlist" :key="index">
        <masker style="border-radius: 2px;"  :opacity="0">
          <div class="m-img"  :style="{backgroundImage: 'url(' + faxiantransform(item.photo) + ')'}" style=""></div>
          <div slot="content" class="m-title" :style="{color:item.color}">
           {{item.xuyan}}
            <br/>
            <span class="m-time" >{{item.time}}</span>
          </div>
        </masker>
      </div>
    </div>
</template>

<script>
    import { Masker } from 'vux'
    export default {
        name: 'HelloWorld',
        data() {
            return {
              faxianlist:[]
            }
        },
        methods: {
          tiaozhuan(item){
            this.$router.push({
              path:"Faxiandetail",
              query:{
                type:"faxian",
                data:item
              }
            })
          }
        },
        components: {
          Masker
        },
        mounted:function () {
          var that =this;
          var url =this.$store.state.url;
          this.axios.post(url+'/gerendetail/faxian').then(function (res) {
            that.faxianlist=res.data
          })
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-img {
    padding-bottom: 50%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }

  .m-time {
    font-size: 12px;
    padding-top: 4px;
    border-top: 1px solid ;
    display: inline-block;
    margin-top: 5px;
  }
</style>
</style>
