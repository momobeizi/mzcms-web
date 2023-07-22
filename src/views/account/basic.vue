
<template>
  <div class="account-basic">
    <div class="basic-title">基本设置</div>
    <el-form ref="ruleFormRef" :model="submit" :rules="rules" label-width="80px" class="basic-form">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="submit.userName" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="submit.nickName" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="submit.gender" />
      </el-form-item>
      <el-form-item label="头像" prop="picture">
        <el-input v-model="submit.picture" />
      </el-form-item>
      <el-form-item label="登陆密码" prop="password">
        <el-input v-model="submit.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const submit = reactive<any>({
  userName: '',
  password: ''
})
</script>
<style lang="scss" scoped>
.account-basic {
  .basic-title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 12px;
  }
  .basic-form{
    width: 400px;
  }
}
</style>
