<script setup lang="ts">
import { Message } from '../models/Message';
import { className } from '../utils/className';

const props = defineProps<{
  extraClass?: string;
  message: Message;
}>();

const { message, extraClass } = props;
</script>

<template>
  <view :class="className(extraClass, 'msg-item rounded-lg px-4 py-3')">
    <view class="flex justify-between items-center">
      <text class="text-sm font-bold">{{ message.title }}</text>
    </view>
    <view class="mt-2">
      <text class="text-gray-800">{{ message.content }}</text>
    </view>
    <view class="mt-2 flex justify-between items-end">
      <text class="text-sm text-gray-500">{{ message.createdAt }}</text>
      <text class="text-sm text-gray-500">{{ message.likes }} 赞</text>
    </view>
  </view>
</template>

<style scoped>
.msg-item {
  background-color: #fff;
}
</style>