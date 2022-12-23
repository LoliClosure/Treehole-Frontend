<script setup>
import { computed, ref } from 'vue';

const content = ref('');
const count = computed(() => content.value.length);
const limit = 140;

function handleClickSubmit() {
  if (count > limit) {
    return;
  }
  console.log(content.value);
}
</script>

<template>
  <view class="p-3">
    <view class="flex justify-between items-center">
      <text class="text-sm text-gray-500">抒发你的心中所想</text>
      <text v-if="count < limit" class="text-sm text-gray-500">{{ count }} / {{ limit }}</text>
      <text v-else class="text-sm text-orange-500">{{ count }} / {{ limit }}</text>
    </view>
    <textarea class="content-edit mt-3 rounded-lg" v-model="content" />
    <button class="mt-3 rounded-lg btn-submit" @click="handleClickSubmit">发表</button>
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
  background-color: #3cc51f;
  color: #fff;
}
</style>