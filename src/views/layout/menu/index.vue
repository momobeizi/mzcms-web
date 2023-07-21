<template>
   <el-menu router :default-active="currentPath" class="mz-menu" active-text-color="#409eff" background-color="#304156"
      text-color="#bfcbd9" :collapse="!system.menuStatus" @open="handleOpen" @close="handleClose">
      <menu-item :route="route" v-for="(route, index) in routes" :key="index"></menu-item>
   </el-menu>
</template>

<script setup lang="ts">
import menuItem from './menuItem.vue';
import { useSystemStore } from '@/stores/system'
import router from '@/router/index'
import { useRouter } from 'vue-router'
const system = useSystemStore();
const { routes } = router.options
const routerExample = useRouter()
const currentPath = routerExample.currentRoute.value.fullPath

const handleOpen = (key: string, keyPath: string[]) => {
   console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
   console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.mz-menu {
   &:not(.el-menu--collapse) {
      flex-shrink: 0;
      width: 200px !important;
      height: 100%;
      min-height: 400px;
   }
}
</style>
