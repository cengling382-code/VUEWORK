<!-- 项目卡片（可复用）：Element Plus 的 el-card 承载，仍保留实验二的三处插槽结构 -->
<template>
  <el-card shadow="hover" class="project-card">
    <template #header>
      <header class="project-header">
        <div>
          <h3>{{ project.name }}</h3>
          <p class="meta">
            <span>{{ project.year }}</span>
            <span v-for="t in project.tech" :key="t" class="tech">{{ t }}</span>
          </p>
        </div>
        <!-- 具名插槽 status：父组件可替换默认状态徽章 -->
        <slot name="status" :project="project">
          <el-tag :type="tagType(project.status)" size="small">{{ project.status }}</el-tag>
        </slot>
      </header>
    </template>

    <!-- 默认插槽：项目描述，父组件可完全替换 -->
    <slot :project="project">
      <p class="desc">{{ project.desc }}</p>
    </slot>

    <template #footer>
      <footer class="project-footer">
        <!-- 具名插槽 actions：父组件可注入自定义操作 -->
        <slot name="actions" :project="project">
          <el-link v-if="project.link && project.link !== '#'" :href="project.link" target="_blank" type="primary">
            查看 →
          </el-link>
        </slot>
      </footer>
    </template>
  </el-card>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true }
});

// Element Plus el-tag 的状态类型映射
function tagType(s) {
  if (s === '已完成') return 'success';
  if (s === '进行中') return 'warning';
  return 'info';
}
</script>

<style scoped>
.project-card { transition: transform .2s; }
.project-card:hover { transform: translateY(-3px); }
.project-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 12px;
}
.project-header h3 { font-size: 17px; margin-bottom: 6px; }
.meta { color: var(--text-soft); font-size: 12px; display: flex; gap: 8px; flex-wrap: wrap; }
.tech {
  padding: 2px 8px; border-radius: 999px;
  background: rgba(66, 184, 131, .12); color: var(--primary);
}
.desc { color: var(--text); font-size: 14px; line-height: 1.7; margin-bottom: 14px; }
.project-footer { display: flex; justify-content: flex-end; gap: 10px; }
</style>
