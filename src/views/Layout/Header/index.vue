<template>
   <div class="mz-header">
      <div class="mz-header-logo">
         <img src="./imgs/logo-mini.png" alt="">
      </div>
      <el-icon class="menu-icon">
         <Expand v-if="system.menuStatus" @click="changeMenuStatus()" />
         <Fold v-else @click="changeMenuStatus()" />
      </el-icon>
   </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/stores/system'
const system = useSystemStore();

const changeMenuStatus = () => {
   system.changeMenuStatus(!system.menuStatus)
}
</script>

<style lang="scss" scoped>
.mz-header {
   width: 100%;
   height: 60px;
   background: #fff;
   border-bottom: 1px solid #ccc;
   display: flex;
   align-items: center;
   padding: 0 16px;

   &-logo {
      width: 168px;
      height: 40px;
      display: flex;
      justify-content: center;
      img {
         width: auto;
         height: 100%;
      }
   }

   .menu-icon {
      margin-left: 16px;
      font-size: 20px;
      cursor: pointer;
   }
}
</style>
