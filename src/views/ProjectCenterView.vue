<!-- 项目中心布局（父路由）：el-tabs 子导航 + 内部 RouterView 作为子路由出口 -->
<template>
  <section class="card">
    <h3>📂 项目中心</h3>
    <!-- el-tabs：tab 即子路由，tab-click 时编程式跳转（命名路由） -->
    <el-tabs :model-value="active" class="sub-tabs" @tab-click="onTab">
      <el-tab-pane label="项目列表" name="ProjectList" />
      <el-tab-pane label="项目统计" name="ProjectStats" />
    </el-tabs>

    <!-- 子路由出口：列表 / 详情 / 统计都在这里渲染 -->
    <RouterView />
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 当前子路由：详情页也归到"项目列表"标签
const active = computed(() =>
  ['ProjectList', 'ProjectDetail'].includes(route.name) ? 'ProjectList' : route.name
);

function onTab(pane) {
  router.push({ name: pane.paneName });   // 编程式导航 + 命名路由
}
</script>

<style scoped>
.sub-tabs { margin-bottom: 8px; }
</style>
