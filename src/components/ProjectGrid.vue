<!-- 项目列表：负责筛选 + 循环；通过作用域插槽把每个项目暴露给父组件渲染 -->
<template>
  <div class="project-grid">
    <p v-if="filtered.length === 0" class="empty">没有匹配的项目～</p>
    <div v-for="(project, index) in filtered" :key="project.id" class="grid-item">
      <!-- 作用域插槽：父组件可用 { project, index, total } 自定义渲染 -->
      <slot :project="project" :index="index" :total="filtered.length"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  projects: { type: Array, required: true },
  status:   { type: String, default: 'all' }   // 'all' 表示不过滤
});

const filtered = computed(() =>
  props.status === 'all'
    ? props.projects
    : props.projects.filter(p => p.status === props.status)
);
</script>

<style scoped>
.project-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.empty { color: var(--text-soft); font-size: 14px; padding: 24px 0; text-align: center; }
</style>