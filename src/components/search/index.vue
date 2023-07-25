<template>
    <div>
        <slot name="searchList"></slot>
        <slot name="searchBtns"></slot>
    </div>
</template>
  
<script setup lang="ts" name="search">
import { defineProps, toRefs } from 'vue';
const props = defineProps({
    name: {
        type: String,
        default: ''
    }
})
const { name } = toRefs(props)
</script>
  
<style lang="scss" scoped>

</style>
  