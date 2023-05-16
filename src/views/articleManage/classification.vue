
<template>
  <div class="article-container">
    <search>
      <template v-slot:searchBtns>
        <el-button type="primary" @click="addVisible = true">新增</el-button>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getArticleList } from '@/api/article';

const state = reactive({
  list: []
});

// 获取类别列表
const getList = () => {
  getArticleList().then(res => {
    state.list = res.data
  })
}
getList()
</script>
<style></style>
