// src/stores/user.js 用户 Store：登录状态（路由守卫依据）
import { defineStore } from 'pinia';

const KEY = 'lab4-user';

// 持久化：state 初始化时从 localStorage 读取已保存的值作为默认值
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}

export const useUserStore = defineStore('user', {
  // state：存储响应式数据，相当于组件的 data
  state: () => ({
    loggedIn: false,
    username: '',
    ...load()
  }),

  // getters：基于 state 派生计算值，有缓存，相当于组件的 computed
  getters: {
    isLoggedIn: (state) => state.loggedIn
  },

  // actions：修改 state 的唯一入口，支持同步/异步，改完写回 localStorage
  actions: {
    login(username, password) {
      if (username !== 'admin' || password !== '123456') return false;
      this.loggedIn = true;
      this.username = username;
      this.save();
      return true;
    },
    logout() {
      this.loggedIn = false;
      this.username = '';
      this.save();
    },
    save() {
      localStorage.setItem(KEY, JSON.stringify({ loggedIn: this.loggedIn, username: this.username }));
    }
  }
});
