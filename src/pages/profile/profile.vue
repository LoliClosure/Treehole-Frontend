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
    <view class="p-4 rounded-lg bg-white active:bg-neutral-50 flex items-center" @click="handleClickLogin">
      <image v-if="user.profile" class="avatar" mode="aspectFill" :src="user.profile.avatar" />
      <image v-else class="avatar" mode="aspectFill" src="/static/images/Akkarin.jpg" />
      <text class="ml-4 text-lg">{{ user.profile?.nickname ?? '未登录' }}</text>
    </view>
    <t-card v-if="user.profile" extraClass="mt-4" title="退出登录">
      <button class="mt-2 py-3 rounded danger-button" @click="user.logout">
        退出登录
      </button>
    </t-card>
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