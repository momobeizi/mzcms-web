<template>
  <div class="friendlyLinks-container">
    <search class="search-container">
      <template v-slot:searchList>
        <div class="search-inputs">
          <el-input
            class="search-input"
            placeholder="请输入友链接名称"
            v-model="state.submit.linkName"
          />
        </div>
      </template>
      <template v-slot:searchBtns>
        <div class="search-buttons">
          <el-button type="primary" @click="editVisible = true">新增</el-button>
          <el-button type="primary" :loading="state.searchLoading" @click="getList">搜索</el-button>
        </div>
      </template>
    </search>
    <el-table :data="state.list" border stripe style="width: 100%" height="650">
      <el-table-column prop="linkName" label="链接名称" />
      <el-table-column prop="linkUrl" label="链接地址" />
      <el-table-column prop="approved" label="审批状态">
        <template #default="scope">
          <el-tag v-if="scope.row.approved === 1" type="success">已审批</el-tag>
          <el-tag v-else type="danger">未审批</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="linkSort" label="友链排序">
        <template #default="scope">
          <el-tag>{{ scope.row.linkSort }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="友链备注" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="update(scope.row.id)">修改</el-button>
          <el-button type="primary" @click="del(scope.row.id)">删除</el-button>
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

    <el-dialog v-model="editVisible" title="新增链接" width="50%">
      <div class="edit-content">
        <el-form ref="editCategory" :model="submitData" label-width="80px" status-icon>
          <el-form-item class="dialog-item" label="链接名称" prop="linkName">
            <el-input v-model="submitData.linkName" placeholder="请输入链接名称" />
          </el-form-item>
          <el-form-item class="dialog-item" label="链接地址" prop="linkUrl">
            <el-input v-model="submitData.linkUrl" placeholder="https://www.baidu.com" />
          </el-form-item>
          <el-form-item class="dialog-item" label="审批状态" prop="approved">
            <el-radio-group v-model="submitData.approved">
              <el-radio :label="0">未审核</el-radio>
              <el-radio :label="1">已审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="dialog-item" label="友链排序" prop="linkSort">
            <el-input v-model="submitData.linkSort" placeholder="请输入友链排序1-999" />
          </el-form-item>
          <el-form-item class="dialog-item" label="友链备注" prop="remarks">
            <el-input v-model="submitData.remarks" placeholder="请输入友链备注" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="save(submitData.id)" :loading="saveLoading"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getLinkList, deleteLink, editLink, addLink, getLink } from '@/api/friendlyLinks'

const router = useRouter()
const state = reactive({
  list: [],
  total: 0,
  submit: {
    userName: '',
    pageSize: 10,
    pageNum: 1
  },
  searchLoading: false
})
let editVisible = ref(false)
let saveLoading = ref(false)
let submitData = ref({
  linkName: '',
  linkUrl: '',
  approved: 0,
  linkSort: '',
  remarks: ''
})

// 获取用户列表
const getList = () => {
  state.searchLoading = true
  getLinkList(state.submit)
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

// 保存友链
const save = (id?: string) => {
  saveLoading.value = true
  console.log(id)
  let Ajax = id ? editLink : addLink
  Ajax(submitData.value)
    .then(() => {
      getList()
      ElMessage.success('保存成功')
    })
    .finally(() => {
      editVisible.value = false
      saveLoading.value = false
    })
}

// 删除链接
const del = (id?: string) => {
  ElMessageBox.confirm('是否删除当前链接?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteLink({ id }).then(() => {
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

// 编辑链接
const update = (id?: string) => {
  getLink({ id }).then((res) => {
    submitData.value = res.data
    editVisible.value = true
  })
}
</script>
<style lang="scss" scoped>
.friendlyLinks-container {
  padding: 24px;
}
</style>
