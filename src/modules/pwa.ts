// import { type UserModule } from '~/types'

// // https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
// export const install: UserModule = ({ isClient, router }) => {
//   if (!isClient)
//     return

//   router.isReady()
//     .then(async () => {
//       const { registerSW } = await import('virtual:pwa-register')
//       // eslint-disable-next-line no-console
//       console.log('init registerSW')
//       registerSW({ immediate: true })
//     })
//     .catch((e) => {
//       console.error(e)
//     })
// }

export function install() {}
