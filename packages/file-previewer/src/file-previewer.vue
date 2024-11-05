<template>
  <div class="file-previewer" :style="activeStyles">
    <Tollbar ref="toolbarRef" class="toolbar" @handleChangeSidebar="handleChangeSidebar"/>
    <div class="content" v-if="fileBlob">
      <PdfContainer
        v-if="['pdf', 'PDF'].includes(fileType)"
        :fileBlob="fileBlob"
      />
    </div>
    <div v-else>
      暂无数据
    </div>

  </div>
</template>

<script>


import PdfContainer from "./components/pdf/index.vue"
import Tollbar from "./components/toolbar/index.vue"

export default {
  name: 'FilePreviewer',
  components: {
    Tollbar,
    PdfContainer
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
}
.file-previewer>.toolbar{
  height: 35px;
  width: 100%;
}
.file-previewer>.content{
  height: calc(100% - 35px);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>