<template>
  <div class="mz-header">
    <el-icon class="menu-icon">
      <Expand v-if="!systemStore.menuStatus" @click="changeMenuStatus()" />
      <Fold v-else @click="changeMenuStatus()" />
    </el-icon>
    <div class="mz-header-right">
      <el-dropdown>
        <div class="avatar-icon">
          <img :src="userStore.userInfo.picture" alt="">
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setUserInfo">用户信息</el-dropdown-item>
            <el-dropdown-item divided @click="exit">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { useSystemStore } from '@/stores/system'
import { useUserStore } from '@/stores/user'
import { logout } from '@/api/login'
import { useRouter } from 'vue-router'

const router = useRouter()
const systemStore = useSystemStore()
const userStore = useUserStore()

const changeMenuStatus = () => {
  systemStore.changeMenuStatus(!systemStore.menuStatus)
}
// 设置用户信息
const setUserInfo = () => {
  router.push({ name: 'account' })
}

// 退出
const exit = () => {
  ElMessageBox.alert('是否退出登陆?', '提示', {
    autofocus: false,
    confirmButtonText: '确认',
    callback: (action: Action) => {
      if (action === 'confirm') {
        logout().then(() => {
          userStore.clearUserInfo()
          router.push({ name: 'login' })
          ElMessage({
            type: 'success',
            message: '退出成功'
          })
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.mz-header {
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-logo {
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    img {
      width: auto;
      height: 100%;
    }
  }
  &-small-logo {
    width: 64px;
    height: 40px;
    display: flex;
    justify-content: center;
    img {
      width: auto;
      height: 100%;
    }
  }

  .menu-icon {
    font-size: 20px;
    cursor: pointer;
  }

  &-right {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .avatar-icon {
      width: 40px;
      height: 40px;
      border: 1px solid #dadada;
      border-radius: 50%;
      margin-right: 16px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .exit-icon {
      font-size: 26px;
      cursor: pointer;
    }
  }
}
</style>
