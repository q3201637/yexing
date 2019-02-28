export  default {
  install(Vue){
    Vue.prototype.touxiangtransform=function (userid,id) {
       if(id&&userid){
         return this.$store.state.picture+"/"+userid+"/touxiang/"+id+".jpg"
       }
      return ( require("@/assets/1.jpg"))

    };
    Vue.prototype.picturetransform=function (userid,photo) {
      if(userid&&userid){
        return this.$store.state.picture+"/"+userid+"/wenzhang/"+photo+".jpg"
      }
      return ( require("@/assets/1.jpg"))
    }
    Vue.prototype.faxiantransform=function (photo) {
      return this.$store.state.picture+"/faxian/guanfang/"+photo+".jpg"
    }
    Vue.prototype.uuid=function () {
      var d= new Date().getTime();
      var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function (c) {
        var r=(d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return(c=='x'? r : (r&0x3|0x8)).toString(16);
      })
      return id
    }
  }
}
