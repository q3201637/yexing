<template>
    <div class="hello1">
      <div @click="poshide" style="display: inline-block">
        <icon type="cancel" style="margin: 10px 0 0 10px;" ></icon>
      </div>
      <group>
        <cell :title="name"  class="cell" link="./GerenDetail">
          <img :src="photo" slot="icon" style="display:block;margin-right:5px;height: 60px;width: 60px">
          <div>
            <i class="iconfont icon-enter"></i>
          </div>
        </cell>
      </group>
      <group >
        <cell  title="收藏"  class="cell">
          <div>
            <i class="iconfont icon-enter"></i>
          </div>
        </cell>
        <cell  title="版本"  class="cell">
          <div>
            <i class="iconfont icon-enter"></i>
          </div>
        </cell>
        <cell  title="退出"  class="cell" >
          <div @click="tuichu">
            <i class="iconfont icon-enter"></i>
          </div>
        </cell>
      </group>
      <div v-transfer-dom>
        <confirm
          v-model="show"
          :show-cancel-button="true"
          title="确定退出么"
          @on-confirm="onConfirm"
        >
          <p style="text-align:center;" ></p>
        </confirm>
      </div>
    </div>
</template>

<script>
    import { Cell, Group,Icon,TransferDomDirective as TransferDom ,Confirm  } from 'vux'
    export default {
        name: 'HelloWorld',
      directives: {
        TransferDom
      },
        data() {
            return {
              show:false
            }
        },
        methods: {
          poshide(){
            this.$emit('poshide1')
          },
          togeren(){
            alert('1')
          },
          tuichu(){
            this.show=true
          },
          onConfirm(){
            var userid=localStorage.getItem('userid')
            this.dbdrop("friend"+userid);
            this.dbdrop("chat"+userid);
            this.$socket.emit('disconnect1', {userid:localStorage.getItem('userid')});
            localStorage.clear();
            this.$router.push({name:'Login'})
            this.$emit('zhuxiao')
          }
        },
        components:{
          Cell, Group,Icon,TransferDom,Confirm
        },
      computed:{
          photo:function () {
            return this.touxiangtransform(localStorage.getItem('userid'),localStorage.getItem('photo'))
          },
          name:function () {
            return localStorage.getItem('name')
          }
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello1{


}
.cell{
   background-color: #ccc;
   color:#666
}
</style>
