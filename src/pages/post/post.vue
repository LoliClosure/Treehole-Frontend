<script setup lang="ts">
import { computed, ref } from 'vue';
import ajax from '../../utils/ajax';

const title = ref('');
const content = ref('');
const errMsg = ref('');
const isSubmitting = ref(false);
const count = computed(() => content.value.length);
const limit = 140;

function handleClickSubmit() {
  errMsg.value = '';
  if (title.value.length === 0) {
    errMsg.value = '标题不能为空';
    return;
  }
  if (content.value.length === 0) {
    errMsg.value = '内容不能为空';
    return;
  }
  if (content.value.length > limit) {
    errMsg.value = `内容不能超过${limit}个字`;
    return;
  }
  isSubmitting.value = true;
  ajax.post('/post', {
    title: title.value,
    content: content.value,
  }).then(() => {
    uni.navigateBack();
    uni.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1000,
    });
  }).catch((err) => {
    errMsg.value = err.message;
  }).finally(() => {
    isSubmitting.value = false;
  });
}
</script>

<template>
  <view class="p-4">
    <view class="flex justify-between items-center">
      <text class="text-sm text-gray-500">抒发你的心中所想</text>
      <text v-if="count < limit" class="text-sm text-gray-500">{{ count }} / {{ limit }}</text>
      <text v-else class="text-sm text-orange-500">{{ count }} / {{ limit }}</text>
    </view>
    <input class="title-edit mt-4 rounded-lg" type="text" placeholder="标题" v-model="title" />
    <textarea class="content-edit mt-4 rounded-lg" v-model="content" />
    <button :loading="isSubmitting" class="mt-4 rounded-lg btn-submit" @click="handleClickSubmit">发表</button>
    <view v-if="errMsg" class="text-center py-2">
      <text class="text-sm text-red-500">{{ errMsg }}</text>
    </view>
  </view>
</template>

<style>
.title-edit {
  background-color: #fff;
  padding: 16rpx 20rpx;
}

.content-edit {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding: 16rpx 20rpx;
}

.btn-submit {
  border: none;
  background-color: #3cc51f;
  color: #fff;
}

.btn-submit:active {
  background-color: rgb(60 197 31 / 70%);
}
</style>