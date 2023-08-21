import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'
import copy from 'rollup-plugin-copy'

// @ts-expect-error failed to resolve types
import VueMacros from 'unplugin-vue-macros/vite'

import WebfontDownload from 'vite-plugin-webfont-dl'

import legacy from '@vitejs/plugin-legacy'

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-console
  console.log(process.env.NODE_ENV)
  // eslint-disable-next-line no-console
  console.log(mode)
  return {
    server: {
      host: '0.0.0.0',
      proxy: {
        '/send': {
          target: 'https://test.yeez.tech/api',
          changeOrigin: true,
        },
      },
    },
    base: mode === 'test' ? 'https://cdn-test.yeez.tech/test/' : mode === 'production' ? 'https://cdn.yeez.tech/' : '/',
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
      }),

      // https://github.com/antfu/vite-plugin-vue-markdown
      // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        markdownItSetup(md) {
          // https://prismjs.com/
          md.use(Shiki, {
            theme: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }),

      // https://github.com/antfu/vite-plugin-pwa
      // VitePWA({
      //   registerType: 'prompt',
      //   includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      //   manifest: {
      //     name: 'Vitesse',
      //     short_name: 'Vitesse',
      //     theme_color: '#ffffff',
      //     icons: [
      //       {
      //         src: '/pwa-192x192.png',
      //         sizes: '192x192',
      //         type: 'image/png',
      //       },
      //       {
      //         src: '/pwa-512x512.png',
      //         sizes: '512x512',
      //         type: 'image/png',
      //       },
      //       {
      //         src: '/pwa-512x512.png',
      //         sizes: '512x512',
      //         type: 'image/png',
      //         purpose: 'any maskable',
      //       },
      //     ],
      //   },
      // }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),
      legacy({
        targets: [
          'last 2 versions',
          '> 1%',
          'iOS 7',
          'last 3 iOS versions',
          'chrome > 77',
        ],
      }),
      copy({
        targets: [
          { src: './node_modules/libpag/lib/libpag.wasm', dest: mode === 'development' ? 'public/' : 'dist/static/' },
          { src: './lib-previewimage-mobile.js', dest: mode === 'development' ? 'public/' : 'dist/static/' },
        ],
        hook: mode === 'production' ? 'writeBundle' : 'buildStart',
      }),
    ],

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#0252FB;',
          },
          javascriptEnabled: true,
        },
      },
    },

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },
    build: {
      assetsDir: 'static',
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      format: 'cjs',
      formatting: 'minify',
      crittersOptions: {
        reduceInlineStyles: false,
      },
      onFinished() {
        generateSitemap({
          hostname: mode === 'test' ? 'https://test.yeez.tech/' : 'https://yeez.tech/',
          readable: true,
        })
      },
    },

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window', /vue-i18n/],
    },
  }
})
