<template>
  <div class="edit-div""
       v-html="innerText"
       @focus="focus1($event)"
       @blur="blur1($event)"
       @input="changeText"
      contenteditable="true"
  >

  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'editDiv',
    props: {
      value: {
        type: String,
        default: ''
      },
    },
    data(){
      return {
        innerText: this.value,
        isLocked: false
      }
    },
    watch: {
      'value'(){
        if (!this.isLocked && !this.innerText) {
          this.innerText = this.value;
        }
      }
    },
    methods: {
      changeText(){
        this.$emit('input', this.$el.innerHTML);
      },
      focus1(event){
        var el=event.target
        el.isLocked = true;
        this.$emit('mefocus',"");
      },
      blur1(event){
        var el=event.target
        el.isLocked = false
        this.$emit('meblur',"");
      }
    },

  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .edit-div {
    width: 100%;
    min-height: 44px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    padding:12px 20px;
    outline:none;
    letter-spacing:6px;
    font-size:16px;
    line-height: 20px;
    color: #808080;
    box-sizing: border-box;
    background-color: #ccc;
    &[contenteditable=true]{
      user-modify: read-write-plaintext-only;
      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
  .juzhong{
    text-align: center;
  }
</style>
