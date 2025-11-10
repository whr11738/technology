# 混淆

obfuscate_js 处理 src 下所有的 js 文件
obfuscate_vue 处理 src/views 下子目录的 vue 文件，更深的不处理,有 props 相关的代码会导致混淆报错

#### 安装

npm i javascript-obfuscator -d -s

```
// package.json
"scripts": {
  "hx": "node obfuscate_vue.js && node obfuscate_js.js",
},
```

#### 使用

npm run hx

#### 混淆方案

src/views 中弄一个真 views 也就是代码全在 src/views/views 中，混淆其中 vue 代码，src/views 下随便放别的项目的代码以混淆视线
