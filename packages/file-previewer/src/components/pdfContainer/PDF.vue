<template>
  <div class="main-container" :id="componentKey+'mainContainer'">
    <div class="pdf-page" :id="`wrapper-${componentKey + i}`" v-for="i in totalPage" :key="componentKey + i">
      <div
          class="canvas-wrapper"
          :class="componentKey === 'sidebar' ? 'sidebarClickStyle' : ''"
          :id="`page-${componentKey + i}`"
          @click="changeCurrentPage(i)"
      >
        <canvas :id="`canvas-${componentKey + i}`"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
const PDFJS = require("pdfjs-dist");
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.min")
import {TextLayerBuilder} from 'pdfjs-dist/web/pdf_viewer';
import "pdfjs-dist/web/pdf_viewer.css"
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs';
export default {
  name: "PDF",
  props: {
    componentKey: {
      type: String,
      default: "pdf"
    },
    width: {
      type: Number,
      default: 0
    },
    fileBlob: {
      type: Blob,
      default: null
    },
    isShowTextLayer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pdfDoc: null,
      totalPage: 0, // 总共的页数
      scale: 1,
      cropper: null,
    }
  },
  computed: {
    textLayerStyle() {
      let scale = 1
      switch (this.scale) {
        case 5:
          scale = 6.85
          break;
        case 4:
          scale = 5.49
          break;
        case 3:
          scale = 4.11
          break;
        case 2:
          scale = 2.74
          break;
        case 1.5:
          scale = 2.055
          break;
        case 1.25:
          scale = 1.715
          break;
        case 1:
          scale = 1.37
          break;
        case 0.75:
          scale = 1.03
          break;
        case 0.5:
          scale = 0.688
          break;

      }

      return scale
    }
  },
  watch: {
    fileBlob: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          const option = {
            cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/",
            cMapPacked: true
          }
          const url = window.URL.createObjectURL(val)
          option.url = url
          this.initPdf(option);
        }
      }
    },
  },
  mounted() {
    console.log('mounted', this.componentKey)
  },
  methods: {
    // 初始化cropper
    initCropper(img) {
      console.log('初始化Cropper.js')
      this.cropper = new Cropper(img, {
        aspectRatio: null, // 裁剪比例
        viewMode: 1, // 裁剪模式
        cropBoxMovable: true, // 允许移动裁剪框
        cropBoxResizable: true, // 允许调整裁剪框大小
        autoCrop: false,
        background: false, // 取消背景
        rotatable: true, // 允许旋转
        ready: this.cropperReady,
        cropend: this.cropperCropend
      })
    },
    cropperReady(e) {
      console.log('cropperReady', e, document.getElementsByClassName('cropper-container'))
      document.getElementsByClassName('cropper-container')[0].style.zIndex = 9999

      // 添加确认、取消按钮
      const cropBox = document.querySelector('.cropper-crop-box')
      const div = document.createElement('div')
      div.setAttribute("class", "cropper-crop-box-confirm")
      div.innerHTML = `
        <div class="cropper-btn">
            <span class="cropper-btn-ok"></span>
        </div>
        <div class="cropper-btn">
            <span class="cropper-btn-close"></span>
        </div>`;
      cropBox.append(div)
      console.log('cropBox', cropBox)
    },
    cropperCropend(e) {
      console.log('cropperCropend', e)
    },
    async initPdf(option) {
      // console.log('initPdf', option)
      const fileContent = await PDFJS.getDocument(option)
      // console.log('fileContent', fileContent)
      this.pdfDoc = fileContent
      this.totalPage = fileContent._pdfInfo.numPages
      if (this.componentKey === "pdf") {
        this.$emit("getPdfPageNum", this.totalPage)
      }
      this.$nextTick(async () => {
        await this.renderPage()
      })
      // setTimeout(async () => {
      //   await this.renderPage()
      //   const img = document.getElementById('pdfImage-1')
      //   if(img) {
      //     // this.initCropper(img)
      //   }
      //
      // }, 100)
    },
    async renderPage() {
      // console.log('2--渲染pdf', this.pdfDoc)
      for (let i = 1; i <= this.totalPage; i++) {
        // 获取存放canvas的父级div
        const pageDiv = document.getElementById("page-" + this.componentKey + i);
        // 创建canvas节点
        const canvas = document.getElementById("canvas-" + this.componentKey + i);
        // 获取上下文
        const ctx = canvas.getContext("2d");

        // 获取每一页的内容
        const page = await this.pdfDoc.getPage(i)
        // 文件页面的视图1倍
        let viewportScale = 2
        if (this.componentKey === "sidebar") {
          viewportScale = 0.5
        }
        const viewport = page.getViewport(viewportScale);
        console.log('1---viewport', viewport)
        // 将画布宽度设置为视图宽度
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.display = "block"
        let img;
        console.log('componentKey', this.componentKey)
        console.log('pageDiv', pageDiv)
        if (this.componentKey === 'pdf') {
          // canvas.style.height = document.getElementById("pdfmainContainer").offsetHeight * this.scale + 'px'
          img = new Image()
          img.setAttribute("id", "pdfImage-" + i)
          img.setAttribute("class", "pdf-img")
          img.style.height = document.getElementById("pdfmainContainer").offsetHeight * this.scale + 'px'
        } else {
          canvas.style.height = this.width + 'px'
          pageDiv.style.width = canvas.offsetWidth + "px"
          pageDiv.style.height = canvas.offsetHeight + "px"
        }


        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        // 渲染页面内容：参数是canvas画布上下文，以及文件视图
        const textContent = await page.render(renderContext).then(() => {

          if (this.componentKey === 'pdf') {
            // 移除canvas
            canvas.remove()
            const imgData = canvas.toDataURL("image/png");
            img.src = imgData
            pageDiv.appendChild(img)
            img.onload = () => {
              pageDiv.style.width = img.offsetWidth + "px"
              pageDiv.style.height = img.offsetHeight + "px"
            }
          }

          return page.getTextContent()
        })

        if (this.isShowTextLayer) {
          const viewportLayer = page.getViewport(this.textLayerStyle)
          // 创建文字层
          const textLayerDiv = document.createElement("div");
          textLayerDiv.setAttribute("class", "textLayer");
          if (this.componentKey === 'pdf') {
            textLayerDiv.style.height = img.offsetHeight + 'px'
            textLayerDiv.style.width = img.offsetWidth + 'px'
          } else {
            textLayerDiv.style.height = canvas.offsetHeight + 'px'
            textLayerDiv.style.width = canvas.offsetWidth + 'px'
          }


          // console.log('1231231===>', viewport.height, canvas.offsetHeight, viewport.height / canvas.offsetHeight)
          // 将文本图层div添加至每页pdf的div中
          pageDiv.appendChild(textLayerDiv)
          // 创建新的TextLayerBuilder实例
          let textLayer = new TextLayerBuilder({
            textLayerDiv: textLayerDiv,
            pageIndex: page.pageIndex,
            viewport: viewportLayer,
          })
          textLayer.setTextContent(textContent);
          textLayer.render();
        }

      }
    },
    // 切换页面
    changeCurrentPage(index) {
      if (this.componentKey === 'pdf') {
        return;
      }
      // 这里获取的是pdf展示容器里面的每一页pdf的高度
      const pageDiv = document.getElementById(`page-pdf${index}`)
      const scrollHeight = (pageDiv.offsetHeight + 18) * (index - 1)
      this.handleScroll(scrollHeight)
      console.log(`切换切面-${this.componentKey}==>`, index, pageDiv.offsetHeight)
    },
    handleScroll(val) {
      const mainContainer = document.getElementById('pdfmainContainer')
      mainContainer.scrollTop = val
    },
  }
}
</script>

<style scoped lang="less">
/*pdf页面展示区域*/
.sidebarOpen > .main-container {

  left: 200px;
  transition-property: left;
  transition-timing-function: ease;
  transition-duration: .2s;
}

.main-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgb(232, 232, 236);
  height: 100%;
  overflow: auto;
  outline: none;
}

.pdf-container canvas {
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.pdf-container .pdf-page {
  margin: 0 auto;
  border: 9px solid transparent;
}

.canvas-wrapper {
  position: relative;
  margin: auto;
}

.textLayer {
  position: absolute;
  margin: 0 auto !important;
}

.sidebarClickStyle {
  cursor: pointer;

  &:hover {
    border: 3px solid rgb(165 165 168);
  }
}

.pdf-img {
  -webkit-user-drag: none;
}
/deep/.cropper-crop-box-confirm{
  display: flex;
  position: absolute;
  right: -1px;
  bottom: -34px;
  .cropper-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 30px;
    background-color: rgba(0,0,0,0.6);
    span{

    }
    .cropper-btn-ok{
      display: inline-block;
      width: 25px;
      height: 25px;
      background-image: url("./img/confirm.png");
    }
    .cropper-btn-close{
      display: inline-block;
      width: 25px;
      height: 25px;
      background-image: url("./img/close.png");
    }
  }
}

</style>