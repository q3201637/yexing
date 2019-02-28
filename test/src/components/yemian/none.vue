<template>

</template>

<script>
  export default {
    name: "none",
    data(){
      return{

      }
    },
    mounted(){
      var that=this
      var userid=localStorage.getItem('userid');
      var password=localStorage.getItem('password');
      var phone=localStorage.getItem('phone');
      if(userid&&password&&phone){
        this.axios.post(this.$store.state.url+'/login',{
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
        this.$router.push({name:'Login'})
      }
    }
  }
</script>

<style scoped>

</style>
