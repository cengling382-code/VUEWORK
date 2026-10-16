// src/stores/articles.js 文章 Store：文章数据的增删改查
import { defineStore } from 'pinia';

const KEY = 'lab4-articles';

const DEFAULT = [
  {
    id: 1,
    title: 'Vue 3 组合式 API 入门',
    category: 'Vue',
    date: '2026-09-20',
    content: '组合式 API 用 setup 组织逻辑，ref/reactive 定义响应式数据，computed 派生计算值，watch 监听变化。相比选项式 API，相关逻辑可以放在一起，复用更方便。'
  },
  {
    id: 2,
    title: 'Vue Router 路由配置实践',
    category: 'Vue',
    date: '2026-10-06',
    content: '路由表用 createRouter 定义，命名路由与 path 解耦，动态参数用 :id 匹配，children 配置嵌套路由，beforeEach 全局守卫统一处理标题与权限。'
  },
  {
    id: 3,
    title: 'Pinia 状态管理学习笔记',
    category: '前端',
    date: '2026-10-12',
    content: 'Pinia 用 state 存数据、getters 派生计算值、actions 修改状态。跨组件共享数据放 Store，配合 storeToRefs 解构保持响应式，手动写 localStorage 实现持久化。'
  }
];

// 持久化：刷新后从 localStorage 恢复
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || DEFAULT; } catch { return DEFAULT; }
}

export const useArticlesStore = defineStore('articles', {
  state: () => ({ articles: load() }),

  getters: {
    // 按编号取文章（详情页动态参数用）
    byId: (state) => (id) => state.articles.find(a => a.id === id),
    // 分类计数（列表页展示）
    countByCategory: (state) => {
      const c = {};
      state.articles.forEach(a => { c[a.category] = (c[a.category] || 0) + 1; });
      return c;
    }
  },

  actions: {
    add(data) {
      const id = Math.max(0, ...this.articles.map(a => a.id)) + 1;
      this.articles.push({ ...data, id });
      this.save();
      return id;
    },
    update(data) {
      const a = this.articles.find(a => a.id === data.id);
      if (a) Object.assign(a, data);
      this.save();
    },
    remove(id) {
      const i = this.articles.findIndex(a => a.id === id);
      if (i > -1) this.articles.splice(i, 1);
      this.save();
    },
    save() {
      localStorage.setItem(KEY, JSON.stringify(this.articles));
    }
  }
});
