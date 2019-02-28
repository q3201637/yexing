
<template>

  <div id="demo">
    <!-- 遮罩层 -->
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>
      <i class="iconfont icon-close" @click="panel=!panel"></i>
      <i class="iconfont icon-right" @click="crop"></i>
    </div>

    <div style="padding:20px;display: none">
      <div class="show">
        <div class="picture" :style="'backgroundImage:url('+headerImage+')'">
        </div>
      </div>
      <div style="margin-top:20px;">
        <input type="file" id="change" accept="image" @change="change" ref="imgimput">
        <label for="change"></label>
      </div>

    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  export default {
    components: {

    },
    data () {
      return {
        headerImage:'',
        picValue:'',
        cropper:'',
        croppable:false,
        panel:false,
        url:''
      }
    },
    props:["parentval"],
    mounted () {
      //初始化这个裁剪框
      var self = this;
      var image = document.getElementById('image');
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        background:false,
        zoomable:false,
        ready: function () {
          self.croppable = true;
        }
      });
    },
    watch:{
    },
    methods: {
      palshow1(){
        this.$refs.imgimput.click()
      },
      getObjectURL (file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      change (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.panel = true;
        this.picValue = files[0];

        this.url = this.getObjectURL(this.picValue);
        //每次替换图片要重新得到新的url
        if(this.cropper){
          this.cropper.replace(this.url);
        }
        this.panel = true;

      },
      crop () {
        this.panel = false;
        var croppedCanvas;
        var roundedCanvas;

        if (!this.croppable) {
          return;
        }
        // Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        console.log(this.cropper)
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);

        this.headerImage = roundedCanvas.toDataURL('image/jpeg', 0.5);
        this.postImg(this.headerImage)

      },
      getRoundedCanvas (sourceCanvas) {

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();
        return canvas;
      },
      postImg (image) {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        var url=this.$store.state.url;
        var userid=localStorage.getItem("userid");
        var name =localStorage.getItem("name")
        var formData = new FormData();
        console.log(image.length)
        formData.append("dataUrl", 1);
        this.axios.post(url+'/gerendetail/update',formData,config).then(function () {
        })
      }
    }
  }
</script>

<style>




</style>
