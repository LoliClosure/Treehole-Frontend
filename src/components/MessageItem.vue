<script setup lang="ts">
import { Message } from '../models/Message';
import { className } from '../utils/className';
import moment from 'moment';
import { ref } from 'vue';
import ajax from "../utils/ajax";
import {user} from "../utils/auth";

const props = defineProps<{
  extraClass?: string;
  message: Message;
  deletable: boolean;
}>();

const { message, extraClass } = props;
const relativeTime = moment(message.createTime).fromNow();
const emit = defineEmits(['deleted'])

function like() {
  ajax.post(`/post/${message.id}/like`)
    .then(() => {
      message.likeCount++;
    }).catch((err) => {
      uni.showToast({
        title: '点赞失败：',
        icon: 'error',
        duration: 1000,
      });
    });
}

function deleteSelf() {
  ajax.delete(`/post/${message.id}`)
    .then(() => {
      uni.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1000,
      });
    }).catch(() => {
      uni.showToast({
        title: '删除失败',
        icon: 'error',
        duration: 1000,
      });
    }).finally(() => {
      emit('deleted', message.id) // 删除自身
    });
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
      <view @click="like" class="flex items-center gap-1">
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