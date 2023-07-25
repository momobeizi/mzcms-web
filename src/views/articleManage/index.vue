<template>
  <div class="article-container">
    <search class="search-container">
      <template v-slot:searchList>
        <div class="search-inputs">
          <el-input class="search-input" placeholder="请输入标题" v-model="state.submit.title" />
        </div>
      </template>
      <template v-slot:searchBtns>
        <div class="search-buttons">
          <el-button type="primary" @click="updateArticle()">新增</el-button>
          <el-button type="primary" :loading="state.searchLoading" @click="getList">搜索</el-button>
        </div>
      </template>
    </search>
    <el-table :data="state.list" border stripe style="width: 100%" height="650">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="abstract" label="摘要" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === '0'" type="info">草稿</el-tag>
          <el-tag v-if="scope.row.status === '1'" type="success">已发布</el-tag>
          <el-tag v-if="scope.row.status === '2'" type="danger">撤回</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="contentCategory" label="文章类别" />
      <el-table-column prop="imgUrl" label="文章封面" width="100px">
        <template #default="scope">
          <el-image :src="scope.row.imgUrl" style="width: 40px; height: 40px" />
        </template>
      </el-table-column>
      <el-table-column prop="readNum" label="阅读量" width="100px" />
      <el-table-column prop="recommend" label="是否推荐" width="100px">
        <template #default="scope">
          <el-tag v-if="scope.row.status === '0'" type="info">否</el-tag>
          <el-tag v-if="scope.row.status === '1'" type="success">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="标签" />
      <el-table-column prop="contentType" label="内容格式" width="120px">
        <template #default="scope">
          <el-tag :type="scope.row.contentType === 'MarkDown' ? 'success' : ''">{{
            scope.row.contentType
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="updateArticle(scope.row.id)">修改</el-button>
          <el-button type="primary" @click="categoryDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="total, sizes, prev, pager, next"
      v-model:page-size="state.submit.pageSize"
      :page-sizes="[10, 15, 20, 30, 40, 50]"
      :total="state.total"
      @current-change="pageChange"
      @size-change="pageSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getArticleList, deleteArticle } from '@/api/article'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({
  list: [],
  total: 0,
  submit: {
    title: '',
    pageSize: 10,
    pageNum: 1
  },
  searchLoading: false
})

// 获取文章列表
const getList = () => {
  state.searchLoading = true
  getArticleList(state.submit)
    .then((res) => {
      state.list = res.data.list
      state.total = res.data.count
    })
    .finally(() => {
      state.searchLoading = false
    })
}
getList()

// 页码改变
const pageChange = (pageNum) => {
  state.submit.pageNum = pageNum
  getList()
}
// 每页数量改变
const pageSizeChange = (pageSize) => {
  console.log(pageSize)
  getList()
}

// 编辑文章
const updateArticle = (id?: string) => {
  router.push({ name: 'updateArticle', query: { id } })
}

// 删除文章
const categoryDelete = (id?: string) => {
  ElMessageBox.confirm('是否删除当前文章?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteArticle({ id }).then(() => {
        getList()
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除已取消'
      })
    })
}
</script>
<style lang="scss" scoped>
.article-container {
  padding: 24px;
}
</style>
