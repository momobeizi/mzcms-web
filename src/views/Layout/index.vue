<template>
  <div class="mz-layout">
    <Header></Header>
    <div class="mz-container">
      <Menu></Menu>
      <div class="mz-content">
        <RouterView />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/Layout/Header/index.vue'
import Menu from '@/views/Layout/Menu/index.vue'
import Footer from '@/views/Layout/Footer/index.vue'

</script>

<style lang="scss" scoped>
.mz-layout {
  width: 100%;
  height: 100%;

  .mz-container {
    display: flex;
    width: 100%;
    height: calc(100% - 90px);

    .mz-content {
      margin: 16px;
      width: 100%;
    }
  }
}
</style>
