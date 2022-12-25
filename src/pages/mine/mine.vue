<script setup lang="ts">
import { Message } from '../../models/Message';
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

function removeDeletedMsg(id) {
  messages.value = messages.value.filter((m) => m.id !== id)
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
    <t-message v-for="msg in messages" @deleted="(id) => removeDeletedMsg(id)" :key="msg.id" extraClass="mt-4 rounded-lg" :message="msg" deletable="true" />
    <uni-load-more @clickLoadMore="loadMore" :status="status" />
  </view>
</template>

<style>

</style>
