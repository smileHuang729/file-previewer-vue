<template>
  <div id="app" class="testApp">
    <div class="test">
      <input type="file" style="visibility: hidden" ref="upload" @change="handleFileChange">
      <button @click="handleUpload">导入文件</button>
    </div>
    <FilePreviewer
      width="800"
      :fileBlob="fileBlob"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      fileBlob: null,
    }
  },
  methods: {
    handleUpload() {
      console.log('handleUpload', this.$refs.upload)
      this.$refs.upload.click()
    },
    handleFileChange(file) {
      console.log('handleFileChange', file.target.files[0])
      this.fileBlob = file.target.files[0]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.testApp{
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  padding: 10px !important;
  box-sizing: border-box;
}
.test{
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 470px);
  height: 100%;
  margin-right: 20px;
}
</style>
