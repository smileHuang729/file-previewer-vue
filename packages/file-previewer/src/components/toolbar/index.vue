<template>
  <div class="toolbar-container">
    <!--页码控制、缩略图-->
    <ToolbarLeft
      class="toolbarViewer"
      :disabled="disabled"
      :pageNum="pageNum"
      @handleChangeSidebar="isOpen => $emit('handleChangeSidebar', isOpen)"
    />

    <!--中间缩放比例控制-->
    <ToolbarMiddle
      class="toolbarViewer"
      :disabled="disabled"
    />

    <!--其他工具-->
    <ToolbarRight
      class="toolbarViewer"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import "./index.css"
import ToolbarLeft from "./components/toolbarLeft.vue";
import ToolbarMiddle from "./components/toolbarMiddle.vue";
import ToolbarRight from "./components/toolbarRight.vue";
export default {
  name: "filePriviewerToolbar",
  components: {
    ToolbarLeft,
    ToolbarMiddle,
    ToolbarRight
  },
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
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.toolbar-container{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 0 rgba(204, 204, 204, 1);
  background-color: rgba(245, 246, 247, 1);
  z-index: 9999;
}
.toolbarViewer{
  flex: 1;
}



</style>