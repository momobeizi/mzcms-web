<template>
  <div class="update-article">
    <el-form ref="articleForm" :model="articleSubmit" :rules="articleRules" label-width="80px" status-icon>
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleSubmit.title" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-input v-model="articleSubmit.status" />
      </el-form-item>
      <el-form-item label="摘要" prop="abstract">
        <el-input v-model="articleSubmit.abstract" />
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="articleSubmit.url" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { article } from '@/types/article'
import { Check, Close } from '@element-plus/icons-vue'
import type { FormInstance, FormRules, Action } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

const state = reactive({
  list: []
});

let articleSubmit = ref<article>({
  title: "",
  name: "",
  keywords: "",
  url: "",
  enable: 0,
  comments: "",
  createdAt: "",
  updatedAt: ""
})
const articleForm = ref<FormInstance>()
const articleRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  keywords: [{ required: true, message: '请输入关键字', trigger: 'blur' }],
  url: [{ required: true, message: '请输入url', trigger: 'blur' }],
  comments: [{ required: true, message: '请输入备注', trigger: 'blur' }],
})



</script>

<style lang="scss" scoped>
.update-article {}
</style>
