<script setup lang="ts">
import { Message } from '../models/Message';
import { className } from '../utils/className';
import moment from 'moment';

const props = defineProps<{
  extraClass?: string;
  message: Message;
}>();

const { message, extraClass } = props;
const relativeTime = moment(message.createTime).fromNow();
</script>

<template>
  <view :class="className(extraClass, 'msg-item rounded-lg px-4 py-3')">
    <view class="flex justify-between items-center">
      <text class="text-sm font-bold">{{ message.title }}</text>
    </view>
    <view class="mt-2 text-gray-800" v-html="message.contentHtml" />
    <view class="mt-2 flex justify-between items-end">
      <text class="text-sm text-gray-500">{{ relativeTime }}</text>
      <view class="flex items-center gap-1">
        <uni-icons type="hand-up" />
        <text class="text-sm text-gray-500">{{ message.likeCount }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.msg-item {
  background-color: #fff;
}
</style>