<template>
  <div class="category-container">
    <search class="search-container">
      <template v-slot:searchBtns>
        <div class="search-buttons">
          <el-button type="primary" @click="addVisible = true">新增</el-button>
        </div>
      </template>
    </search>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="name" label="类别名称" />
      <el-table-column prop="keywords" label="关键字" />
      <el-table-column prop="url" label="url" />
      <el-table-column prop="enable" label="是否启用" />
      <el-table-column prop="comments" label="描述" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="categoryEdit(scope)">修改</el-button>
          <el-button type="primary" @click="categoryDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增类别 -->
    <el-dialog v-model="addVisible" title="操作类别" width="500px">
      <el-form
        ref="categoryAddForm"
        :model="categorySubmit"
        :rules="categoryRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="父级" prop="parentId">
          <el-select v-model="categorySubmit.parentId" placeholder="请选择父级节点" size="large">
            <el-option label="顶级节点" value="0"></el-option>
            <el-option
              v-for="item in state.list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categorySubmit.name" />
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="categorySubmit.keywords" />
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="categorySubmit.url" />
        </el-form-item>
        <el-form-item label="停用启用" prop="enable">
          <el-switch
            v-model="categorySubmit.enable"
            :active-value="1"
            :inactive-value="0"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </el-form-item>
        <el-form-item label="备注" prop="comments">
          <el-input v-model="categorySubmit.comments" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" :loading="addLoading" @click="categoryAdd(categoryAddForm)"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { category } from '@/types/category'
import { Check, Close } from '@element-plus/icons-vue'
import type { FormInstance, FormRules, Action } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getCategoryList,
  addCategory,
  editCategory,
  deleteCategory,
  findOneCategory
} from '@/api/category'

const state = reactive({
  list: []
})
let addVisible = ref<boolean>(false)
let addLoading = ref<boolean>(false)
let categorySubmit = ref<category>({
  parentId: '',
  name: '',
  keywords: '',
  url: '',
  enable: 0,
  comments: '',
  createdAt: '',
  updatedAt: ''
})
const categoryAddForm = ref<FormInstance>()
const categoryRules = reactive<FormRules>({
  parentId: [{ required: true, message: '请选择父级节点', trigger: 'blur' }],
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  keywords: [{ required: true, message: '请输入关键字', trigger: 'blur' }],
  url: [{ required: true, message: '请输入url', trigger: 'blur' }],
  comments: [{ required: true, message: '请输入备注', trigger: 'blur' }]
})

// 获取类别列表
const getList = () => {
  getCategoryList().then((res) => {
    state.list = res.data
  })
}
getList()

/**
 * 新增类别
 * @param formEl 新增表单ref
 */
const categoryAdd = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addLoading.value = true
      const categoryAjax = categorySubmit.value.id ? editCategory : addCategory
      categoryAjax(categorySubmit.value)
        .then(() => {
          addVisible.value = false
          addLoading.value = false
          getList()
        })
        .catch(() => {
          addLoading.value = false
          addVisible.value = false
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

/**
 * 删除分类
 * @param scope 列表点击的数据
 */
const categoryDelete = (scope) => {
  ElMessageBox.alert('确定是否删除分类？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    callback: (action: Action) => {
      if (action === 'confirm') {
        deleteCategory({ id: scope.row.id }).then(() => {
          getList()
          ElMessage({ type: 'success', message: '删除成功' })
        })
      } else {
        ElMessage({ type: 'info', message: '已取消' })
      }
    }
  })
}

/**
 * 编辑分类
 */
const categoryEdit = (scope) => {
  findOneCategory({ id: scope.row.id }).then((res) => {
    categorySubmit.value = res.data
    addVisible.value = true
  })
}
</script>

<style lang="scss" scoped>
.category-container {
  padding: 24px;
}
</style>
