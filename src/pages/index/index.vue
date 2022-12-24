<script setup lang="ts">
import { Message } from '../../models/Message';
import { user } from '../../utils/auth';

const messages = [
  new Message({
    id: 1,
    title: 'test title',
    content: '最好的领导是做心灵的导航仪，而不是做赶车人',
    contentHtml: '<p>最好的领导是做心灵的导航仪，而不是做赶车人</p>',
    likeCount: 0,
    createTime: '2021-08-01 12:00:00',
  }),
  new Message({
    id: 2,
    title: 'test title',
    content: '最好的领导是做心灵的导航仪，而不是做赶车人',
    contentHtml: '<p>最好的领导是做心灵的导航仪，而不是做赶车人</p>',
    likeCount: 1,
    createTime: '2022-08-01 12:00:00',
  }),
];


</script>

<template>
  <view class="mt-4 px-4">
    <navigator v-if="user.profile" class="btn-primary rounded-lg py-2" url="/pages/post/post">抒发心情</navigator>
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
