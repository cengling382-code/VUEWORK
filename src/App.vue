<!-- src/App.vue 根组件：Element Plus 布局 + 路由出口 -->
<!--
组件树（实验四第二次）：
App
├── el-container / el-header    顶部布局 + el-menu 横向菜单（RouterLink 导航）
├── el-main > <RouterView />    路由组件（src/views）按 URL 渲染
└── PageFooter                   props: info
-->
<template>
  <el-container class="app">
    <el-header class="header">
      <span class="title">👋 你好，我是 <b>{{ profileStore.name }}</b></span>
      <!-- el-menu 菜单组件：router 模式下 index 即 Vue Router 的跳转地址（path） -->
      <el-menu mode="horizontal" :default-active="activeMenu" :ellipsis="false" router
               background-color="transparent" text-color="var(--text)" active-text-color="var(--primary)">
        <el-menu-item v-for="m in menus" :key="m.path" :index="m.path">{{ m.label }}</el-menu-item>
      </el-menu>
      <el-button size="small" @click="toggleTheme">{{ isDark ? '☀️ 亮色' : '🌙 暗色' }}</el-button>
    </el-header>

    <el-main>
      <!-- 路由出口：匹配到的页面组件在这里渲染 -->
      <RouterView />
    </el-main>

    <PageFooter :info="footer" />
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProfileStore } from './stores/profile.js';
import PageFooter from './components/PageFooter.vue';

const route = useRoute();
const profileStore = useProfileStore();

// el-menu 的 default-active 跟随当前路由：
// 子路由（如 /projects/list、/admin/profile）按前缀归到父菜单
const menus = [
  { path: '/home',     label: '🏠 主页' },
  { path: '/projects', label: '📂 项目' },
  { path: '/articles', label: '📝 文章' },
  { path: '/about',    label: 'ℹ️ 关于' },
  { path: '/admin',    label: '🔒 后台' }   // 内容修改入口，未登录由守卫拦截
];
const activeMenu = computed(() => {
  const hit = menus.find(m => route.path.startsWith(m.path));
  return hit ? hit.path : route.path;
});

const isDark = ref(false);
function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
}

const footer = {
  text: 'Vue 3 组件化开发实验 · 实验四 状态管理与 UI 组件库',
  author: '曾凌',
  year: new Date().getFullYear()
};
</script>

<!-- 全局样式：主题变量 + 公共卡片样式 -->
<style>
:root {
  --bg: #eef2f7;
  --card-bg: #ffffff;
  --text: #2c3e50;
  --text-soft: #7a8699;
  --primary: #42b883;
  --primary-dark: #33a06f;
  --border: #e3e8ef;
  --shadow: 0 8px 24px rgba(30, 45, 70, .08);
}
html.dark {
  --bg: #1a1f2b;
  --card-bg: #232a3a;
  --text: #e8ecf3;
  --text-soft: #9aa5b8;
  --primary: #42b883;
  --primary-dark: #5ccf9a;
  --border: #333d52;
  --shadow: 0 8px 24px rgba(0, 0, 0, .35);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  background: var(--bg); color: var(--text);
  min-height: 100vh;
  transition: background .3s, color .3s;
}
.card {
  background: var(--card-bg); border-radius: 16px; box-shadow: var(--shadow);
  padding: 28px; margin-bottom: 20px; transition: background .3s;
}
.card h3 {
  font-size: 17px; margin-bottom: 14px;
  padding-left: 10px; border-left: 4px solid var(--primary);
}
/* Element Plus 暗色模式适配：覆盖组件背景与文字变量 */
html.dark .el-menu { background: transparent !important; border-bottom: 1px solid var(--border); }
html.dark .el-menu-item { color: var(--text); background: transparent !important; }
html.dark .el-menu-item.is-active { background: var(--primary) !important; color: #fff; }
html.dark .el-card { background: var(--card-bg); color: var(--text); border-color: var(--border); }
</style>

<style scoped>
.app { min-height: 100vh; max-width: 860px; margin: 0 auto; }
.header {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  padding: 0 8px; height: auto; line-height: normal;
}
.title { font-size: 20px; white-space: nowrap; }
.title b { color: var(--primary); }
.header .el-menu { flex: 1; border-bottom: none !important; }
</style>
