<!-- 项目信息管理（子路由）：el-dialog 对话框 + el-form 校验实现新增/编辑，el-popconfirm 确认删除 -->
<template>
  <div class="admin-projects">
    <div class="bar">
      <el-button type="primary" @click="openAdd">➕ 新增项目</el-button>
    </div>

    <!-- 项目列表 -->
    <el-table :data="projects" stripe border>
      <el-table-column prop="id" label="编号" width="64" />
      <el-table-column prop="name" label="项目名称" min-width="140" />
      <el-table-column prop="desc" label="描述" min-width="200" show-overflow-tooltip />
      <el-table-column label="状态" width="96">
        <template #default="{ row }">
          <el-tag :type="row.status === '已完成' ? 'success' : row.status === '进行中' ? 'warning' : 'info'" size="small">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="year" label="年份" width="76" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <!-- el-popconfirm：删除前确认，防误删 -->
          <el-popconfirm title="确定删除该项目吗？" @confirm="del(row)">
            <template #reference>
              <el-button size="small" type="danger" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- el-dialog 对话框：新增 / 编辑共用，标题按 form.id 区分 -->
    <el-dialog v-model="visible" :title="form.id ? '编辑项目' : '新增项目'" width="480px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="76px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model.trim="form.desc" type="textarea" :rows="3" placeholder="请输入项目描述" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="已完成" value="已完成" />
            <el-option label="进行中" value="进行中" />
            <el-option label="计划中" value="计划中" />
          </el-select>
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-input-number v-model="form.year" :min="2000" :max="2100" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消修改</el-button>
        <el-button type="primary" @click="save">{{ form.id ? '保存修改' : '新增项目' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { useProjectsStore } from '../stores/projects.js';

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);   // 解构 state 保持响应式

const visible = ref(false);
const formRef = ref();
const blank = { id: null, name: '', desc: '', status: '计划中', year: new Date().getFullYear() };
const form = reactive({ ...blank });

// el-form 校验规则：必填 + 年份范围
const rules = {
  name: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
  desc: [{ required: true, message: '项目描述不能为空', trigger: 'blur' }],
  year: [{ required: true, message: '请输入年份', trigger: 'blur' }]
};

function openAdd() {
  Object.assign(form, blank);
  visible.value = true;
}
function openEdit(p) {
  Object.assign(form, p);   // 拷贝到表单草稿，不直接改 store
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
    projectsStore.update({ ...form });   // 改：action 修改 state + 持久化
  } else {
    form.id = projectsStore.add({ ...form });   // 增
  }
  visible.value = false;
  ElMessage.success('✅ 项目信息已保存');
}
function del(p) {
  projectsStore.remove(p.id);            // 删
  ElMessage.success('🗑️ 项目已删除');
}
</script>

<style scoped>
.bar { margin-bottom: 14px; }
</style>
