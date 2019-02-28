import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



const state = {
 /* url: "http://47.99.122.154:3030",*/
  url:'http://47.99.122.154:3030',
  picture:"http://47.99.122.154:3030/tupian/uploads",
  userid:"",
  username:"",
  phone:"",
  photo:"",
  name:"",


};

const mutations = {
  user(state){
    state.userid=localStorage.getItem("userid");
    state.username=localStorage.getItem("username");
    state.photo=localStorage.getItem("photo");
    state.phone=localStorage.getItem("phone");
    state.name=localStorage.getItem("name");
  },
}





export default new Vuex.Store({
  state,mutations

})
