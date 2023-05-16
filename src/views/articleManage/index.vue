
<template>
  <div class="article-container">
    <search>
      <template v-slot:searchBtns>
        <el-button type="primary" @click="updateArticle()">新增</el-button>
      </template>
    </search>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="abstract" label="摘要" />
      <el-table-column prop="status" label="状态(0:草稿，1:已发布,2:撤回)" />
      <el-table-column prop="contentCategory" label="文章类别" />
      <el-table-column prop="imgUrl" label="文章封面" />
      <el-table-column prop="readNum" label="阅读量" />
      <el-table-column prop="recommend" label="是否推荐(0:否，1:是)" />
      <el-table-column prop="label" label="标签" />
      <el-table-column prop="contentType" label="内容格式（html,markdown）" />
      <el-table-column prop="updatedAt" label="更新时间" />
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
import { useRouter } from 'vue-router'


const router = useRouter()

const state = reactive({
  list: []
});

// 获取文章列表
const getList = () => {
  getArticleList().then(res => {
    state.list = res.data
  })
}
getList()

// 编辑文章
const updateArticle = (id?: string) => {
  console.log(id)
  router.push({ name: 'updateArticle', query: { id } })
}
</script>
<style></style>
