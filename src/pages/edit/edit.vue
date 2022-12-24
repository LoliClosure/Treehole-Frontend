<script setup lang="ts">
import { user } from '../../utils/auth';
import { ref } from 'vue';

const nickname = ref(user.profile?.nickname);
const avatar = ref(user.profile?.avatar);

function handleChooseAvatar(e: any) {
  const { avatarUrl } = e.detail;
  if (user.profile) {
    avatar.value = avatarUrl;
  }
}

function handleSubmit() {

}
</script>

<template>
  <view class="px-4 flex flex-col items-center">
    <image class="mt-4 avatar" :src="avatar" />
    <button class="mt-4" open-type="chooseAvatar" @chooseavatar="handleChooseAvatar">设置头像</button>
    <view class="mt-4 w-full">
      <text class="px-2 text-sm text-gray-500">昵称</text>
      <input class="edit mt-1 rounded-lg" type="nickname" v-model="nickname" placeholder="请输入昵称" />
      <button class="mt-4 rounded-lg btn-submit" @click="handleSubmit">保存</button>
    </view>
  </view>
</template>

<style>
.avatar {
  display: block;
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
}

.edit {
  background-color: #fff;
  padding: 16rpx 20rpx;
}

.btn-submit {
  border: none;
  background-color: #3cc51f;
  color: #fff;
}
</style>