// 导入组件，组件必须声明 name
import PdfScreenshot from './src/pdf-screenshot.vue'

// 为组件提供 install 安装方法，供按需引入
PdfScreenshot.install = function (Vue) {
    Vue.component(PdfScreenshot.name, PdfScreenshot)
}

// 默认导出组件
export default PdfScreenshot