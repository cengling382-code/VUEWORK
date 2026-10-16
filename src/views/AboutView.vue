<!-- 关于页：静态介绍 + Element Plus 组件清单（说明各组件作用） -->
<template>
  <section class="card">
    <h3>ℹ️ 关于本站</h3>
    <p>本站是 Vue 3 课程实验作品，由 {{ profileStore.name }} 开发维护。</p>
    <p>技术栈：Vue 3 组合式 API、Vue Router 4、Pinia、Element Plus、Vite。</p>

    <h3>📚 实验清单</h3>
    <el-timeline class="list">
      <el-timeline-item v-for="t in labs" :key="t.title" :timestamp="t.no" placement="top" :type="t.type">
        {{ t.title }}
      </el-timeline-item>
    </el-timeline>

    <h3>🧩 Element Plus 组件清单（10+ 种）</h3>
    <!-- el-descriptions：键值对说明每个组件的作用与使用位置 -->
    <el-descriptions :column="1" border size="small">
      <el-descriptions-item v-for="c in comps" :key="c.name" :label="c.name">{{ c.use }}</el-descriptions-item>
    </el-descriptions>
  </section>
</template>

<script setup>
import { useProfileStore } from '../stores/profile.js';

const profileStore = useProfileStore();

const labs = [
  { no: '实验一', title: '组件化基础、props / emits', type: 'info' },
  { no: '实验二', title: '插槽、defineModel、组合组件', type: 'info' },
  { no: '实验三', title: '路由配置与页面导航', type: 'success' },
  { no: '实验四', title: '状态管理（Pinia）与 UI 组件库（当前）', type: 'primary' }
];

const comps = [
  { name: 'el-container / el-header / el-main', use: 'App 整体布局：头部导航区 + 主内容区' },
  { name: 'el-menu', use: '顶部横向导航菜单，router 模式联动 Vue Router，:default-active 高亮当前页' },
  { name: 'el-button', use: '各类操作按钮：登录、保存、返回、切换主题等' },
  { name: 'el-input', use: '文本输入：登录表单、搜索框、简介编辑' },
  { name: 'el-form / el-form-item', use: '表单容器与校验规则（required / min 长度），登录页触发 validate' },
  { name: 'el-table', use: '文章列表：列展示 + stripe 斑马纹 + row-click 点行跳详情' },
  { name: 'el-tag', use: '状态与分类标签：项目状态、文章分类、技能标记' },
  { name: 'el-card', use: '卡片容器：项目卡片、详情页、各区块的统一外框（header/footer 插槽）' },
  { name: 'el-tabs / el-tab-pane', use: '子路由导航：项目中心、后台管理的分页签切换' },
  { name: 'el-timeline', use: '首页学习经历时间线，按时间倒序展示实验与入学节点' },
  { name: 'el-row / el-col', use: '项目统计页栅格布局，统计卡片自适应排列' },
  { name: 'el-statistic', use: '项目统计页数字展示（全部/已完成/进行中/计划中）' },
  { name: 'el-radio-group / el-radio-button', use: '项目状态筛选（defineModel 双向绑定）' },
  { name: 'el-avatar', use: '个人头像展示' },
  { name: 'el-alert', use: '消息提示：文章分类统计、登录错误提示' },
  { name: 'el-empty', use: '技能搜索无结果时的空状态提示' },
  { name: 'el-result', use: '文章/项目不存在时的 404 式结果页，附操作按钮' },
  { name: 'el-descriptions', use: '本页键值对展示组件清单说明' },
  { name: 'el-pagination（预留）', use: '列表分页，随数据量增长启用' }
];
</script>

<style scoped>
p { color: var(--text-soft); line-height: 1.9; margin-bottom: 10px; }
.list { margin: 6px 0 18px; }
</style>
