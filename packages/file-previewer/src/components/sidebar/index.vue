<template>
  <div class="sidebar-container" :style="{'left': isOpen ? '0px' : '-200px'}">
    <div class="toolbarSidebar"></div>
    <div class="sidebarContent">
      <PDF
          componentKey="sidebar"
          :width="200"
          :fileBlob="fileBlob"
          :isShowTextLayer="false"
      />
    </div>
  </div>
</template>

<script>

import PDF from "../pdfContainer/PDF.vue";

export default {
  name: "pdf-sidebar",
  components: {PDF},
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    fileBlob: {
      type: Blob,
      default: null
    }
  },
  watch: {

  },
  methods: {

  }
}
</script>

<style scoped>
/*侧边缩略图容器*/
.sidebar-container{
  position: absolute;
  top: 0;
  left: -200px;
  height: 100%;
  width: 200px;
  z-index: 999;
  transition: left .2s;
}
.toolbarSidebar{
  height: 32px;
  width: 100%;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25), 0 1px 0 rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1);
  background-color: rgba(245, 246, 247, 1);
  /*165 165 168*/
}
.sidebarContent{
  position: relative;
  height: calc(100% - 32px);
  width: 100%;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
  overflow: auto;
  background-color: rgba(206, 206, 210, .5);
}
</style>