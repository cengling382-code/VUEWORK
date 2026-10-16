// src/stores/profile.js 个人简介 Store：首页展示与后台编辑共享
import { defineStore } from 'pinia';

const KEY = 'lab4-profile';

const DEFAULT = {
  profile: {
    name: '曾凌',
    className: '24计科1班',
    age: 20,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=XiaoMing',
    bio: '热爱编程与开源，熟悉前端开发，目前正在深入学习 Vue 3 与工程化实践。喜欢打球、摄影，相信持续学习带来的长期价值。',
    links: [
      { name: 'GitHub', url: 'https://github.com', icon: '🐱' },
      { name: '博客',    url: 'https://juejin.cn',  icon: '📝' },
      { name: '邮箱',    url: 'mailto:test@example.com', icon: '📮' }
    ]
  },
  skills: [
    'HTML5', 'CSS3', 'JavaScript', 'Vue 3', 'TypeScript',
    'Node.js', 'Python', 'Git', 'Webpack', 'MySQL'
  ]
};

// 持久化：刷新后从 localStorage 恢复
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || DEFAULT; } catch { return DEFAULT; }
}

export const useProfileStore = defineStore('profile', {
  state: () => load(),

  getters: {
    name: (state) => state.profile.name
  },

  actions: {
    updateProfile(draft) {
      Object.assign(this.profile, draft);
      this.save();
    },
    save() {
      localStorage.setItem(KEY, JSON.stringify({ profile: this.profile, skills: this.skills }));
    }
  }
});
