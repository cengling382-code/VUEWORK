<!-- 项目详情（子路由）：动态路由参数 :id + useRouter 编程式导航 + Element Plus 展示 -->
<template>
  <el-card v-if="project" class="detail">
    <template #header>
      <div class="head">
        <h2>{{ project.name }}</h2>
        <el-tag :type="tagType">{{ project.status }}</el-tag>
      </div>
    </template>
    <p class="meta">
      <span>{{ project.year }}</span>
      <el-tag v-for="t in project.tech" :key="t" size="small" effect="plain" type="info">{{ t }}</el-tag>
    </p>
    <p class="desc">{{ project.desc }}</p>

    <!-- 编程式导航：push 新增历史 / go(-1) 按历史返回 -->
    <div class="btns">
      <el-button @click="router.go(-1)">← 返回上一页</el-button>
      <el-button type="primary" @click="router.push({ name: 'ProjectList' })">返回项目列表</el-button>
    </div>
    <p class="tip">当前路由参数 id = {{ id }}（useRoute() 获取，Number() 转换）</p>
  </el-card>

  <!-- 无效详情地址处理：replace 离开（不留下无效历史记录） -->
  <el-result v-else icon="warning" :title="`项目编号 ${id} 不存在`" sub-title="该地址没有对应的数据，请重新选择项目">
    <template #extra>
      <el-button type="primary" @click="router.replace({ name: 'ProjectList' })">replace 返回列表</el-button>
      <el-button @click="router.go(-1)">返回上一页</el-button>
    </template>
  </el-result>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '../stores/projects.js';

const route = useRoute();     // 获取当前路由信息（参数）
const router = useRouter();   // 获取路由器（编程式导航）
const projectsStore = useProjectsStore();

// 路由参数是字符串，按数字编号查数据前先 Number() 转换
const id = computed(() => Number(route.params.id));
const project = computed(() => projectsStore.byId(id.value));   // getters 派生
const tagType = computed(() =>
  project.value?.status === '已完成' ? 'success' : project.value?.status === '进行中' ? 'warning' : 'info'
);
</script>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.head h2 { font-size: 22px; }
.meta { display: flex; gap: 10px; align-items: center; color: var(--text-soft); font-size: 13px; margin-bottom: 14px; }
.desc { line-height: 1.9; margin-bottom: 18px; }
.btns { display: flex; gap: 10px; flex-wrap: wrap; }
.tip { margin-top: 14px; font-size: 12px; color: var(--text-soft); }
</style>
