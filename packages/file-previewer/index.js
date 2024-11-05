// 导入组件，组件必须声明 name
import FilePreviewer from './src/file-previewer.vue'


// 为组件提供 install 安装方法，供按需引入
FilePreviewer.install = function (Vue) {
    Vue.component(FilePreviewer.name, FilePreviewer)
}

// 默认导出组件
export default FilePreviewer