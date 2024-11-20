<template>
  <div class="file-previewer" :style="activeStyles">
    <!--顶部工具栏-->
    <Toolbar
      ref="toolbarRef"
      class="toolbar"
      :disabled="fileBlob ? false : true"
      :pageNum="pageNum"
      @handleChangeSidebar="handleChangeSidebar"
    />

    <!--展示区域-->
    <div class="content" v-if="fileBlob">
      <PdfContainer
        ref="pdfContainerRef"
        v-if="['pdf', 'PDF'].includes(fileType)"
        :fileBlob="fileBlob"
        @getPdfPageNum="getPdfPageNum"
      />
    </div>

    <!--无数据-->
    <NoData v-else/>

  </div>
</template>

<script>
import "./style/common.css"

import PdfContainer from "./components/pdfContainer/index.vue"
import Toolbar from "./components/toolbar/index.vue"
import NoData from "./components/noData/index.vue";

export default {
  name: 'FilePreviewer',
  components: {
    Toolbar,
    PdfContainer,
    NoData
  },
  props: {
    width: {
      type: String,
      default: '0'
    },
    height: {
      type: String,
      default: '0'
    },
    fileType: {
      type: String,
      default: 'pdf'
    },
    fileBlob: {
      type: Blob,
      default: null
    }
  },
  created() {

  },
  data() {
    return {
      pdfDoc: null,
      pageNum: 0, // pdf总页数
    }
  },
  computed: {
    activeStyles() {
      const style = {}
      if(parseInt(this.width) > 0){
        style.width = this.width + 'px'
      }
      if(parseInt(this.height) > 0){
        style.height = this.height + 'px'
      }

      return style
    }
  },
  methods: {
    handleChangeSidebar(isOpen) {
      console.log('开启侧边栏', isOpen)
      this.$refs.pdfContainerRef.openSidebar(isOpen)
    },
    // 获取pdf总页数
    getPdfPageNum(pageNum) {
      this.pageNum = pageNum
    }
  },
}
</script>

<style scoped>
.file-previewer{
  height: 100%;
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  box-sizing: border-box;
}
.file-previewer>.toolbar{
  height: 35px;
  width: 100%;
}
.file-previewer>.content{
  height: calc(100% - 35px);
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
}
</style>