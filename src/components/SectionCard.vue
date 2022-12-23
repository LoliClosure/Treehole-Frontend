<script setup lang="ts">
import { className } from '../utils/className';

const props = defineProps<{
  title?: string;
  extraClass?: string;
}>();
</script>

<template>
  <view :class="className(extraClass, 'pt-3 pb-4 px-4 rounded-lg bg-white')">
    <text class="text-sm text-gray-500">{{ props.title }}</text>
    <slot />
  </view>
</template>

<style scoped>
</style>