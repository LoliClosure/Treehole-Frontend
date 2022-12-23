<script setup lang="ts">
import { user } from '../../utils/auth';
import { computed } from 'vue';
import { Message } from '../../models/Message';

function handleClickLogin() {
  if (!user.profile) {
    user.login().catch((err) => console.log(err));
  } else {
    user.logout();
  }
}

const avatarUrl = computed(() => user.profile?.avatar);

const msgDemo = new Message({
  id: 1,
  nickname: 'test',
  title: 'test title',
  content: '最好的领导是做心灵的导航仪，而不是做赶车人',
  likes: 0,
  createdAt: '2021-08-01 12:00:00',
  updatedAt: '2021-08-01 12:00:00',
})
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
      <view class="mt-4">
        <navigator url="/pages/post/post">发表</navigator>
      </view>
    </view>
  </view>
  <view class="mt-4 p-4">
    <t-message :message="msgDemo" />
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
