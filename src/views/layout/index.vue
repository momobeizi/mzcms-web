<template>
  <div class="mz-layout">
    <Menu></Menu>
    <div class="mz-container" :style="{width:system.menuStatus?'calc(100% - 200px)':'calc(100% - 64px)'}">
      <Header></Header>
      <div class="mz-content">
        <RouterView />
      </div>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/layout/header/index.vue'
import Menu from '@/views/layout/menu/index.vue'
// import Footer from '@/views/layout/footer/index.vue'
import { useSystemStore } from '@/stores/system'
const system = useSystemStore()
</script>

<style lang="scss" scoped>
.mz-layout {
  width: 100%;
  height: 100%;
  display: flex;

  .mz-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .mz-content {
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
