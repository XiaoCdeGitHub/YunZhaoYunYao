<script setup lang="ts">
import { useConfigStore } from '~/stores/user'
import 'ant-design-vue/lib/carousel/style/index.less'
import MobiHome from '~/components/mobi/MobiHome.vue'


defineOptions({
  name: 'IndexPage',
})
console.log(11111);
const configStore = useConfigStore()
</script>

<template >
  <div v-if="!configStore.isMobi" class="pc-home">云昭云曜</div>
  <MobiHome v-else></MobiHome>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style lang="less" scoped></style>
