<template>
  <div class="category-container">
    <search>
      <template v-slot:searchBtns>
        <el-button type="primary" @click="addVisible = true">新增</el-button>
      </template>
    </search>
    <el-table :data="list" border stripe style="width: 100%">
      <el-table-column prop="name" label="类别名称" />
      <el-table-column prop="keywords" label="关键字" />
      <el-table-column prop="url" label="url" />
      <el-table-column prop="enable" label="是否启用" />
      <el-table-column prop="comments" label="描述" />
      <el-table-column label="操作">
        <template>
          <el-button type="primary">修改</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增类别 -->
    <el-dialog v-model="addVisible" title="新增类别" width="30%">
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="categoryAdd">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { category } from '@/types/category'
import { getCategoryList, addCategory, editCategory, deleteCategory, findOneCategory } from '@/api/category'

const list = reactive<category[]>([])
const addVisible = ref<boolean>(false)
const submit = reactive<category>({
  parentId: "",
  name: "",
  keywords: "",
  url: "",
  enable: false,
  comments: "",
  createdAt: "",
  updatedAt: ""
})

// 获取类别列表
const getList = () => {
  getCategoryList().then(res => {
    console.log(res)
  })
}
getList()

// 新增类别
const categoryAdd = () => {
  addCategory().then(res => {

  })
}

</script>

<style lang="scss" scoped>
.category-container {}
</style>
