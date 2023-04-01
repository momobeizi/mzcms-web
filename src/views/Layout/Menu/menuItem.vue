<template>
  <template v-if="!route?.meta?.hidden">
    <template v-if="route.children">
      <el-sub-menu :index="route.path" v-if="route?.meta?.title">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <menu-item v-for="(child, childIndex) in route.children" :key="childIndex" :route="child"></menu-item>
      </el-sub-menu>
      <template v-else>
        <menu-item v-for="(child, childIndex) in route.children" :key="childIndex" :route="child"></menu-item>
      </template>
    </template>
    <el-menu-item v-else :index="route.path">
      <el-icon>
        <location />
      </el-icon>
      <template #title>{{ route.meta.title }}</template>
    </el-menu-item>


  </template>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import menuItem from './menuItem.vue';

const props = defineProps({
  route: {
    type: Object,
    default: () => { }
  }
})
const { route } = toRefs(props)
</script>

<style lang="scss" scoped></style>
