import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // Vite路径别名配置
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    port: "8888", // 指定开发服务器端口，如果端口已经被使用就会加一
    host: true, // 指定服务器监听 IP 地址
    open: true, // 开发服务器启动时，自动在浏览器中打开
  },
});
