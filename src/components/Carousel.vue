<script lang="ts" setup>
import { useSlots, ref, computed, toRefs, watch, onUnmounted } from 'vue'
import { Button } from 'ant-design-vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

interface Props {
  value?: number;
  marginRange?: number
  autoplay?: boolean
  interval?: number
}

const prop = withDefaults(defineProps<Props>(), {
  marginRange: 151,
  autoplay: false,
  interval: 3000
})

const emit = defineEmits<{
  (e: 'change', value: number): void
}>()

const { marginRange, autoplay, value } = toRefs(prop)

let timer: number | NodeJS.Timeout

const slots = useSlots()

const childrenS = (slots as any).default()

const activeValue = ref<number>(0)

const setAutoPlay = () => {
  timer = setInterval(() => {
    const nextValue = activeValue.value + 1
    if (nextValue >= childrenS.length) {
      activeValue.value = 0
    } else {
      activeValue.value = nextValue
    }
  }, prop.interval)
}

watch(
  () => activeValue.value,
  (v) => {
    emit('change', v)
  }
)

watch(
  () => value?.value,
  (v) => {
    if (typeof v !== 'undefined' && v > -1) {
      activeValue.value = v
    }
  }
)

watch(
  () => autoplay.value,
  (v) => {
    v && setAutoPlay()
    !v && timer && clearInterval(timer)
  },
  { immediate: true }
)

const nMarginRange = computed(() => {
  return `-${marginRange.value}px`
})
const zMarginRange = computed(() => {
  return `${marginRange.value}px`
})

const prevValue = computed(() => {
  if (childrenS.length < 3) {
    return -1
  }
  if (activeValue.value === 0) {
    return childrenS.length - 1
  }

  return activeValue.value - 1
})

const nextValue = computed(() => {
  if (childrenS.length < 3) {
    return -1
  }
  if (activeValue.value + 1 >= childrenS.length) {
    return 0
  }
  return activeValue.value + 1
})

const toPrev = () => {
  const value = activeValue.value - 1
  if (value < 0) {
    activeValue.value = childrenS.length - 1
  } else {
    activeValue.value = value
  }
}

const toNext = () => {
  const value = activeValue.value + 1
  if (value >= childrenS.length) {
    activeValue.value = 0
  } else {
    activeValue.value = value
  }
}

onUnmounted(() => {
  timer && clearInterval(timer)
})
</script>

<template>
  <ul class="relative carousel">
    <li v-for="(child, index) in childrenS" :key="index" :class="{
      'carousel-item': true,
      'absolute': true,
      'inset-0': true,
      'is-active': index === activeValue,
      'is-prev': index === prevValue,
      'is-next': index === nextValue
    }">
      <component :is="child" />
      <div v-show="index !== activeValue" class="carousel-item-mask absolute inset-0"></div>
    </li>
    <slot name="arrow">
      <Button class="arrow arrow--left absolute inset-t-1/2 -translate-y-1/2" shape="circle" @click="toPrev">
        <template #icon><LeftOutlined /></template>
      </Button>
      <Button class="arrow arrow--right absolute inset-t-1/2 -translate-y-1/2" shape="circle" @click="toNext">
        <template #icon><RightOutlined /></template>
      </Button>
    </slot>
  </ul>
</template>

<style lang="less" scoped>
.carousel {
  .carousel-item {
    cursor: pointer;
    z-index: -1;
    opacity: 0;
    transition: transform .4s ease-in-out;
    transform: translateX(v-bind(nMarginRange)) scale(0.73);
    .carousel-item-mask {
      background: rgba(0,0,0,0.2);
    }
  }
  .is-prev {
    opacity: 1;
    transform: translateX(v-bind(nMarginRange)) scale(0.73);
    z-index: 0;
  }
  .is-active {
    opacity: 1;
    z-index: 1;
    transform: translateX(0px) scale(1);
  }
  .is-next {
    opacity: 1;
    z-index: 0;
    transform: translateX(v-bind(zMarginRange)) scale(0.73);
  }
  .arrow {
    color: rgba(255,255,255);
    background: rgba(31, 45, 61, 0.21);
    border-color: rgba(0,0,0,0);
  }
  .arrow:hover {
    background: rgba(31, 45, 61, 0.41);
    border-color: rgba(0,0,0,0);
  }
  .arrow--left {
    left: v-bind(nMarginRange);
  }
  .arrow--right {
    right: v-bind(nMarginRange);
  }
}
</style>
