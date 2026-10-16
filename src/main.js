// 入口：注册 Pinia（状态管理）、Element Plus（组件库）、路由插件
// Element Plus 用全局注册：一次性引入所有组件与样式，实验阶段使用简单
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from './App.vue';
import router from './router/index.js';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .mount('#app');
