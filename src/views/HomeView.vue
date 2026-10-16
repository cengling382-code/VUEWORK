<!-- 首页：个人简介（只读）+ 技能搜索 + 学习经历时间线（el-timeline） -->
<template>
  <ProfileCard :profile="profile" :is-editing="false" />
  <SkillSearch v-model="keyword" :skills="skills" />

  <!-- 时间线：按时间倒序展示学习与实验经历 -->
  <section class="card">
    <h3>📅 学习经历</h3>
    <el-timeline>
      <el-timeline-item v-for="t in timeline" :key="t.date" :timestamp="t.date" :type="t.type" placement="top">
        <b>{{ t.title }}</b>
        <p class="desc">{{ t.desc }}</p>
      </el-timeline-item>
    </el-timeline>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '../stores/profile.js';
import ProfileCard from '../components/ProfileCard.vue';
import SkillSearch from '../components/SkillSearch.vue';

const profileStore = useProfileStore();

// storeToRefs 解构 state，保持响应式（后台修改简介后首页同步更新）
const { profile, skills } = storeToRefs(profileStore);

const keyword = ref('');   // SkillSearch 的 defineModel 双向绑定（页面局部状态，无需进 Store）

const timeline = [
  { date: '2026-10', type: 'primary', title: '实验四：状态管理与 UI 组件库', desc: 'Pinia 状态持久化、Element Plus 组件重构与 GitHub Pages 部署。' },
  { date: '2026-10', type: 'success', title: '实验三：路由配置与页面导航', desc: '命名路由、动态路由、嵌套路由与全局守卫访问控制。' },
  { date: '2026-09', type: 'success', title: '实验二：插槽与可复用组件', desc: '默认 / 具名 / 作用域插槽，defineModel 双向绑定。' },
  { date: '2026-09', type: 'success', title: '实验一：组件化基础', desc: 'props / emits 单向数据流与组件拆分。' },
  { date: '2024-09', type: 'info',    title: '入学 · 24 计科 1 班', desc: '开始系统学习计算机科学与前端开发。' }
];
</script>

<style scoped>
.desc { color: var(--text-soft); font-size: 13px; margin-top: 4px; }
</style>
