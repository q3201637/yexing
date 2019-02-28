<template>
  <div id="app" >
    <span class="tiaoguo" ref="tiaoguo" @click="tiaozhuan"></span>
    <div class="spandiv" ref="app"></div>
    <div class="exit"></div>
  </div>
</template>

<script>
  import { Cell, Group,Icon,XTextarea  } from 'vux'
  import bianjidiv from "./bianjidiv"
    export default {
        name: 'HelloWorld',
        data() {
            return {
              str:'其实平行世界用了3年多 上面不能刻意的交友 有时候只是随意的翻着 然后它收费了 就这样我和我的小伙伴都走丢了 虽然偶尔只是淡淡的聊着 年前的一个月闲着无聊 写了这个app 可惜以前的什么都回不来 现在是2019-2-17的夜里 考研成绩已经出来了几天 外面乌云密布，手冻的发紫 有多少小伙伴和我一样 还在黑夜里行走 有时候 多么希望有谁愿意倾听 其实无所谓了 我们都是勇敢的人儿 对生活无所畏惧 这款app-夜行-送给你们  ------某某',
              timer:0,
              i:0,
              tiaoguo:5,
              to:""
            }
        },
      methods:{
          tiaozhuan(){
            if(this.$refs.tiaoguo.innerHTML=='跳过'){
              this.$router.push({name:'Login'})
            }
          },
          dazi(){
            var that =this
            var tiaoguodiv=this.$refs.tiaoguo;
            var tianguodingshi =setInterval(function () {
              tiaoguodiv.innerText=that.tiaoguo-- +'s';
              if(that.tiaoguo==0){
                tiaoguodiv.innerText='跳过';
                window.clearInterval(tianguodingshi)
              }
            },1000)
            let divTyping = this.$refs.app;
            var ww =document.createElement('span');
            var www=document.createElement('span');
            ww.className="ww";
            ww.style.letterSpacing=6+'px';
            ww.style.lineHeight=20+'px'
            ww.style.fontSize=14+'px'
            ww.style.color="#ccc"
            www.className='www'
            www.innerText='|'
            divTyping.append(ww,www)
            var pp =setInterval(function () {
              if(that.i>that.str.length){
                window.clearInterval(pp)
              }else{
                if(that.str.charAt(that.i)==" "){
                  ww.innerHTML=ww.innerHTML+'<br>'
                }else{
                  ww.innerHTML= ww.innerHTML+that.str.charAt(that.i)
                }
                that.i++
              }

            },300)
           /* if (this.i <= this.str.length) {
              divTyping.innerHTML = this.str.slice(0, this.i++) + '_'
              window.timer = setTimeout(this.dazi(), 1000)
            }else {
              divTyping.innerHTML = this.str//结束打字,移除 _ 光标
              clearTimeout(this.timer)
            }*/
          }

      },
      mounted: function () {
        this.dazi()
      },
      components: {
        XTextarea, Group,bianjidiv
      },
      created:function () {
        var that=this
        var userid=localStorage.getItem('userid');
        var password=localStorage.getItem('password');
        var phone=localStorage.getItem('phone');
        if(userid&&password&&phone){
          this.axios.post(this.$store.state.url+'/denglu',{
            userid:userid,
            phone:phone,
            password:password
          }).then(function (obj) {
            if(obj.data.state=="success"){
              that.$router.push({name:'Zhuye'})
            }
          }).catch(function () {
            that.$router.push({name:'Zhuye'})
          })
        }else{
          //this.$router.push({name:'Login'})
        }
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body {
    margin: 0;
  }
  #app{
    background-color: #161823;
    padding: 20px;
    color: #fff;
    overflow: hidden;
  }
  .ww{
    letter-spacing: 10px;
    line-height: 20px;
    font-size: 16px;
  }
  .spandiv{
    position: fixed;
    top: 40px;
  }
  .tiaoguo{
    position: fixed;
    right: 20px;
    top: 10px;
    display: inline-block;
    background: #666666;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    color: #45b795;
  }



</style>
