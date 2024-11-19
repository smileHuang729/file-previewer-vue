<template>
  <!--顶部工具栏-左边-->
  <div class="toolbarViewerLeft">
    <!--缩略图-->
    <div
      class="sidebarToggle toolbarButton"
      :class="isOpenSidebar?'btn-opened':''"
      @click="handleChangeSidebar"
      :title="isOpenSidebar ? '关闭缩略图' : '打开缩略图'"
    ></div>

    <!--搜索-->
    <!--<div-->
    <!--  class="toolbarButton"-->
    <!--&gt;</div>-->

    <!--翻页-->
    <div class="splitToolbarButton f-a">
      <div
        class="toolbarButton"
        :class="currentPage <= 1 ? 'icon-pageUp_disabled btn-noClick' : 'icon-pageUp'"
      ></div>
      <div class="toolbarLine"></div>
      <div
        class="toolbarButton"
        :class="currentPage >= pageNum ? 'icon-pageDown_disabled btn-noClick' : 'icon-pageDown'"
      ></div>
    </div>

    <!--跳转指定页码-->
    <div class="pageJumper f-a">
      <input v-model="currentPage" class="page-input" type="text" @input="handlePageInput">
      <span>/ {{pageNum}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "toolbar-left",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    pageNum: {
      type: Number,
      default: 0
    }
  },
  watch: {
    pageNum: {
      immediate: true,
      handler(val) {
        console.log('watch --- pageNum', val)
      }
    }
  },
  data() {
    return {
      isOpenSidebar: false,
      currentPage: 1
    }
  },
  methods: {
    handleChangeSidebar() {
      if(this.disabled) {
        return;
      }
      this.isOpenSidebar = !this.isOpenSidebar
      this.$emit('handleChangeSidebar', this.isOpenSidebar)
    },
    // 页码输入，限制只能输入1-pageNum范围内的数字
    handlePageInput() {
      this.currentPage = this.currentPage.replace(/[^\d]/g,'')
      if(this.currentPage == ''){
        this.currentPage = '1'
      }
      let num = parseInt(this.currentPage)
      if(num < 1) {
        this.currentPage = '1'
      }
      if(num > this.pageNum){
        this.currentPage = this.pageNum
      }
    }
  }
}
</script>

<style scoped>
.sidebarToggle{
  background-image: url("../../../img/toolbarButton-sidebarToggle.png");
  margin-right: 50px !important;
}

/*翻页*/
.splitToolbarButton>.toolbarButton{
  margin: 0 5px;
}
.icon-pageUp{
  background-image: url("../img/up.png");
}
.icon-pageUp_disabled{
  background-image: url("../img/up-disabled.png");
}
.icon-pageDown{
  background-image: url("../img/down.png");
}
.icon-pageDown_disabled{
  background-image: url("../img/down-disabled.png");
}



.pageJumper>.page-input{
  width: 50px;
  margin-right: 5px;
  text-align: right;
}
</style>