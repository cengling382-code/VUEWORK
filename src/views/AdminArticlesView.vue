<!-- 文章管理（子路由）：el-dialog 对话框 + el-form 校验增删改，持久化走 Store actions -->
<template>
  <div class="admin-articles">
    <div class="bar">
      <el-button type="primary" @click="openAdd">➕ 新增文章</el-button>
    </div>

    <!-- 文章列表 -->
    <el-table :data="articles" stripe border>
      <el-table-column prop="id" label="编号" width="64" />
      <el-table-column prop="title" label="文章标题" min-width="160" />
      <el-table-column label="分类" width="100">
        <template #default="{ row }">
          <el-tag size="small" type="success">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="220" show-overflow-tooltip />
      <el-table-column prop="date" label="日期" width="110" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-popconfirm title="确定删除该文章吗？" @confirm="del(row)">
            <template #reference>
              <el-button size="small" type="danger" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- el-dialog：新增 / 编辑共用 -->
    <el-dialog v-model="visible" :title="form.id ? '编辑文章' : '新增文章'" width="520px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="76px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model.trim="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-input v-model.trim="form.category" placeholder="请输入分类，如 Vue / 前端" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model.trim="form.content" type="textarea" :rows="5" placeholder="请输入文章内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消修改</el-button>
        <el-button type="primary" @click="save">{{ form.id ? '保存修改' : '新增文章' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { useArticlesStore } from '../stores/articles.js';

const articlesStore = useArticlesStore();
const { articles } = storeToRefs(articlesStore);   // 解构 state 保持响应式

const visible = ref(false);
const formRef = ref();
const today = new Date().toISOString().slice(0, 10);
const blank = { id: null, title: '', category: '前端', content: '', date: today };
const form = reactive({ ...blank });

// el-form 校验规则
const rules = {
  title:    [{ required: true, message: '文章标题不能为空', trigger: 'blur' }],
  category: [{ required: true, message: '分类不能为空', trigger: 'blur' }],
  content:  [{ required: true, message: '内容不能为空', trigger: 'blur' }]
};

function openAdd() {
  Object.assign(form, blank);
  visible.value = true;
}
function openEdit(a) {
  Object.assign(form, a);   // 拷贝到表单草稿，不直接改 store
  visible.value = true;
}
function cancel() {
  visible.value = false;    // 草稿丢弃，不写回 store
  ElMessage.info('已取消修改');
}
async function save() {
  const ok = await formRef.value.validate().catch(() => false);
  if (!ok) return;

  if (form.id) {
    articlesStore.update({ ...form });   // 改：action 修改 state + 持久化
  } else {
    form.id = articlesStore.add({ ...form });   // 增
  }
  visible.value = false;
  ElMessage.success('✅ 文章已保存');
}
function del(a) {
  articlesStore.remove(a.id);            // 删
  ElMessage.success('🗑️ 文章已删除');
}
</script>

<style scoped>
.bar { margin-bottom: 14px; }
</style>
