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

export default {
  name: "PDF",
  props: {
    componentKey: {
      type: String,
      default: "pdf"
    },
    width: {
      tyoe: Number,
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
    }
  },
  computed: {
    textLayerStyle() {
      let scale = 1
      switch (this.scale){
        case 5:
          scale = 7.13
          break;
        case 4:
          scale = 5.7
          break;
        case 3:
          scale = 4.27
          break;
        case 2:
          scale = 2.85
          break;
        case 1.5:
          scale = 2.14
          break;
        case 1.25:
          scale = 1.78
          break;
        case 1:
          scale = 1.425
          break;
        case 0.75:
          scale = 1.07
          break;
        case 0.5:
          scale = 0.713
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
        if(val){
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
  methods: {
    async initPdf(option) {
      // console.log('initPdf', option)
      const fileContent = await PDFJS.getDocument(option)
      // console.log('fileContent', fileContent)
      this.pdfDoc = fileContent
      this.totalPage = fileContent._pdfInfo.numPages
      if(this.componentKey === "pdf"){
        this.$emit("getPdfPageNum", this.totalPage)
      }
      setTimeout(() => {
        this.renderPage()
      }, 100)
    },
    async renderPage() {
      // console.log('2--渲染pdf', this.totalPage)
      for (let i = 1; i <= this.totalPage; i++){
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
        if(this.componentKey === "sidebar"){
          viewportScale = 0.5
        }
        const viewport = page.getViewport(viewportScale);
        // 将画布宽度设置为视图宽度
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.display = "block"
        canvas.style.height = this.width * this.scale + 'px'
        pageDiv.style.width = canvas.offsetWidth + "px"
        pageDiv.style.height = canvas.offsetHeight + "px"

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        // 渲染页面内容：参数是canvas画布上下文，以及文件视图
        const textContent = await page.render(renderContext).then(() => {
          return page.getTextContent()
        })
        if(this.isShowTextLayer) {

          const viewportLayer = page.getViewport(this.textLayerStyle)
          // 创建文字层
          const textLayerDiv = document.createElement("div");
          textLayerDiv.setAttribute("class", "textLayer");
          textLayerDiv.style.height = canvas.offsetHeight + 'px'
          textLayerDiv.style.width = canvas.offsetWidth + 'px'


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
      if(this.componentKey === 'pdf'){
        return;
      }
      // 这里获取的是pdf展示容器里面的每一页pdf的高度
      const pageDiv = document.getElementById(`page-pdf${index}`)
      const scrollHeight = (pageDiv.offsetHeight + 18) * (index - 1)
      this.handleScroll(scrollHeight)
      console.log(`切换切面-${this.componentKey}==>`, index, pageDiv.offsetHeight)
    },
    handleScroll(val) {
      const mainContainer = document.getElementById( 'pdfmainContainer')
      mainContainer.scrollTop = val
    },
  }
}
</script>

<style scoped>
/*pdf页面展示区域*/
.sidebarOpen>.main-container{

  left: 200px;
  transition-property: left;
  transition-timing-function: ease;
  transition-duration: .2s;
}
.main-container{
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
.pdf-container canvas{
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.pdf-container .pdf-page{
  margin: 0 auto;
  border: 9px solid transparent;
}
.canvas-wrapper{
  position: relative;
  margin: auto;
}
.textLayer{
  position: absolute;
  margin: 0 auto !important;
}

.sidebarClickStyle{
  cursor: pointer;
  &:hover{
    border: 3px solid rgb(165 165 168);
  }
}
</style>