<template>
  <div class="dashboard">
    <h1>This is an Dashboard page {{ userStore.userInfo.userName }}</h1>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
console.log(userStore.userInfo)
</script>
<style>
 
</style>
