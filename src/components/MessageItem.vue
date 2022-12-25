<script setup lang="ts">
import { Message } from '../models/Message';
import { className } from '../utils/className';
import moment from 'moment';
import { ref } from 'vue';
import ajax from "../utils/ajax";

const props = defineProps<{
  extraClass?: string;
  message: Message;
  deletable: boolean;
}>();

const { message, extraClass } = props;
const relativeTime = moment(message.createTime).fromNow();
const liked = ref(false);

function toggleLike() {
  liked.value ? message.likeCount-- : message.likeCount++;
  liked.value = !liked.value;
}

function deleteSelf() {
  ajax.delete('/post/' + message.id);
}
</script>

<template>
  <view :class="className(extraClass, 'msg-item rounded-lg px-4 py-3')">
    <view class="flex justify-between items-center">
      <text class="text-sm font-bold">{{ message.title }}</text>
    </view>
    <view class="mt-2 text-gray-800" v-html="message.contentHtml" />
    <view class="mt-2 flex gap-5 justify-between items-end">
      <text class="grow text-sm text-gray-500">{{ relativeTime }}</text>
      <view v-if="deletable" @click="deleteSelf" class="flex items-center gap-1">
        <uni-icons type="trash" />
      </view>
      <view @click="toggleLike" class="flex items-center gap-1">
        <uni-icons :type="liked ? 'hand-up' : 'hand-up-filled'" />
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