// src/stores/projects.js 项目 Store：项目数据的增删改查
import { defineStore } from 'pinia';

const KEY = 'lab4-projects';

const DEFAULT = [
  {
    id: 1,
    name: '个人主页',
    desc: '本实验项目：Vue 3 组件化开发，支持暗色模式、技能搜索、信息编辑与项目展示。',
    status: '已完成',
    tech: ['Vue 3', 'Vite', 'CSS'],
    year: 2026,
    link: '#'
  },
  {
    id: 2,
    name: '待办事项应用',
    desc: '支持本地存储的待办管理工具，可按状态筛选、编辑任务。',
    status: '进行中',
    tech: ['Vue 3', 'LocalStorage'],
    year: 2026,
    link: '#'
  },
  {
    id: 3,
    name: '数据可视化面板',
    desc: '基于 ECharts 的可视化展示面板，支持柱状图、折线图切换。',
    status: '计划中',
    tech: ['ECharts', 'Vue 3'],
    year: 2026,
    link: '#'
  },
  {
    id: 4,
    name: 'Markdown 笔记工具',
    desc: '实时预览的 Markdown 编辑器，支持导出 HTML。',
    status: '已完成',
    tech: ['JavaScript', 'CSS'],
    year: 2025,
    link: 'https://github.com'
  }
];

// 持久化：刷新后从 localStorage 恢复
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || DEFAULT; } catch { return DEFAULT; }
}

export const useProjectsStore = defineStore('projects', {
  state: () => ({ projects: load() }),

  getters: {
    // 按状态计数（项目统计 / 筛选计数共用）
    counts: (state) => {
      const c = { 全部: state.projects.length, 已完成: 0, 进行中: 0, 计划中: 0 };
      state.projects.forEach(p => { if (c[p.status] != null) c[p.status]++; });
      return c;
    },
    // 按编号取项目（详情页动态参数用）
    byId: (state) => (id) => state.projects.find(p => p.id === id)
  },

  actions: {
    add(data) {
      const id = Math.max(0, ...this.projects.map(p => p.id)) + 1;
      this.projects.push({ tech: [], link: '#', ...data, id });
      this.save();
      return id;
    },
    update(data) {
      const p = this.projects.find(p => p.id === data.id);
      if (p) Object.assign(p, data);
      this.save();
    },
    remove(id) {
      const i = this.projects.findIndex(p => p.id === id);
      if (i > -1) this.projects.splice(i, 1);
      this.save();
    },
    save() {
      localStorage.setItem(KEY, JSON.stringify(this.projects));
    }
  }
});
