<template>
    <div class="hello">
      <div class="top">探索</div>
      <div class="bottom">
        <i class="iconfont icon-return" @click="$router.back(-1)"></i>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
        methods: {}

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    height: 100%;
    width: 100%;
    background-color: #ffffff;
  }
  .top{
    width: 100%;
    height: 46px;
    background-color: #000;
    font-size: 16px;
    line-height: 46px;
    text-align: center;
    color:#fff;
    letter-spacing: 5px;
  }
  .bottom{
    position: fixed;
    background-color: #000;
    height: 44px;
    width: 100%;
    bottom: 0;
    line-height: 44px;
    color: #fff;
  }
</style>
