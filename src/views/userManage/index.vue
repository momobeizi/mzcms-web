<template>
  <div class="user-container">
    <search class="search-container">
      <template v-slot:searchList>
        <div class="search-inputs">
          <el-input
            class="search-input"
            placeholder="请输入用户账号"
            v-model="state.submit.userName"
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
      <el-table-column prop="userName" label="账号" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column label="头像">
        <template #default="scope">
          <el-image :src="scope.row.picture" style="width: 40px; height: 40px" />
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template #default="scope">
          <el-tag v-if="scope.row.gender === '1'" type="success">男</el-tag>
          <el-tag v-if="scope.row.gender === '2'" type="danger">女</el-tag>
        </template>
      </el-table-column>
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

    <el-dialog v-model="editVisible" title="新增用户" width="50%">
      <div class="edit-content">
        <el-form ref="editCategory" :model="submitData" label-width="80px" status-icon>
          <el-form-item class="dialog-item" label="用户账号" prop="name">
            <el-input
              v-model="submitData.userName"
              :disabled="submitData.id"
              placeholder="请输入用户账号"
            />
          </el-form-item>
          <el-form-item class="dialog-item" label="昵称" prop="name">
            <el-input v-model="submitData.nickName" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item class="dialog-item" label="头像" prop="name">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="submitData.picture" :src="submitData.picture" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item class="dialog-item" label="性别" prop="name">
            <el-radio-group v-model="submitData.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
              <el-radio label="3">保密</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
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
import { getUserList, deleteUser, editUserInfo, addUserInfo } from '@/api/user'
import { uploadFile } from '@/api/common'

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
  getUserList(state.submit)
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
  let Ajax = id ? editUserInfo : addUserInfo
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
      deleteUser({ id }).then(() => {
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
.user-container {
  padding: 24px;
}
</style>
