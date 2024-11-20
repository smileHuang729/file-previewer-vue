# file-previewer-vue

## 安装依赖
```
npm install file-previewer-vue
```

### 在main.js或指定位置引入
```
import Vue from "vue";

......

import FilePreviewer from "file-previewer-vue";
import "file-previewer-vue/file-previewer/file-previewer.umd.min.pdfjsWorker";
import "file-previewer-vue/file-previewer/file-previewer.css";

......

Vue.use(FilePreviewer)
```

### 在项目中使用
```
<div style="height: 1200px">
  <FilePreviewer :fileBlob="fileBlob" width="1000"/>
</div>
```

### 配置
```
fileBlob
```

### 项目地址
See [file-previewer](https://github.com/smileHuang729/file-previewer).
