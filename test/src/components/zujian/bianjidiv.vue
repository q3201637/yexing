<template>
  <div class="edit-div" :class="{'juzhong':juzhong}"
       v-html="innerText"
       :contenteditable="canEdit"
       @focus="isLocked = true"
       @blur="isLocked = false"
       @input="changeText">
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
      canEdit: {
        type: Boolean,
        default: ""
      },
      juzhong: {
        type: Boolean,
        default: ""
      }
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
      }
    },

  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .edit-div {
    width: 100%;
    min-height: 300px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    padding:10px 20px;
    outline:none;
    letter-spacing:8px;
    font-size:16px;
    color: #808080;
    font-weight:400;
    box-sizing: border-box;
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
