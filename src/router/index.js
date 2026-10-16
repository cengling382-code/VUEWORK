// src/router/index.js 路由表：URL ↔ 页面组件（views）的对应关系
import {
  createRouter,
  createWebHistory,   // History 模式（URL 无 #）：本地开发使用
  createWebHashHistory // Hash 模式（URL 带 #）：GitHub Pages 部署使用，刷新子路由不 404
} from 'vue-router';
import { useUserStore } from '../stores/user.js';   // 守卫内部调用（不能放模块顶层）

// 路由组件（页面）统一放 src/views
import HomeView         from '../views/HomeView.vue';
import AboutView        from '../views/AboutView.vue';
import ProjectCenterView from '../views/ProjectCenterView.vue';
import ProjectListView  from '../views/ProjectListView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';
import ProjectStatsView from '../views/ProjectStatsView.vue';
import LoginView        from '../views/LoginView.vue';
import ArticleListView  from '../views/ArticleListView.vue';
import ArticleDetailView from '../views/ArticleDetailView.vue';
import AdminLayout      from '../views/AdminLayout.vue';
import AdminProfileView from '../views/AdminProfileView.vue';
import AdminProjectsView from '../views/AdminProjectsView.vue';
import AdminArticlesView from '../views/AdminArticlesView.vue';
import NotFoundView     from '../views/NotFoundView.vue';

const router = createRouter({
  // dev 用 History 模式；生产构建（GitHub Pages）自动切 Hash 模式，
  // 避免静态托管上刷新 / 子路由直接访问 404
  history: import.meta.env.DEV ? createWebHistory() : createWebHashHistory(),
  routes: [
    // redirect：根路径重定向到首页
    { path: '/', redirect: { name: 'Home' } },

    // 命名路由：跳转用 { name }，与 path 写法解耦
    { path: '/home',  name: 'Home',  component: HomeView,  meta: { title: '首页' } },
    { path: '/about', name: 'About', component: AboutView, meta: { title: '关于' } },
    { path: '/login', name: 'Login', component: LoginView, meta: { title: '身份认证' } },

    // 文章：列表 + 动态参数详情（公开浏览）
    { path: '/articles',     name: 'ArticleList',   component: ArticleListView,   meta: { title: '文章列表' } },
    { path: '/articles/:id', name: 'ArticleDetail', component: ArticleDetailView, meta: { title: '文章详情' } },

    // 嵌套路由：项目中心布局 + 子路由出口
    // 注意：父路由带 name 且有默认子路由（path: ''）时，
    // 用 { name: 'ProjectCenter' } 跳转会有无害的 params 传递警告，跳转结果不受影响
    {
      path: '/projects',
      name: 'ProjectCenter',
      component: ProjectCenterView,
      meta: { title: '项目中心' },
      children: [
        { path: '',      redirect: { name: 'ProjectList' } },
        { path: 'list',  name: 'ProjectList',  component: ProjectListView,  meta: { title: '项目列表' } },
        // 动态路由：一条规则匹配多个项目详情，:id 为项目编号
        { path: ':id',   name: 'ProjectDetail', component: ProjectDetailView, meta: { title: '项目详情' } },
        { path: 'stats', name: 'ProjectStats', component: ProjectStatsView, meta: { title: '项目统计' } }
      ]
    },

    // 后台管理：meta.requiresAuth 标记需要登录，嵌套子路由共享管理布局
    {
      path: '/admin',
      name: 'Admin',
      component: AdminLayout,
      meta: { title: '后台管理', requiresAuth: true },
      children: [
        { path: '',         redirect: { name: 'AdminProfile' } },
        { path: 'profile',  name: 'AdminProfile',  component: AdminProfileView,  meta: { title: '个人简介管理', requiresAuth: true } },
        { path: 'projects', name: 'AdminProjects', component: AdminProjectsView, meta: { title: '项目信息管理', requiresAuth: true } },
        { path: 'articles', name: 'AdminArticles', component: AdminArticlesView, meta: { title: '文章管理', requiresAuth: true } }
      ]
    },

    // 404 通配符路由：未匹配的地址都进这里
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView, meta: { title: '404 页面不存在' } }
  ]
});

// 全局前置守卫：每次跳转前更新浏览器标题 + 后台权限校验
router.beforeEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · 个人主页` : '个人主页';

  // 注意：useUserStore() 要在守卫函数内部调用（Pinia 安装后才可用），不能放模块顶层
  const userStore = useUserStore();
  // 未登录访问后台 → 用 replace 跳登录页，并记住原目标地址
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return { name: 'Login', query: { redirect: to.fullPath } };
  }
});

export default router;
