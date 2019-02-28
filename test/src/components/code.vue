<template>
    <div class="body">
      <div  contenteditable="true" class="bianji"  ref="msg">
      </div>
      <button @click="tanchu">11</button>
    </div>
</template>

<script>
    export default {
        name: 'Code',
        data() {
            return {

            }
        },
        methods: {
          tanchu(){
            alert(this.$refs.msg.innerHTML)
          }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    padding:0px;
    margin:0px
  }
.body{
  padding:20px;
}
.bianji{
  width:100%;
  min-height:100px;
  border:none;
  outline: none;
  overflow:hide;
  letter-spacing:8px;
  font-size:18px;
  word-wrap: break-word;
  text-align: center;
}
</style>
