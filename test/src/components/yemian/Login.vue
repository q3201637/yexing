<template>
  <div class="hello">
    <div class="content">
      <div class="welcome"><img src="../../assets/welcome.png"></div>
      <div class="login-inp"><label>手机号</label><input type="number"  placeholder="" v-model="phone" ref="input"></div>
      <div class="login-inp"><label>密&nbsp&nbsp码</label><input type="password" placeholder="" maxlength="11" v-model="password"></div>
      <div class="login-inp" @click="login"><a href="#"  >立即登录</a></div>
    </div>
    <div class="login-txt"><router-link to="Register">立即注册</router-link><router-link to="#">忘记密码？</router-link></div>
    <div id="exit"></div>
  </div>
</template>
<script>
  import { Loading,Toast } from 'vux'
  export default {
    data () {
      return {
        phone:"",
        password:""
      }
    },
    methods : {
      login(){
        if(!(/^1[34578]\d{9}$/.test(this.phone))){
          this.$vux.toast.text('请输入正确手机号')
          return
        }
        var phone=this.phone;
        var password=this.password;
        var zhanxian="true"
        this.yanzheng(phone,password)
      },
      yanzheng(phone,password,zhanxian){
        var that=this
        var url=this.$store.state.url;
        this.axios.post(url+"/denglu",{
          phone:phone,
          password:password
        }).then(function (obj) {
          if(obj.data.state=="success"){
            var pp=obj.data.data[0]
            localStorage.setItem("userid",pp.userid);
            localStorage.setItem("phone",pp.phone);
            localStorage.setItem("picture",pp.picture);
            localStorage.setItem("password",pp.password);
            localStorage.setItem("name",pp.name);
            that.$store.commit('user');
            that.frienddbbcreat();
            that.chatdbbcreat();
            var text='欢迎来到夜行'
            var obj={"id":that.uuid(),"send":1,"receive":pp.userid,"text":text,"type":3,"isread":0,"isreceived":1,userid:1,time:new Date()};
            that.friendadd(obj);
            that.chatdbinsert(obj);
            that.iologin()
            that.$router.push('/zhuye');
          }else{
            that.$vux.toast.text('账号密码错误')
          }
        }).catch(function () {
          that.$vux.toast.text('登录错误')
        })
      }
    },
    mounted:function () {
      this.$nextTick(() => {this.$refs['input'].focus()});
      var that=this
    },
    components: {
      Loading,Toast
    },
    /*beforeRouteLeave(to, from, next) {
      if(to.name=='Zhuye') {
        to.meta.keepAlive = false;
      }
      next();
    },*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/bg1.jpg") ;
    background-size:100% 100%;
    box-sizing: border-box;
  }
  .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-70%);
    width: 100%;
  }
  .welcome{width:100%;margin-bottom:40px}
  .welcome img{width:100%;}
  .login-inp{margin:0 30px 15px 30px;border:1px solid #fff;border-radius:25px;}
  .login-inp label{width:4em;text-align:center;display:inline-block;color:#fff;}
  .login-inp input{line-height:40px;color:#fff;background-color:transparent;border:none;outline: none;}
  .login-inp a{display:block;width:100%;text-align:center;line-height:40px;color:#fff;font-size:16px;letter-spacing:5px;}
  .login-txt{text-align:center;color:#fff;position:fixed;bottom:20px;width:100vw}
  .login-txt a{color:#fff;text-decoration:none;width:50%;text-align:center;width:50%;display:inline-block;margin:0;float:left;line-height:40px}
  a{
    text-decoration:none
  }
</style>
