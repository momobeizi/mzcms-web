<template>
  <svg class="mz-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const { name } = toRefs(props)
</script>

<style scoped>
.mz-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
