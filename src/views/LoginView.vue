<!-- 身份认证页：el-form 规则校验 + 账号密码登录，成功后 replace 进后台（或原目标地址） -->
<template>
  <section class="card login">
    <h3>🔒 身份认证</h3>
    <p class="tip">演示账号：admin / 123456</p>

    <!-- el-form 校验：rules 定义规则，ref.validate() 触发校验 -->
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent>
      <el-form-item label="账号" prop="username">
        <el-input v-model.trim="form.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="form.password" type="password" show-password placeholder="请输入密码" />
      </el-form-item>
      <!-- 账号密码不匹配时用 el-alert 提示（el-form 的 rules 只能校验格式） -->
      <el-alert v-if="error" :title="error" type="error" :closable="false" class="error" />
      <el-form-item>
        <el-button type="primary" class="btn-login" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../stores/user.js';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const formRef = ref();
const form = reactive({ username: '', password: '' });
const error = ref('');

// el-form 的校验规则：必填 + 最短长度
const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 位', trigger: 'blur' }
  ]
};

async function login() {
  error.value = '';
  // 触发表单校验，校验不通过则不提交
  const ok = await formRef.value.validate().catch(() => false);
  if (!ok) return;

  // 账号密码校验与登录状态修改统一走 Store 的 login action
  if (!userStore.login(form.username, form.password)) {
    error.value = '账号或密码错误（演示账号 admin / 123456）';
    return;
  }
  // replace：验证后进入原目标，登录页不留在历史记录里
  router.replace(route.query.redirect || { name: 'Admin' });
}
</script>

<style scoped>
.login { max-width: 420px; margin: 0 auto; }
.tip { color: var(--text-soft); font-size: 13px; margin-bottom: 10px; }
.error { margin-bottom: 12px; }
.btn-login { width: 100%; }
.btn-login :deep(.el-button) { width: 100%; }
</style>
