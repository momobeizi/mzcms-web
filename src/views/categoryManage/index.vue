<template>
  <div class="category-container">
    <el-button type="primary">新增</el-button>
    <el-table :data="list" border stripe style="width: 100%">
      <el-table-column prop="name" label="类别名称" />
      <el-table-column prop="keywords" label="关键字" />
      <el-table-column prop="url" label="url" />
      <el-table-column prop="enable" label="是否启用" />
      <el-table-column prop="comments" label="描述" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { category } from '@/types/category'
import { getCategoryList } from '@/api/category'

const list = ref<category[] | null>(null)

const getList = () => {
  getCategoryList().then(res => {
    console.log(res)
  })
}
getList()
</script>

<style lang="scss" scoped>
.category-container {}
</style>
