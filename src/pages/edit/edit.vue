<script setup lang="ts">
import { user } from '../../utils/auth';
import { ref } from 'vue';
import ajax from "../../utils/ajax";
import * as assert from "assert";

const nickname = ref(user.profile?.nickname);
const avatar = ref(user.profile?.avatar);
const errMsg = ref('');
const isSubmitting = ref(false);
const nameLenLimit = 15;

function handleChooseAvatar(e: any) {
  const { avatarUrl } = e.detail;
  if (user.profile) {
    avatar.value = avatarUrl;
  }
}

function handleSubmit() {
  if (nickname.value === undefined)
    nickname.value = '';
  if (avatar.value === undefined)
    avatar.value = '';
  errMsg.value = '';
    if (nickname.value.length === 0) {
    errMsg.value = '昵称不能为空';
    return;
  }
  if (nickname.value.length > nameLenLimit) {
    errMsg.value = `昵称不能超过${nameLenLimit}个字`;
    return;
  }
  isSubmitting.value = true;
  ajax.put('/user', {
    nickname: nickname.value,
    avatar: avatar.value,
  }).then(() => {
    uni.navigateBack();
    uni.showToast({
      title: '资料已保存',
      icon: 'success',
      duration: 1000,
    });
  }).catch((err) => {
    errMsg.value = err.message;
  }).finally(() => {
    isSubmitting.value = false;
    user.getProfile();
  });
}
</script>

<template>
  <view class="px-4 flex flex-col items-center">
    <image class="mt-4 avatar" :src="avatar" />
    <button class="mt-4 rounded btn-small" size="mini" open-type="chooseAvatar" @chooseavatar="handleChooseAvatar">设置头像</button>
    <view class="mt-4 w-full">
      <text class="px-2 text-sm text-gray-500">昵称</text>
      <input class="edit mt-1 rounded-lg" type="nickname" v-model="nickname" placeholder="请输入昵称" />
      <button :loading="isSubmitting" class="mt-4 rounded-lg btn-submit" @click="handleSubmit">保存</button>
    </view>
    <view v-if="errMsg" class="text-center py-2">
      <text class="text-sm text-red-500">{{ errMsg }}</text>
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

.btn-submit:active {
  background-color: rgb(60 197 31 / 70%);
}

.btn-small {
  border: none;
  background-color: rgb(160, 160, 160, 0.1);
  color: #3cc51f;
}
</style>