import Vue from 'vue'
import App from './App.vue'

// 导入组件库
import FilePreviewer from '../packages/index';

console.log('FilePreviewer', FilePreviewer)
// 注册组件库
Vue.use(FilePreviewer)

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')