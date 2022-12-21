<script setup lang="ts">
import { user } from '../../utils/auth';
import { computed } from 'vue';

function handleClickLogin() {
  if (!user.profile) {
    user.login().catch((err) => console.log(err));
  } else {
    user.logout();
  }
}

const avatarUrl = computed(() => user.profile?.avatar);
</script>

<template>
  <view class="flex flex-col items-center mt-4">
    <view class="text-area">
      <view class="flex flex-col items-center gap-2">
        <view v-if="avatarUrl">
          <image class="avatar" mode="aspectFill" :src="avatarUrl" />
        </view>
        <view v-else>
          <view class="avatar bg-gray-200" />
        </view>
        <text class="text font-bold mt-3">{{ user.profile?.nickname ?? '未登录' }}</text>
      </view>
      <view class="mt-4">
        <button type="primary" @click="handleClickLogin">{{ user.profile ? '退出登录' : '登录' }}</button>
      </view>
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
</style>
