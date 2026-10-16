<!-- 后台管理布局（父路由）：el-tabs 子导航 + el-button 退出 + 子路由出口 -->
<template>
  <section class="card">
    <header class="admin-header">
      <h3>🛠️ 后台管理</h3>
      <div class="who">
        <el-tag type="success" size="small">👤 {{ userStore.username || 'admin' }}</el-tag>
        <el-button size="small" type="danger" plain @click="logout">退出登录</el-button>
      </div>
    </header>
    <!-- el-tabs：tab 即子路由，tab-click 时编程式跳转 -->
    <el-tabs :model-value="active" class="sub-tabs" @tab-click="onTab">
      <el-tab-pane label="个人简介管理" name="AdminProfile" />
      <el-tab-pane label="项目信息管理" name="AdminProjects" />
      <el-tab-pane label="文章管理" name="AdminArticles" />
    </el-tabs>

    <!-- 子路由出口 -->
    <RouterView />
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.js';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const active = computed(() => route.name);

function onTab(pane) {
  router.push({ name: pane.paneName });   // 编程式导航
}
function logout() {
  userStore.logout();                 // 修改登录状态走 Store 的 action（含持久化）
  router.replace({ name: 'Home' });   // replace：退出后不留后台历史记录
}
</script>

<style scoped>
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.who { display: flex; align-items: center; gap: 10px; }
.sub-tabs { margin-bottom: 8px; }
</style>
