import { acceptHMRUpdate, defineStore } from 'pinia'
import { isMobile } from '~/plugins/utils'

export const useConfigStore = defineStore('config', () => {
  const mobi = ref()

  const isMobi = computed(() => mobi.value)

  function setMobiStatus(v: boolean) {
    // eslint-disable-next-line no-console
    console.log('setMobiStatus', v)
    mobi.value = v
  }

  if (!import.meta.env.SSR) {
    const computedMobi = () => {
      if (isMobile())
        setMobiStatus(true)
      else
        setMobiStatus(false)
    }
    window.addEventListener('resize', computedMobi)
    computedMobi()
  }

  return {
    isMobi,
    setMobiStatus,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore as any, import.meta.hot))
