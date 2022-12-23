<script setup lang="ts">
import { computed, ref } from 'vue';

const content = ref('');
const errMsg = ref('');
const isSubmitting = ref(false);
const count = computed(() => content.value.length);
const limit = 140;

function handleClickSubmit() {
  isSubmitting.value = true;
  errMsg.value = '';
  if (content.value.length > limit) {
    errMsg.value = `内容不能超过${limit}个字`;
    isSubmitting.value = false;
    return;
  }
  console.log(content.value);
  setTimeout(() => {
    isSubmitting.value = false;
    uni.navigateBack();
  }, 1000);
}
</script>

<template>
  <view class="p-4">
    <view class="flex justify-between items-center">
      <text class="text-sm text-gray-500">抒发你的心中所想</text>
      <text v-if="count < limit" class="text-sm text-gray-500">{{ count }} / {{ limit }}</text>
      <text v-else class="text-sm text-orange-500">{{ count }} / {{ limit }}</text>
    </view>
    <textarea class="content-edit mt-4 rounded-lg" v-model="content" />
    <button :loading="isSubmitting" class="mt-4 rounded-lg btn-submit" @click="handleClickSubmit">发表</button>
    <text v-if="!!errMsg" class="text-sm text-red-500 mt-2">{{ errMsg }}</text>
  </view>
</template>

<style>
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
</style>