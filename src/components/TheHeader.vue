<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { Button, Menu } from 'ant-design-vue'
import 'ant-design-vue/lib/button/style/index.less'
import 'ant-design-vue/lib/menu/style/index.less'
import { createIntersectionObserver } from '~/plugins/lib-observer'

let prevRatio = 1
const increasingColor = 'rgba(255, 255, 255, ratio)'
const currentRoute = useRoute();
const handleIntersect = (entries: IntersectionObserverEntry[], targetElement: HTMLElement) => {
  requestAnimationFrame(() => {
    entries.forEach((entry) => {
      const subRatio = prevRatio - entry.intersectionRatio
      const ratio = (subRatio >= 0.35 ? 0.35 : subRatio) / 0.35
      targetElement.style.backgroundColor = increasingColor.replace('ratio', ratio + '')
      targetElement.style.boxShadow = `0px 1px 5px rgba(0, 0, 0, ${ratio * 0.19})`
    })
  })
}

const visible = ref(false)

onMounted(() => {
  createIntersectionObserver({
    observerTargetId: '#app',
    targetId: '#home-header-fixed',
    rootMargin: '0px',
    handleIntersect
  })
})

const current = ref<string[]>(['index'])

watch(() => currentRoute.name, (v) => {
  if (v && typeof v === 'string')  {
    if (v.indexOf('news-details') > -1) {
      current.value = ['news']
    } else {
      current.value = [v]
    }
  }
}, { immediate: true })
</script>

<template>
  <nav id="home-header-fixed" class="header">
    <nav class="custom-main-container h100 f-r-s-c">
      <a href="/">
        <img class="logo cursor-p" src="/img/header-logo.png">
      </a>
      <Menu v-model:selectedKeys="current" class="f-n header-menu" mode="horizontal">
        <Menu.Item key="index">
          <a href="/">首页</a>
        </Menu.Item>
        <Menu.Item key="about">
          <a href="/about">关于我们</a>
        </Menu.Item>
      </Menu>
      <div class="f-1" />
      <Button class="concat-us-button" type="primary" @click="visible = true">
        联系我们
      </Button>
    </nav>
  </nav>
  <ContactUsModal v-if="visible" v-model:visible="visible" @cancel="visible = false"></ContactUsModal>
</template>
<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 1000;
  height: 80Px;
  width: 100%;
  .logo {
    margin-right: 166px;
  }
  &-menu {
    border-bottom-color: transparent;
    background-color: transparent;
  }
  .concat-us-button {
    background: #0252FB;
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.04), 0px 1px 4px 0px rgba(0,0,0,0.06);
    border: 1px solid #0252FB;
  }
  .concat-us-button:hover {
    background: rgba(2, 82, 251, .8) !important;
    border: 1px solid rgba(2, 82, 251, .8) !important;
  }
}
</style>
