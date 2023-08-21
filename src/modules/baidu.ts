import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient && import.meta.env.MODE === 'production') {
    router.afterEach((to) => {
      (window as any)._hmt = (window as any)._hmt || [];
      (window as any)._hmt.push(['_trackPageview', to.fullPath])
    })
  }
}
