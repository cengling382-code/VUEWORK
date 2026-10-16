<!-- 404 页：通配符路由匹配到的无效地址都显示这里（el-result 结果页） -->
<template>
  <el-result icon="404" title="404" sub-title="抱歉，您访问的页面不存在～">
    <template #extra>
      <el-button type="primary" @click="router.replace({ name: 'Home' })">回首页</el-button>
      <el-button @click="router.go(-1)">返回上一页</el-button>
    </template>
  </el-result>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
