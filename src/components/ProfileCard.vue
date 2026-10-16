<!-- 个人信息卡片：Element Plus 组件重构（el-avatar 头像 / el-tag 链接 / el-input 表单） -->
<template>
  <section class="card">
    <div class="profile">
      <el-avatar :size="110" :src="profile.avatar" class="avatar" />
      <div class="info">
        <h2>{{ profile.name }}</h2>
        <p class="major">专业班级：<b>{{ profile.className }}</b> ｜ 年龄：{{ profile.age }} 岁</p>

        <p class="social">
          <el-tag v-for="link in profile.links" :key="link.name" effect="plain" class="link-tag">
            <a :href="link.url" target="_blank">{{ link.icon }} {{ link.name }}</a>
          </el-tag>
        </p>

        <!-- 编辑模式：修改的是内部草稿 draft，不直接改 props（单向数据流） -->
        <div class="edit-form" v-if="isEditing">
          <el-form label-width="70px">
            <el-form-item label="姓名">
              <el-input v-model.trim="draft.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="专业班级">
              <el-input v-model.trim="draft.className" placeholder="请输入专业班级" />
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input v-model="draft.bio" type="textarea" :rows="3" placeholder="请输入个人简介" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="emit('save', { ...draft })">✅ 保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="detail" v-show="showDetail">{{ profile.bio }}</div>

        <el-button size="small" @click="showDetail = !showDetail">
          {{ showDetail ? '收起详情 ▲' : '展开详情 ▼' }}
        </el-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
  profile: { type: Object, required: true },
  isEditing: Boolean
});
const emit = defineEmits(['save']);

// 组件内部状态：详情展开与否只影响自己，不需要传给父组件
const showDetail = ref(false);

// 进入编辑模式时，用 profile 拷贝一份草稿，保存时统一交给父组件更新
const draft = reactive({ name: '', className: '', bio: '' });
watch(() => props.isEditing, v => { if (v) Object.assign(draft, props.profile); });
</script>

<style scoped>
.profile { display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; }
.avatar { border: 4px solid var(--primary); flex-shrink: 0; }
.info { flex: 1; min-width: 240px; }
.info h2 { font-size: 24px; margin-bottom: 6px; }
.info .major { color: var(--text-soft); margin-bottom: 14px; font-size: 15px; }
.info .major b { color: var(--primary); }
.social { margin-bottom: 10px; }
.link-tag { margin-right: 8px; }
.link-tag a { color: inherit; text-decoration: none; }
.link-tag a:hover { text-decoration: underline; }
.detail {
  margin-top: 18px; padding: 16px; border-left: 3px solid var(--primary);
  background: rgba(66, 184, 131, .08); border-radius: 0 10px 10px 0;
  line-height: 1.9; font-size: 15px; color: var(--text-soft);
}
</style>
