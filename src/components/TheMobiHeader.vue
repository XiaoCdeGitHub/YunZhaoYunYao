<script lang="ts" setup>
import { MenuOutlined } from '@ant-design/icons-vue'
import 'ant-design-vue/lib/drawer/style/index.less'
import 'ant-design-vue/lib/button/style/index.less'
import { Drawer } from 'ant-design-vue'
import { useRoute } from 'vue-router';

const visible = ref(false)

const onClose = () => {
  visible.value = false;
}

interface INav {
  text: string
  href: string
}
const navItems: INav[] = [
  {
    text: "首页",
    href: "/"
  }, {
    text: "关于我们",
    href: "/about"
  }
]
// const paths :Array<string> =['/',"/core-technology","/products","/news","/about"]


const route = useRoute();
console.log(route.path); // 当前页面的路径
let path = route.path;
// console.log(navItems.findIndex(item=>item.href === path));
let pathIndex = navItems.findIndex(item => item.href === path)
const currentIndex = ref(pathIndex)
function liClick(index: number): void {
  console.log(index);
  console.log(currentIndex.value);
  currentIndex.value = index
}
</script>

<template>
  <nav class="header">
    <div class="header-logo"> <a href="/">
        <img class="logo"
          src="https://cd-mapbed.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230821104110.jpg">
      </a></div>
    <MenuOutlined class="more" @click="visible = true"></MenuOutlined>
  </nav>

  <Drawer :title="null" :placement="'top'" :visible="visible" :bodyStyle="{ padding: 0, height: '100%' }" @close="onClose"
    ClassName="my-drawer" class="mobi-header">
    <ul class="page-items">
      <a :class="{ active: index === currentIndex }" class="page-item" @click="liClick(index)"
        v-for="(item, index) in navItems" :href="item.href">
        {{ item.text }}
      </a>
    </ul>
    <template #footer>
    </template>
  </Drawer>
</template>
<style lang="less" scoped>
:global(.mobi-header .ant-drawer-content-wrapper) {

  height: 9rem !important;

}

.active {
  color: #1677FF !important;
}

.header {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1000;
  width: 100%;
  background-color: #ffffff;
  height: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  .header-logo {
    overflow: hidden;
    padding-left: .5rem;

    .logo {
      width: 100%;

    }
  }


  .more {
    font-size: 0.64rem;
    margin-right: 0.5rem;
  }
}

.custom-button {
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

}

.page-items {
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  flex-direction: column;
}

.page-item {
  width: 100%;
  height: 1.27888888rem;
  padding: 0.346667rem 0.533333rem;
  color: #000000;
  font-size: 0.373333rem;

  /* 14px */
  a {
    color: #000000;
  }
}

// .page-item:hover {
//   background-color: #e6f7ff;

// }
</style>
