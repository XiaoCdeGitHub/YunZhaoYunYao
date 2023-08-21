// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/vite@4.3.5(@types+node@20.2.5)(less@4.1.3)(terser@5.19.2)/node_modules/vite/dist/node/index.js";
import Vue from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3(vite@4.3.5)(vue@3.3.2)/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/vite-plugin-pages@0.29.0(vite@4.3.5)/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/vite-ssg-sitemap@0.5.1/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/vite-plugin-vue-layouts@0.8.0(vite@4.3.5)(vue-router@4.2.0)(vue@3.3.2)/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/unplugin-vue-components@0.24.1(rollup@2.79.1)(vue@3.3.2)/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/unplugin-auto-import@0.15.3(@vueuse+core@10.1.2)(rollup@2.79.1)/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/vite-plugin-vue-markdown@0.23.4(rollup@2.79.1)(vite@4.3.5)/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import VueI18n from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/@intlify+unplugin-vue-i18n@0.11.0(rollup@2.79.1)(vue-i18n@9.2.2)/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import LinkAttributes from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import Shiki from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/markdown-it-shiki@0.9.0/node_modules/markdown-it-shiki/dist/index.mjs";
import copy from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/rollup-plugin-copy@3.4.0/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
import VueMacros from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/unplugin-vue-macros@2.1.6(@vueuse+core@10.1.2)(rollup@2.79.1)(vite@4.3.5)(vue@3.3.2)/node_modules/unplugin-vue-macros/dist/vite.mjs";
import WebfontDownload from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/vite-plugin-webfont-dl@3.7.4(vite@4.3.5)/node_modules/vite-plugin-webfont-dl/dist/index.mjs";
import legacy from "file:///E:/Yeez/yeez-website/node_modules/.pnpm/@vitejs+plugin-legacy@4.1.1(terser@5.19.2)(vite@4.3.5)/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\Yeez\\yeez-website";
var vite_config_default = defineConfig(({ mode }) => {
  console.log(process.env.NODE_ENV);
  console.log(mode);
  return {
    server: {
      host: "0.0.0.0",
      proxy: {
        "/send": {
          target: "https://test.yeez.tech/api",
          changeOrigin: true
        }
      }
    },
    base: mode === "test" ? "https://cdn-test.yeez.tech/test/" : mode === "production" ? "https://cdn.yeez.tech/" : "/",
    resolve: {
      alias: {
        "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
      }
    },
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/]
          })
        }
      }),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ["vue", "md"]
      }),
      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "vue-i18n",
          "@vueuse/head",
          "@vueuse/core"
        ],
        dts: "src/auto-imports.d.ts",
        dirs: [
          "src/composables",
          "src/stores"
        ],
        vueTemplate: true
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: "src/components.d.ts"
      }),
      // https://github.com/antfu/vite-plugin-vue-markdown
      // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
      Markdown({
        wrapperClasses: "prose prose-sm m-auto text-left",
        headEnabled: true,
        markdownItSetup(md) {
          md.use(Shiki, {
            theme: {
              light: "vitesse-light",
              dark: "vitesse-dark"
            }
          });
          md.use(LinkAttributes, {
            matcher: (link) => /^https?:\/\//.test(link),
            attrs: {
              target: "_blank",
              rel: "noopener"
            }
          });
        }
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
        include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
      }),
      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),
      legacy({
        targets: [
          "last 2 versions",
          "> 1%",
          "iOS 7",
          "last 3 iOS versions",
          "chrome > 77"
        ]
      }),
      copy({
        targets: [
          { src: "./node_modules/libpag/lib/libpag.wasm", dest: mode === "development" ? "public/" : "dist/static/" },
          { src: "./lib-previewimage-mobile.js", dest: mode === "development" ? "public/" : "dist/static/" }
        ],
        hook: mode === "production" ? "writeBundle" : "buildStart"
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "primary-color": "#0252FB;"
          },
          javascriptEnabled: true
        }
      }
    },
    // https://github.com/vitest-dev/vitest
    test: {
      include: ["test/**/*.test.ts"],
      environment: "jsdom",
      deps: {
        inline: ["@vue", "@vueuse", "vue-demi"]
      }
    },
    build: {
      assetsDir: "static"
    },
    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: "async",
      format: "cjs",
      formatting: "minify",
      crittersOptions: {
        reduceInlineStyles: false
      },
      onFinished() {
        generateSitemap({
          hostname: mode === "test" ? "https://test.yeez.tech/" : "https://yeez.tech/",
          readable: true
        });
      }
    },
    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ["workbox-window", /vue-i18n/]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxZZWV6XFxcXHllZXotd2Vic2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcWWVlelxcXFx5ZWV6LXdlYnNpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1llZXoveWVlei13ZWJzaXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xyXG5pbXBvcnQgZ2VuZXJhdGVTaXRlbWFwIGZyb20gJ3ZpdGUtc3NnLXNpdGVtYXAnXHJcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAndml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duJ1xyXG5pbXBvcnQgVnVlSTE4biBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJ1xyXG5pbXBvcnQgTGlua0F0dHJpYnV0ZXMgZnJvbSAnbWFya2Rvd24taXQtbGluay1hdHRyaWJ1dGVzJ1xyXG5pbXBvcnQgU2hpa2kgZnJvbSAnbWFya2Rvd24taXQtc2hpa2knXHJcbmltcG9ydCBjb3B5IGZyb20gJ3JvbGx1cC1wbHVnaW4tY29weSdcclxuXHJcbi8vIEB0cy1leHBlY3QtZXJyb3IgZmFpbGVkIHRvIHJlc29sdmUgdHlwZXNcclxuaW1wb3J0IFZ1ZU1hY3JvcyBmcm9tICd1bnBsdWdpbi12dWUtbWFjcm9zL3ZpdGUnXHJcblxyXG5pbXBvcnQgV2ViZm9udERvd25sb2FkIGZyb20gJ3ZpdGUtcGx1Z2luLXdlYmZvbnQtZGwnXHJcblxyXG5pbXBvcnQgbGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gIGNvbnNvbGUubG9nKHByb2Nlc3MuZW52Lk5PREVfRU5WKVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgY29uc29sZS5sb2cobW9kZSlcclxuICByZXR1cm4ge1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL3NlbmQnOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwczovL3Rlc3QueWVlei50ZWNoL2FwaScsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBiYXNlOiBtb2RlID09PSAndGVzdCcgPyAnaHR0cHM6Ly9jZG4tdGVzdC55ZWV6LnRlY2gvdGVzdC8nIDogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gJ2h0dHBzOi8vY2RuLnllZXoudGVjaC8nIDogJy8nLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBWdWVNYWNyb3Moe1xyXG4gICAgICAgIHBsdWdpbnM6IHtcclxuICAgICAgICAgIHZ1ZTogVnVlKHtcclxuICAgICAgICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcblxyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaGFubm9lcnUvdml0ZS1wbHVnaW4tcGFnZXNcclxuICAgICAgUGFnZXMoe1xyXG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0pvaG5DYW1waW9uSnIvdml0ZS1wbHVnaW4tdnVlLWxheW91dHNcclxuICAgICAgTGF5b3V0cygpLFxyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0XHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIGltcG9ydHM6IFtcclxuICAgICAgICAgICd2dWUnLFxyXG4gICAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgICAgJ3Z1ZS1pMThuJyxcclxuICAgICAgICAgICdAdnVldXNlL2hlYWQnLFxyXG4gICAgICAgICAgJ0B2dWV1c2UvY29yZScsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICAgIGRpcnM6IFtcclxuICAgICAgICAgICdzcmMvY29tcG9zYWJsZXMnLFxyXG4gICAgICAgICAgJ3NyYy9zdG9yZXMnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIC8vIGFsbG93IGF1dG8gbG9hZCBtYXJrZG93biBjb21wb25lbnRzIHVuZGVyIGAuL3NyYy9jb21wb25lbnRzL2BcclxuICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxyXG4gICAgICAgIC8vIGFsbG93IGF1dG8gaW1wb3J0IGFuZCByZWdpc3RlciBjb21wb25lbnRzIHVzZWQgaW4gbWFya2Rvd25cclxuICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxyXG4gICAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi12dWUtbWFya2Rvd25cclxuICAgICAgLy8gRG9uJ3QgbmVlZCB0aGlzPyBUcnkgdml0ZXNzZS1saXRlOiBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZXNzZS1saXRlXHJcbiAgICAgIE1hcmtkb3duKHtcclxuICAgICAgICB3cmFwcGVyQ2xhc3NlczogJ3Byb3NlIHByb3NlLXNtIG0tYXV0byB0ZXh0LWxlZnQnLFxyXG4gICAgICAgIGhlYWRFbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG1hcmtkb3duSXRTZXR1cChtZCkge1xyXG4gICAgICAgICAgLy8gaHR0cHM6Ly9wcmlzbWpzLmNvbS9cclxuICAgICAgICAgIG1kLnVzZShTaGlraSwge1xyXG4gICAgICAgICAgICB0aGVtZToge1xyXG4gICAgICAgICAgICAgIGxpZ2h0OiAndml0ZXNzZS1saWdodCcsXHJcbiAgICAgICAgICAgICAgZGFyazogJ3ZpdGVzc2UtZGFyaycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgbWQudXNlKExpbmtBdHRyaWJ1dGVzLCB7XHJcbiAgICAgICAgICAgIG1hdGNoZXI6IChsaW5rOiBzdHJpbmcpID0+IC9eaHR0cHM/OlxcL1xcLy8udGVzdChsaW5rKSxcclxuICAgICAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxyXG4gICAgICAgICAgICAgIHJlbDogJ25vb3BlbmVyJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcblxyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4tcHdhXHJcbiAgICAgIC8vIFZpdGVQV0Eoe1xyXG4gICAgICAvLyAgIHJlZ2lzdGVyVHlwZTogJ3Byb21wdCcsXHJcbiAgICAgIC8vICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLnN2ZycsICdzYWZhcmktcGlubmVkLXRhYi5zdmcnXSxcclxuICAgICAgLy8gICBtYW5pZmVzdDoge1xyXG4gICAgICAvLyAgICAgbmFtZTogJ1ZpdGVzc2UnLFxyXG4gICAgICAvLyAgICAgc2hvcnRfbmFtZTogJ1ZpdGVzc2UnLFxyXG4gICAgICAvLyAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgLy8gICAgIGljb25zOiBbXHJcbiAgICAgIC8vICAgICAgIHtcclxuICAgICAgLy8gICAgICAgICBzcmM6ICcvcHdhLTE5MngxOTIucG5nJyxcclxuICAgICAgLy8gICAgICAgICBzaXplczogJzE5MngxOTInLFxyXG4gICAgICAvLyAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAvLyAgICAgICB9LFxyXG4gICAgICAvLyAgICAgICB7XHJcbiAgICAgIC8vICAgICAgICAgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsXHJcbiAgICAgIC8vICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgLy8gICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgLy8gICAgICAgfSxcclxuICAgICAgLy8gICAgICAge1xyXG4gICAgICAvLyAgICAgICAgIHNyYzogJy9wd2EtNTEyeDUxMi5wbmcnLFxyXG4gICAgICAvLyAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgIC8vICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXHJcbiAgICAgIC8vICAgICAgICAgcHVycG9zZTogJ2FueSBtYXNrYWJsZScsXHJcbiAgICAgIC8vICAgICAgIH0sXHJcbiAgICAgIC8vICAgICBdLFxyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIH0pLFxyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ludGxpZnkvYnVuZGxlLXRvb2xzL3RyZWUvbWFpbi9wYWNrYWdlcy91bnBsdWdpbi12dWUtaTE4blxyXG4gICAgICBWdWVJMThuKHtcclxuICAgICAgICBydW50aW1lT25seTogdHJ1ZSxcclxuICAgICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXHJcbiAgICAgICAgZnVsbEluc3RhbGw6IHRydWUsXHJcbiAgICAgICAgaW5jbHVkZTogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsb2NhbGVzLyoqJyldLFxyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZWF0LWFnZW5jeS92aXRlLXBsdWdpbi13ZWJmb250LWRsXHJcbiAgICAgIFdlYmZvbnREb3dubG9hZCgpLFxyXG4gICAgICBsZWdhY3koe1xyXG4gICAgICAgIHRhcmdldHM6IFtcclxuICAgICAgICAgICdsYXN0IDIgdmVyc2lvbnMnLFxyXG4gICAgICAgICAgJz4gMSUnLFxyXG4gICAgICAgICAgJ2lPUyA3JyxcclxuICAgICAgICAgICdsYXN0IDMgaU9TIHZlcnNpb25zJyxcclxuICAgICAgICAgICdjaHJvbWUgPiA3NycsXHJcbiAgICAgICAgXSxcclxuICAgICAgfSksXHJcbiAgICAgIGNvcHkoe1xyXG4gICAgICAgIHRhcmdldHM6IFtcclxuICAgICAgICAgIHsgc3JjOiAnLi9ub2RlX21vZHVsZXMvbGlicGFnL2xpYi9saWJwYWcud2FzbScsIGRlc3Q6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcgPyAncHVibGljLycgOiAnZGlzdC9zdGF0aWMvJyB9LFxyXG4gICAgICAgICAgeyBzcmM6ICcuL2xpYi1wcmV2aWV3aW1hZ2UtbW9iaWxlLmpzJywgZGVzdDogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyA/ICdwdWJsaWMvJyA6ICdkaXN0L3N0YXRpYy8nIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBob29rOiBtb2RlID09PSAncHJvZHVjdGlvbicgPyAnd3JpdGVCdW5kbGUnIDogJ2J1aWxkU3RhcnQnLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcblxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBsZXNzOiB7XHJcbiAgICAgICAgICBtb2RpZnlWYXJzOiB7XHJcbiAgICAgICAgICAgICdwcmltYXJ5LWNvbG9yJzogJyMwMjUyRkI7JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdml0ZXN0LWRldi92aXRlc3RcclxuICAgIHRlc3Q6IHtcclxuICAgICAgaW5jbHVkZTogWyd0ZXN0LyoqLyoudGVzdC50cyddLFxyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgZGVwczoge1xyXG4gICAgICAgIGlubGluZTogWydAdnVlJywgJ0B2dWV1c2UnLCAndnVlLWRlbWknXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBhc3NldHNEaXI6ICdzdGF0aWMnLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1zc2dcclxuICAgIHNzZ09wdGlvbnM6IHtcclxuICAgICAgc2NyaXB0OiAnYXN5bmMnLFxyXG4gICAgICBmb3JtYXQ6ICdjanMnLFxyXG4gICAgICBmb3JtYXR0aW5nOiAnbWluaWZ5JyxcclxuICAgICAgY3JpdHRlcnNPcHRpb25zOiB7XHJcbiAgICAgICAgcmVkdWNlSW5saW5lU3R5bGVzOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgb25GaW5pc2hlZCgpIHtcclxuICAgICAgICBnZW5lcmF0ZVNpdGVtYXAoe1xyXG4gICAgICAgICAgaG9zdG5hbWU6IG1vZGUgPT09ICd0ZXN0JyA/ICdodHRwczovL3Rlc3QueWVlei50ZWNoLycgOiAnaHR0cHM6Ly95ZWV6LnRlY2gvJyxcclxuICAgICAgICAgIHJlYWRhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHNzcjoge1xyXG4gICAgICAvLyBUT0RPOiB3b3JrYXJvdW5kIHVudGlsIHRoZXkgc3VwcG9ydCBuYXRpdmUgRVNNXHJcbiAgICAgIG5vRXh0ZXJuYWw6IFsnd29ya2JveC13aW5kb3cnLCAvdnVlLWkxOG4vXSxcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9QLE9BQU8sVUFBVTtBQUNyUSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGNBQWM7QUFDckIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFHakIsT0FBTyxlQUFlO0FBRXRCLE9BQU8scUJBQXFCO0FBRTVCLE9BQU8sWUFBWTtBQW5CbkIsSUFBTSxtQ0FBbUM7QUFxQnpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFVBQVEsSUFBSSxRQUFRLElBQUksUUFBUTtBQUVoQyxVQUFRLElBQUksSUFBSTtB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
