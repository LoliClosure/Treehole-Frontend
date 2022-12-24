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

const messages = [
  new Message({
    id: 1,
    nickname: 'test',
    title: 'test title',
    content: '最好的领导是做心灵的导航仪，而不是做赶车人',
    likes: 0,
    createdAt: '2021-08-01 12:00:00',
    updatedAt: '2021-08-01 12:00:00',
  }),
  new Message({
    id: 2,
    nickname: 'test',
    title: 'test title',
    content: '最好的领导是做心灵的导航仪，而不是做赶车人',
    likes: 1,
    createdAt: '2022-08-01 12:00:00',
    updatedAt: '2022-08-01 12:00:00',
  }),
];
</script>

<template>
  <view class="mt-4 px-4">
    <navigator class="btn-primary rounded-lg py-2" url="/pages/post/post">抒发心情</navigator>
    <t-message v-for="msg in messages" extraClass="mt-4 rounded-lg" :message="msg" />
  </view>
</template>

<style>
.btn-primary {
  border: 1px solid #3cc51f;
  background-color: transparent;
  color: #3cc51f;
  text-align: center;
}

.btn-primary:active {
  background-color: rgba(60 197 31 / 10%);
}
</style>
