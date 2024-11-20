<template>
  <div class="no-data-page">
    <img src="./img/no-data.png">
    <p>暂无数据</p>
  </div>
</template>

<script>
export default {
  name: "no-data"
}
</script>

<style scoped>
.no-data-page{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  img{
    width: 150px;
  }
}
</style>