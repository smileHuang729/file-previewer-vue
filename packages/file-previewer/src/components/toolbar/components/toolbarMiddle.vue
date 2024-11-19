<template>
  <div class="toolbarViewerMiddle">
    <!--缩放按钮
    -->
    <div class="zoomToolbarButton f-a">
      <div
          class="toolbarButton icon-minus"
          title="缩小"
      ></div>
      <div class="toolbarLine"></div>
      <div
          class="toolbarButton icon-plus"
          title="放大"
      ></div>
    </div>
    <div class="scaleSelectContainer">
      <select id="scaleSelect" title="缩放">
        <option value="1">适合页面</option>
        <option value="2">123</option>
        <option value="3">123</option>
        <option value="4">123</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.toolbarViewerMiddle{
  display: flex;
  justify-content: center;
  align-items: center;
  .toolbarButton{
    margin: 0 5px;
  }
}

.zoomToolbarButton{

}
.icon-plus{
  background-image: url("../img/plus.png");
}
.icon-plus_disabled{
  background-image: url("../img/plus-disabled.png");
}
.icon-minus{
  background-image: url("../img/minus.png");
}
.icon-minus_disabled{
  background-image: url("../img/minus-disabled.png");
}


/*缩放下拉*/
.scaleSelectContainer{
  select{
    width: 162px;
    height: 28px;
    font-size: 12px;
    color: rgba(12, 12, 13, 1);
    margin: 0;
    border: none;
    background-color: rgba(215, 215, 219, 1);
  }
}
</style>