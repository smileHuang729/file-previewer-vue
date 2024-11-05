<template>
  <div class="toolbar-container">
    <div class="toolbarViewer toolbarViewerLeft">
      <div class="sidebarToggle toolbarButton" :class="isOpenSidebar?'opened':''" @click="handleChangeSidebar"></div>
    </div>
    <div class="toolbarViewer toolbarViewerMiddle">2</div>
    <div class="toolbarViewer toolbarViewerRight">3</div>
  </div>
</template>

<script>
export default {
  name: "filePriviewerToolbar",
  data() {
    return {
      isOpenSidebar: false
    }
  },
  methods: {
    handleChangeSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar
      this.$emit('handleChangeSidebar', this.isOpenSidebar)
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 0 rgba(204, 204, 204, 1);

}
.toolbarButton{
  height: 28px;
  width: 28px;
  background-repeat: no-repeat;
  background-position: center;
  color: rgba(12, 12, 13, 1);
  border-radius: 2px;
  &:hover{
    background-color: rgba(221, 222, 223, 1);
  }
}
.sidebarToggle{
  background-image: url("../../img/toolbarButton-sidebarToggle.png");
}
.opened{
  background-color: rgba(221, 222, 223, 1);
}
</style>