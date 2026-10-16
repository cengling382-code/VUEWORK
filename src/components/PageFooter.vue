<!-- 底部公共元素：props 接收展示信息 -->
<template>
  <footer class="footer">
    <p>{{ info.text }}</p>
    <p>© {{ info.year }} {{ info.author }} · Powered by Vue 3</p>
  </footer>
</template>

<script setup>
defineProps({ info: { type: Object, required: true } });
</script>

<style scoped>
.footer {
  margin-top: 30px; padding: 20px 0 6px; text-align: center;
  color: var(--text-soft); font-size: 13px; line-height: 1.9;
  border-top: 1px solid var(--border);
}
</style>
