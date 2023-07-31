<template>
  <div class="account-basic">
    <div class="basic-title">基本设置</div>
    <el-form ref="ruleFormRef" :model="submit" :rules="rules" label-width="80px" class="basic-form">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="submit.userName" disabled />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="submit.nickName" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="submit.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
          <el-radio label="3">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像" prop="picture">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="submit.picture" :src="submit.picture" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="登陆密码" prop="password">
        <span class="edit-password">修改密码</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { uploadFile, updateUserInfo } from '@/api/common'
const userStore = useUserStore()

let submit = reactive<any>({
  gender: '',
  userName: '',
  nickName: '',
  picture: ''
})
let saveLoading = ref(false)
submit = userStore.userInfo

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
      submit.picture = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return false
}

// 保存用户信息
const save = () => {
  saveLoading.value = true
  updateUserInfo(submit)
    .then(() => {
      ElMessage.success('保存成功')
    })
    .finally(() => {
      saveLoading.value = false
    })
}
</script>
<style lang="scss" scoped>
.account-basic {
  padding: 24px;
  .basic-title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 12px;
  }
  .basic-form {
    width: 400px;
    .edit-password {
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
<style>

</style>
