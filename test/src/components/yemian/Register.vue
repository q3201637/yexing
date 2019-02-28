<template>
  <div class="hello">
    <div class="content">
      <div class="welcome"><span>注册</span></div>
      <div class="login-inp"><label>手机号</label><input type="number" placeholder="" maxlength="11" v-model="phone"></div>
      <div class="login-inp"><label>密&nbsp&nbsp码</label><input type="password" placeholder="" v-model="password"></div>
      <div class="login-inp"><label>密&nbsp&nbsp码</label><input type="password" placeholder="" v-model="password1" ></div>
  <!--    <div class="login-inp"><label>验证码</label><input type="number"  placeholder="" maxlength="6" v-model="verify1"><button class="yanzhengbtn">发送</button></div>-->
      <div class="login-inp"><a href="#"  @click="zhuce">立即注册</a></div>
    </div>
    <div class="login-txt"><router-link to="Login">立即登录</router-link><router-link to="#">忘记密码？</router-link></div>
    <div id="exit"></div>
  </div>
</template>

<script>
  import { Loading,Toast } from 'vux'
  export default {
    data () {
      return {
        phone:"",
        password:"",
        password1:"",
        verify:"",
        verify1:"|"
      }
    },
    methods : {
      zhuce(){
        if(!(/^1[34578]\d{9}$/.test(this.phone))){
          this.$vux.toast.text("输入正确手机号");
          return ;
        }
        if(this.password.length<8){
          this.$vux.toast.text("密码至少8位");
          return ;
        }
        if(this.password1!=this.password){
          this.$vux.toast.text("俩次密码不一致");
          return ;
        }
        var obj ={phone:this.phone,password:this.password};
        var self=this;
        this.axios.post(this.$store.state.url+'/register',obj).then(function (res) {
          console.log(res)
          if(res.data.type=='phone'){
             self.$vux.toast.text('手机号已被注册')
          }else if(res.data.type=='error'){
            self.$vux.toast.text('哪里出错了')
          }else if(res.data.type=='success'){
            localStorage.setItem('userid',res.data.id);
            localStorage.setItem('phone',res.data.phone);
            localStorage.setItem('name',res.data.name);
            localStorage.setItem('password',res.data.password);
            localStorage.setItem('photo',"");
            self.$store.commit('user');
            this.frienddbbcreat();
            this.chatdbbcreat();
            var text='欢迎来到夜行'
            var obj={"id":that.uuid(),"send":1,"receive":pp.userid,"text":text,"type":3,"isread":0,"isreceived":1,userid:1,time:new Date()};
            this.friendadd(obj);
            this.chatdbinsert(obj)
            self.$vux.toast.text('注册成功');
            self.$router.push('/Zhuye')
          }
        })
      }
    },
    components: {
      Loading,Toast
    }
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
    position: relative;
  }
  .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-70%);
    width: 100%;
  }
  .welcome{width:100%;margin-bottom:40px;text-align: center}
  .welcome img{width:100%;}
  .welcome span{font-size: 40px;color: #fff;letter-spacing: 20px}
  .login-inp{margin:0 30px 15px 30px;border:1px solid #fff;border-radius:25px;}
  .login-inp label{width:4em;text-align:center;display:inline-block;color:#fff;}
  .login-inp input{line-height:40px;color:#fff;background-color:transparent;border:none;outline: none;}
  .login-inp a{display:block;width:100%;text-align:center;line-height:40px;color:#fff;font-size:16px;letter-spacing:5px;}
  .login-txt{text-align:center;color:#fff;position:fixed;bottom:20px;width:100vw}
  .login-txt a{color:#fff;text-decoration:none;width:50%;text-align:center;width:50%;display:inline-block;margin:0;float:left;line-height:40px}
  a{
    text-decoration:none
  }
  .yanzhengbtn{
    background-color: #ef5728;
    border: none;
    padding: 5px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    outline: none;
  }
</style>
