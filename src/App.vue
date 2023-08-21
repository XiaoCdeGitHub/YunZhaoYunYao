<script setup lang="ts">
import { useConfigStore } from '~/stores/user'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '云昭云曜',
  meta: [
    { name: 'description', content: '云昭云曜' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
    {
      name: 'keywords',
      content: '云昭云曜',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon.ico' : '/favicon.ico',
    },
  ],
})
const configStore = useConfigStore()

</script>

<template>
 
  <RouterView v-show="typeof configStore.isMobi === 'boolean'" />
</template>

<style lang="less">

</style>
