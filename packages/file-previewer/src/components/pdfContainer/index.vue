<template>
  <div
    class="pdf-container"
    :class="isOpenSidebar ? 'sidebarOpen' : ''"
    ref="pdfContainerRef"
  >
    <Sidebar :isOpen="isOpenSidebar" :fileBlob="fileBlob"/>

    <PDF
      :width="containerWidth"
      :fileBlob="fileBlob"
      @getPdfPageNum="pageNum => $emit('getPdfPageNum', pageNum)"
    />


    <!--</div>-->

  </div>
</template>

<script>



import Sidebar from "../sidebar/index.vue";
import PDF from "./PDF.vue";

export default {
  name: "pdf-container",
  components: {
    Sidebar,
    PDF
  },
  props: {
    fileBlob: {
      type: Blob,
      default: null
    }
  },
  watch: {
  },
  computed: {

  },
  data() {
    return {
      containerWidth: 0,
      pdfDoc: null,
      isOpenSidebar: false, // 控制侧边缩略图
    }
  },
  mounted() {
    this.containerWidth = this.$refs.pdfContainerRef.offsetWidth
  },
  methods: {
    // 打开侧边缩略图
    openSidebar(isOpen) {
      this.isOpenSidebar = isOpen
    },
  }
}
</script>

<style scoped>
.pdf-container{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}



</style>