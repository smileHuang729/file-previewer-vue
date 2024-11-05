<template>
  <div class="pdf-container" ref="pdfContainerRef">
    <!--<div class="pdf-box" v-for="item in totalPage" :key="item" :id="`page-${item}`">-->
      <canvas v-for="item in totalPage" :key="item" :id="`canvas-${item}`"></canvas>
    <!--</div>-->

  </div>
</template>

<script>
const PDFJS = require("pdfjs-dist");
console.log('PDFJS', PDFJS, typeof PDFJS.GlobalWorkerOptions.workerSrc)
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.min")

export default {
  name: "pdf-container",
  props: {
    fileBlob: {
      type: Blob,
      default: null
    }
  },
  watch: {
    fileBlob: {
      deep: true,
      immediate: true,
      handler(val) {
        if(val){
          const option = {
            cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.0.279/cmaps/",
            cMapPacked: true
          }
          const url = window.URL.createObjectURL(val)
          option.url = url
          this.initPdf(option);
        }

      }
    }
  },
  data() {
    return {
      pdfDoc: null,
      totalPage: 0, // 总共的页数
      scale: 2
    }
  },
  mounted() {
    console.log('pdf-container', this.$refs.pdfContainerRef.offsetHeight)

  },
  methods: {
    initPdf(option) {
      console.log('initPdf', option)

      PDFJS.getDocument(option).then(fileContent => {
        console.log('fileContent', fileContent)
        this.pdfDoc = fileContent
        this.totalPage = fileContent._pdfInfo.numPages
        setTimeout(() => {
          this.renderPage()
        }, 100)
      })
    },
    renderPage() {
      console.log('2--渲染pdf', this.totalPage)
      const containerHeight = this.$refs.pdfContainerRef.offsetHeight
      for (let i = 1; i <= this.totalPage; i++){
        // 创建canvas节点
        const canvas = document.getElementById("canvas-" + i);
        // 获取上下文
        const ctx = canvas.getContext("2d");

        // 获取每一页的内容
        this.pdfDoc.getPage(i).then(page => {
          // 文件页面的视图1倍
          const viewport = page.getViewport(this.scale);
          // 将画布宽度设置为视图宽度
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.display = "block"
          canvas.style.height = containerHeight + 'px'

          const renderContext = {
            canvasContext: ctx,
            viewport,
          };

          // 渲染页面内容：参数是canvas画布上下文，以及文件视图
          page.render(renderContext)
        })
      }
    },
  }
}
</script>

<style scoped>
.pdf-container{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.pdf-container canvas{
  margin: 10px auto;
}
.pdf-container canvas:first-child{
  margin-top: 0;
}
.pdf-container canvas:last-child{
  margin-bottom: 0;
}
</style>