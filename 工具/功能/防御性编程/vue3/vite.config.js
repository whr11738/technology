import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  build: {
    outDir: "./dist",
    sourcemap: true, // 编译后的文件是否生成对应的 map 文件(用于生产环境确定bug位置)
  },
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
  esbuild: {
    pure: ["console.log"], // 移除console.log
  },
});
