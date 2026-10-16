<!-- 文章列表（公开）：el-table 列表 + el-tag 分类标签 + el-alert 分类统计 -->
<template>
  <div class="card">
    <h3>📝 文章列表</h3>
    <el-alert type="success" :closable="false" show-icon class="cats"
              :title="Object.entries(countByCategory).map(([c, n]) => `${c}（${n}）`).join('　｜　')" />

    <el-table :data="articles" stripe @row-click="goDetail" class="table">
      <el-table-column prop="id" label="编号" width="70" />
      <el-table-column prop="title" label="标题" min-width="200">
        <template #default="{ row }">
          <RouterLink class="title" :to="{ name: 'ArticleDetail', params: { id: row.id } }">{{ row.title }}</RouterLink>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="110">
        <template #default="{ row }">
          <el-tag size="small" type="success">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="120" />
    </el-table>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useArticlesStore } from '../stores/articles.js';

const router = useRouter();
const articlesStore = useArticlesStore();

// storeToRefs：把 state / getters 包装为 ref，解构后仍保持响应式
// （直接解构 store.articles 会丢失响应性；actions 不用包装，可直接解构）
const { articles } = storeToRefs(articlesStore);
const { countByCategory } = storeToRefs(articlesStore);

// el-table 的 row-click：点行任意处进详情
function goDetail(row) {
  router.push({ name: 'ArticleDetail', params: { id: row.id } });
}
</script>

<style scoped>
.cats { margin-bottom: 14px; }
.table { cursor: pointer; }
.title { color: var(--text); text-decoration: none; font-size: 15px; }
.title:hover { color: var(--primary); }
</style>
