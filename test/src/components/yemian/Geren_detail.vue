<template>
    <div class="hello">
      <div class="header">
        <i class="iconfont  icon-return" @click="$router.back(-1)"></i>
        <i class="iconfont icon-right" @click="shangchuan"></i>
      </div>
      <div class="imgdiv">
        <img id="imgpre" ref="imgpre" :src="photo" @click="imgclick" >
      </div>
      <div>
        <flexbox >
          <flexbox-item :span="3"></flexbox-item>
          <flexbox-item :span="6">
            <x-input class="nameinput" title="" type="text" v-model="name"  :min="1" :max="16" text-align="center" style=""></x-input>
          </flexbox-item>
        </flexbox>
      </div>
      <input type="file" ref="input" accept="image/png,image/jpg,image/jpeg" @change="imgchange($event)" style="display: none;">
    </div>
</template>
<script>
    import { XInput,Group,Cell , Flexbox, FlexboxItem } from 'vux'
    export default {
        name: 'HelloWorld',
        data() {
            return {
              palshow:false,
              name:localStorage.getItem("name"),

            }
        },
        methods: {
          imgclick(){
            this.$refs.input.click()
          },
             pal(){
               this.$refs.cropee.palshow1()
             },
          imgchange( event ) {
            let image = document.getElementById('imgpre'); //预览对象
            this.clip(event , {
              resultObj : image,
              aspectRatio : 1
            })
          },
          shangchuan(){
            var url=this.$store.state.url;
            var userid=localStorage.getItem("userid")
            var src=this.$refs.imgpre.getAttribute('src');
            var name=this.name;
            var that=this
            if(src=="null"||src==""||src=="undefined"||src.indexOf('data:image')==-1){
              src=""
            }
            if(this.name.length>16){
              return
            }
            if(this.name==localStorage.getItem("name")&&src==""){
              return
            }
            this.axios.post(url+'/gerendetail/update',{
              userid:userid,
              name:name,
              src:src
            }).then(function (res) {
              if(res.data.photo){
                localStorage.setItem("photo",res.data.photo);
              }
              localStorage.setItem("name",res.data.name);
              that.$store.commit('user');
              that.$router.back(-1)
            }).catch(function () {
              console.log('err')
            })
          }
        },
      components:{
        XInput,Group,Cell, Flexbox, FlexboxItem
      },
      mounted(){
      },
      computed:{
          photo:function(){
            if(localStorage.getItem("photo")){
              return this.touxiangtransform(localStorage.getItem("userid"),localStorage.getItem("photo"))
            }else{
              return("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547945979360&di=1a359c39f1dacf0409031f4e1f7e317b&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F962bd40735fae6cd5eb22fe902b30f2442a70f37.jpg")
            }
          }
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background-color: #666666;
  width: 100%;
  height: 100%;
  position: relative;
}
.header{
  height: 46px;
  background-color: #666666;
  text-align: center;
  line-height: 46px;
  color: #fff;
  font-size:20px;
  padding: 0 20px;
}
.icon-return{
  float: left;
}
.icon-right{
  float: right;
}
  .imgdiv{
    background-color: #fff;
    height: 120px;
    width: 120px;
    text-align: center;
    overflow: hidden;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin:0 auto
  }
  .imgdiv>img{
    height: 100%;
    width: 100%;
  }
  .nameinput{
    background-color: #666666;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-top: 20px;
  }
</style>
