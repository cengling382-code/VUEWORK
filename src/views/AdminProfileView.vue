<!-- 个人简介管理（子路由）：复用 ProfileCard 的编辑模式，保存后前台立即生效 -->
<template>
  <div class="admin-profile">
    <!-- 保存按钮在 ProfileCard 内，@save 接收草稿 -->
    <ProfileCard :profile="profile" :is-editing="isEditing" @save="save" />

    <div class="btns">
      <el-button v-if="!isEditing" type="primary" @click="isEditing = true">✏️ 编辑简介</el-button>
      <el-button v-else @click="cancel">❌ 取消修改</el-button>
    </div>
    <el-alert v-if="msg" :title="msg" :type="msg.startsWith('✅') ? 'success' : 'info'"
              :closable="false" show-icon class="msg" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '../stores/profile.js';
import ProfileCard from '../components/ProfileCard.vue';

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);   // 解构 state 保持响应式

const isEditing = ref(false);
const msg = ref('');

function save(draft) {
  profileStore.updateProfile(draft);   // action 修改 state + 持久化，前台首页同步更新
  isEditing.value = false;
  msg.value = '✅ 个人简介已保存';
}
function cancel() {
  isEditing.value = false;               // 草稿丢弃，不写回 store
  msg.value = '已取消修改';
}
</script>

<style scoped>
.btns { margin-top: 14px; display: flex; gap: 10px; }
.msg { margin-top: 12px; }
</style>
