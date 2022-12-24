<script setup lang="ts">
import { Message } from '../../models/Message';
import { user } from '../../utils/auth';
import { onMounted, ref } from 'vue';
import ajax from '../../utils/ajax';
import { ListData } from '../../models/Base';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';

const messages = ref<Message[]>([]);
const size = 10;
const page = ref(1);
const count = ref(0);
const status = ref('loading');

function fetchData(type: 'refresh' | 'loadmore') {
  status.value = 'loading';
  if (type === 'refresh') {
    page.value = 1;
  }
  ajax.get<ListData<Message>>('/post/list', { pageSize: size, pageNum: page.value })
      .then((res) => {
        if (type === 'loadmore') {
          messages.value = messages.value.concat(res.data.list);
        } else {
          messages.value = [...res.data.list];
        }
        count.value = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        uni.stopPullDownRefresh();
        status.value = 'more';
      });
}

function loadMore() {
  if (status.value === 'loading') {
    return;
  }
  if (messages.value.length >= count.value) {
    status.value = 'no-more';
    return;
  }
  page.value += 1;
  fetchData('loadmore');
}

onMounted(() => {
  fetchData('refresh');
});

onPullDownRefresh(() => {
  fetchData('refresh');
});

onReachBottom(() => {
  loadMore();
});
</script>

<template>
  <view class="mt-4 px-4">
    <navigator v-if="user.profile" class="btn-primary rounded-lg py-2" url="/pages/post/post">抒发心情</navigator>
    <t-message v-for="msg in messages" :key="msg.id" extraClass="mt-4 rounded-lg" :message="msg" />
    <uni-load-more @clickLoadMore="loadMore" :status="status" />
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
