<!-- 技能搜索：defineModel 双向绑定 + Element Plus（el-input 搜索 / el-tag 标签） -->
<template>
  <section class="card">
    <h3>🛠️ 技能与兴趣</h3>
    <el-input v-model="keyword" clearable placeholder="🔍 输入关键词筛选技能，如：Vue / CSS ..."
              class="search-box" />

    <div class="tags" v-if="filtered.length > 0">
      <el-tag v-for="skill in filtered" :key="skill" effect="plain" size="large">{{ skill }}</el-tag>
    </div>
    <el-empty v-else :description="`没有找到与「${keyword}」相关的技能～`" :image-size="60" />
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ skills: { type: Array, required: true } });

// defineModel：父组件写 v-model="keyword" 即可双向同步
const keyword = defineModel({ type: String, default: '' });

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  if (!k) return props.skills;
  return props.skills.filter(s => s.toLowerCase().includes(k));
});
</script>

<style scoped>
.search-box { margin-bottom: 18px; }
.tags { display: flex; flex-wrap: wrap; gap: 10px; }
</style>
