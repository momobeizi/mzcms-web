<template>
  <div class="login">
    <div class="login-con">
      <div class="system-title">
        欢迎使用mzcms
      </div>
      <el-form ref="ruleFormRef" :model="submit" :rules="loginRules" class="demo-ruleForm" status-icon>
        <el-form-item>
          <div class="login-form-title">账户登录</div>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input :prefix-icon="Avatar" v-model="submit.userName" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" show-password v-model="submit.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <div class="login-sub-btn">
            <el-checkbox v-model="rememberPassword" label="记住密码" />
            <el-link type="primary">忘记密码</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { loginSubmit } from '@/types/login'
import { ElMessage } from 'element-plus'
import { Avatar, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/login'
import { useRouter } from 'vue-router'

const router = useRouter()

const rememberPassword = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const submit = reactive<loginSubmit>({
  userName: '',
  password: ''
})

const loginRules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 获取本地存储的密码
const rememberPwd = () => {
  let storage: string = localStorage.getItem('accountPwd') || ''
  if (storage) {
    rememberPassword.value = true
    let accountPwd: loginSubmit = JSON.parse(storage)
    submit.userName = accountPwd.userName
    submit.password = accountPwd.password
  } else {
    rememberPassword.value = false
  }
}

// 设置本地存储密码
const setRememberPwd = () => {
  if (rememberPassword.value) {
    localStorage.setItem("accountPwd", JSON.stringify(submit))
  } else {
    localStorage.removeItem("accountPwd")
  }
}

// 登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      setRememberPwd()
      login(submit).then(res => {
        router.push({ name: 'dashboard' })
      }).catch(err => {
        ElMessage({
          showClose: true,
          type: 'error',
          message: err.message,
        })
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 获取密码
rememberPwd()

</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #141e47;

  .login-con {
    padding: 0 20px 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    position: absolute;
    right: 100px;
    top: calc(50% - 178px);
    width: 346px;
    height: 356px;
    background-color: #fff;

    .system-title {
      text-align: center;
      padding: 40px 0 20px;
      color: #0253d9;
      font-size: 24px;
      font-weight: 500;
    }

    .login-form-title {
      font-size: 16px;
      font-weight: 500;
      color: #0253d9;
    }

    .login-sub-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
