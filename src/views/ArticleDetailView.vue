<!-- 文章详情：动态路由参数 :id + 编程式导航（go(-1) / push / replace） -->
<template>
  <el-card v-if="article">
    <template #header>
      <div class="head">
        <h3>📝 {{ article.title }}</h3>
        <el-tag size="small" type="success">{{ article.category }}</el-tag>
      </div>
    </template>
    <p class="meta">{{ article.date }}</p>
    <p class="content">{{ article.content }}</p>
    <div class="btns">
      <el-button @click="router.go(-1)">← 返回上一页</el-button>
      <el-button type="primary" @click="router.push({ name: 'ArticleList' })">返回文章列表</el-button>
    </div>
  </el-card>

  <!-- 无效文章地址：replace 离开，不留下无效历史记录 -->
  <el-result v-else icon="error" title="文章不存在" :sub-title="`未找到编号为 ${id} 的文章`">
    <template #extra>
      <el-button type="primary" @click="router.replace({ name: 'ArticleList' })">返回文章列表</el-button>
    </template>
  </el-result>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArticlesStore } from '../stores/articles.js';

const route = useRoute();
const router = useRouter();
const articlesStore = useArticlesStore();

// 路由参数默认是字符串，Number() 转换后再按数字编号取数据
const id = computed(() => Number(route.params.id));
const article = computed(() => articlesStore.byId(id.value));   // getters 派生
</script>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.meta { color: var(--text-soft); font-size: 13px; margin-bottom: 14px; }
.content { line-height: 1.9; font-size: 15px; margin-bottom: 16px; }
</style>
