<script setup lang="ts">
useRouter().replace({ path: '/' })
</script>

<template>
  <div>
    {{ '未找到页面' }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
