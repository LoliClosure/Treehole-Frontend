<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { getStorageJWT, user } from './utils/auth';

onLaunch(() => {
  // console.log('App Launch');
});
onShow(() => {
  if (getStorageJWT()) {
    user.getProfile();
  }
});
onHide(() => {
  // console.log('App Hide');
});
</script>
<style>
@import "./style/common.css";
</style>
