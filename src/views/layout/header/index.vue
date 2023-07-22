<template>
  <div class="mz-header">
    <!-- <div :class="[systemStore.menuStatus?'mz-header-logo':'mz-header-small-logo']">
      <img v-if="systemStore.menuStatus" src="./imgs/logo-mini.png" alt="">
      <img v-else src="./imgs/logo-small.png" alt="">
    </div> -->
    <el-icon class="menu-icon">
      <Expand v-if="systemStore.menuStatus" @click="changeMenuStatus()" />
      <Fold v-else @click="changeMenuStatus()" />
    </el-icon>
    <div class="mz-header-right">
      <div class="avatar-icon">
        <img src="./imgs/avatar.png" alt="">
      </div>
      <svg-icon @click="exit" class="exit-icon" name="tuichu"></svg-icon>
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
      padding: 4px;
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
