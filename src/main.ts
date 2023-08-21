import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import './styles/main.less'
import './plugins/lib-flexible'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: '/',
    scrollBehavior() {
    // 始终滚动到顶部
      return { top: 0 }
    },
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
  },
)
