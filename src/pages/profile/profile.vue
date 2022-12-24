<script setup lang="ts">
import { user } from '../../utils/auth';
import { ref } from 'vue';

function handleClickLogin() {
  if (!user.profile) {
    user.login().catch((err) => console.log(err));
  }
}

const displayName = ref('');
</script>

<template>
  <view class="p-4 bg-neutral-100">
    <view class="p-4 rounded-lg bg-white flex justify-between items-center">
      <view class="flex-grow rounded flex items-center active:bg-neutral-50" @click="handleClickLogin">
        <image v-if="user.profile" class="avatar" mode="aspectFill" :src="user.profile.avatar" />
        <image v-else class="avatar" mode="aspectFill" src="/static/images/Akkarin.jpg" />
        <text class="ml-4 text-lg">{{ user.profile?.nickname ?? '点击登录' }}</text>
      </view>
      <view v-if="user.profile" class="h-full pl-8 py-3 active:bg-neutral-50 rounded" @click="user.logout">
        <uni-icons custom-prefix="iconfont" type="icon-logout" />
      </view>
    </view>
    <view v-if="user.profile" class="mt-4 p-4 bg-white rounded-lg active:bg-neutral-50 flex justify-between items-center">
      <text>我的树洞</text>
      <uni-icons type="right" />
    </view>
  </view>
</template>

<style>
.danger-button {
  border: 1px solid rgb(239 68 68);
  color: rgb(239 68 68);
  background-color: transparent;
  line-height: 1;
  font-size: 32rpx;
}

.danger-button:active {
  background-color: rgb(239 68 68 / 10%);
}

.avatar {
  display: block;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
</style>