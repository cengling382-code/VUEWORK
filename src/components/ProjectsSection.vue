<!-- 项目展示区块：组合 ProjectFilter + ProjectGrid + ProjectCard，
     在作用域插槽中实例化可复用的 ProjectCard，并自定义三处插槽内容 -->
<template>
  <section class="card projects-section">
    <header class="section-header">
      <h3>📂 项目展示</h3>
      <p class="section-desc">这里展示我近期完成或正在进行的小项目。</p>
    </header>

    <!-- defineModel 双向绑定当前筛选状态 -->
    <ProjectFilter v-model="status" :counts="counts" />

    <!-- 作用域插槽：父组件（即 App.vue）通过 slot props 自定义每个项目的渲染 -->
    <ProjectGrid :projects="projects" :status="status">
      <template #default="{ project, index }">
        <!-- 可复用组件：ProjectCard 接收 project 数据，三处插槽按需定制 -->
        <ProjectCard :project="project">
          <!-- 具名插槽 status：覆盖默认徽章 -->
          <template #status>
            <el-tag :type="key(project.status) === 'done' ? 'success' : key(project.status) === 'doing' ? 'warning' : 'info'" size="small">
              {{ project.status }}
            </el-tag>
          </template>
          <!-- 默认插槽：自定义描述 -->
          <template #default>
            <p class="desc">{{ project.desc }}</p>
            <p class="index-tip">#{{ index + 1 }} / {{ projects.length }}</p>
          </template>
          <!-- 具名插槽 actions：注入两个按钮 -->
          <template #actions>
            <el-link v-if="project.link && project.link !== '#'" :href="project.link" target="_blank" type="primary">
              查看 →
            </el-link>
            <el-button size="small" @click="select(project)">详情</el-button>
          </template>
        </ProjectCard>
      </template>
    </ProjectGrid>

    <!-- 当前选中项目的简单回显（验证作用域插槽 + emit 链） -->
    <p v-if="selected" class="selected-tip">
      已选项目：<b>{{ selected.name }}</b>（{{ selected.status }}）
    </p>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProjectFilter from './ProjectFilter.vue';
import ProjectGrid   from './ProjectGrid.vue';
import ProjectCard   from './ProjectCard.vue';

const props = defineProps({
  projects: { type: Array, required: true }
});
const emit = defineEmits(['select']);

// 组件内部状态：筛选值只影响本区块
const status = ref('all');
const selected = ref(null);

// 各状态项目数（传给 ProjectFilter 展示）
const counts = computed(() => {
  const c = { all: props.projects.length, '已完成': 0, '进行中': 0, '计划中': 0 };
  props.projects.forEach(p => { if (c[p.status] != null) c[p.status]++; });
  return c;
});

function key(s) {
  if (s === '已完成') return 'done';
  if (s === '进行中') return 'doing';
  return 'plan';
}
function select(p) {
  selected.value = p;
  emit('select', p);  // 同时上报父组件（演示 emit）
}
</script>

<style scoped>
.section-header h3 {
  font-size: 17px; margin-bottom: 6px;
  padding-left: 10px; border-left: 4px solid var(--primary);
}
.section-desc { color: var(--text-soft); font-size: 13px; margin-bottom: 14px; }
.index-tip { font-size: 12px; color: var(--text-soft); margin-top: 4px; }
.btn-detail {
  padding: 5px 12px; border-radius: 6px; font-size: 13px; cursor: pointer;
  background: transparent; color: var(--primary);
  border: 1px solid var(--primary);
}
.btn-detail:hover { background: var(--primary); color: #fff; }
.selected-tip {
  margin-top: 16px; padding: 10px 14px; border-radius: 8px;
  background: rgba(66, 184, 131, .08); color: var(--primary); font-size: 13px;
}
</style>