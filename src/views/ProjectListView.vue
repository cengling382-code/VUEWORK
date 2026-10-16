<!-- 项目列表（子路由）：复用实验二组件，点"详情"用编程式导航跳转详情页 -->
<template>
  <ProjectsSection :projects="projects" @select="toDetail" />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '../stores/projects.js';
import ProjectsSection from '../components/ProjectsSection.vue';

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);   // 解构 state 保持响应式

const router = useRouter();

// push：新增一条历史记录（可用返回上一页回来）
function toDetail(p) {
  router.push({ name: 'ProjectDetail', params: { id: p.id } });
}
</script>
