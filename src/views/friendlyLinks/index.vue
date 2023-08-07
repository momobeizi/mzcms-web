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
      <el-table-column prop="approved" label="审批状态" />
      <el-table-column prop="linkSort" label="友链排序" />
      <el-table-column prop="remarks" label="友链备注" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="updateUser(scope.row.id)">修改</el-button>
          <el-button type="primary" @click="userDelete(scope.row.id)">删除</el-button>
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
            <el-input v-model="submitData.linkUrl" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item class="dialog-item" label="审批状态" prop="approved">
            <el-input v-model="submitData.approved" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item class="dialog-item" label="友链排序" prop="linkSort">
            <el-input v-model="submitData.linkSort" placeholder="请输入昵称" />
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
import type { UploadProps } from 'element-plus'
import { useRouter } from 'vue-router'
import { getLinkList, deleteLink, editLink, addLink } from '@/api/friendlyLinks'

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
let submitData = reactive({
  userName: '',
  nickName: '',
  picture: '',
  gender: '1'
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

// 上传头像
const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
  let imgType = ['image/jpg', 'image/jpeg', 'image/png']
  if (!imgType.includes(file.type)) {
    ElMessage.error('请上传jpg,jpeg,png类型的图片')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  let fileSubmit = new FormData()
  fileSubmit.append('file', file)
  uploadFile(fileSubmit)
    .then((res) => {
      submitData.picture = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return false
}

// 保存用户信息
const save = (id?: string) => {
  saveLoading.value = true
  console.log(id)
  let Ajax = id ? editLink : addLink
  Ajax(submitData)
    .then(() => {
      getList()
      ElMessage.success('保存成功')
    })
    .finally(() => {
      saveLoading.value = false
    })
}

// 删除用户
const userDelete = (id?: string) => {
  ElMessageBox.confirm('是否删除当前用户?', '提示', {
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
</script>
<style lang="scss" scoped>
.friendlyLinks-container {
  padding: 24px;
}
</style>
