<!-- 项目状态筛选：defineModel 双向绑定 + el-radio-group 单选组 -->
<template>
  <el-radio-group v-model="status" class="filter-bar">
    <el-radio-button v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}<span class="count">{{ counts[opt.value] ?? 0 }}</span>
    </el-radio-button>
  </el-radio-group>
</template>

<script setup>
defineProps({
  counts: { type: Object, required: true }   // 各状态项目数
});
const status = defineModel({ type: String, default: 'all' });

const options = [
  { label: '全部',   value: 'all' },
  { label: '已完成', value: '已完成' },
  { label: '进行中', value: '进行中' },
  { label: '计划中', value: '计划中' }
];
</script>

<style scoped>
.filter-bar { margin-bottom: 18px; }
.count {
  margin-left: 6px; padding: 1px 8px; border-radius: 999px;
  background: rgba(66, 184, 131, .12); color: var(--primary); font-size: 11px;
}
</style>
