<!-- 项目统计（子路由）：el-row/el-col 栅格 + el-card + el-statistic 展示汇总 -->
<template>
  <el-row :gutter="16">
    <el-col v-for="(n, s) in counts" :key="s" :xs="12" :sm="6">
      <el-card shadow="hover" class="stat-card">
        <el-statistic :value="n" :title="s" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '../stores/projects.js';

const projectsStore = useProjectsStore();

// getters（counts）有缓存：项目数据不变时不重复计算，解构用 storeToRefs 保持响应式
const { counts } = storeToRefs(projectsStore);
</script>

<style scoped>
.stat-card { text-align: center; margin-bottom: 16px; }
.stat-card :deep(.el-statistic__content) { color: var(--primary); font-size: 30px; }
.stat-card :deep(.el-statistic__head) { color: var(--text-soft); }
</style>
