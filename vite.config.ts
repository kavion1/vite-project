import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  optimizeDeps: {
    include: ['particles.js']
  },
  server: {
    proxy: {
      // 接口地址代理
      '/apis': {
        target: 'https://www.fastmock.site/mock/97a65e642d057a4f41d4eda6b3b6d757/login', // 接口的域名
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace(/^\/apis/, "")
      },
    }

  }
})
