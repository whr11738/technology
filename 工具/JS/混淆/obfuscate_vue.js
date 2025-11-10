const fs = require('fs');
const path = require('path');
const { parse } = require('@vue/compiler-sfc');
const { obfuscate } = require('javascript-obfuscator');

// 要扫描的目录，通常是 src/views
const VUE_SRC_DIR = path.resolve(__dirname, 'src/views');

// 获取 src/views 下每个子文件夹中的 Vue 文件（不递归更深层）
function getVueFiles(dir) {
  const fileList = [];

  try {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      // 只处理第一层子目录
      if (stat.isDirectory()) {
        const subItems = fs.readdirSync(fullPath);

        subItems.forEach((subItem) => {
          const subFullPath = path.join(fullPath, subItem);
          const subStat = fs.statSync(subFullPath);

          // 只处理 Vue 文件，不处理子目录
          if (!subStat.isDirectory() && path.extname(subItem) === '.vue') {
            fileList.push(subFullPath);
          }
        });
      }
    });

    return fileList;
  } catch (err) {
    console.error(`❌ 读取目录失败: ${dir}`, err.message);
    return [];
  }
}

// 混淆单个 Vue 文件
function obfuscateVueFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { descriptor } = parse(content);

    let scriptContent = '';
    let isScriptSetup = false;

    // 优先处理 <script setup>
    if (descriptor.scriptSetup) {
      scriptContent = descriptor.scriptSetup.content;
      isScriptSetup = true;
    }
    // 如果没有 scriptSetup，再尝试处理普通 <script>
    else if (descriptor.script) {
      scriptContent = descriptor.script.content;
      isScriptSetup = false;
    }
    // 如果两者都没有，跳过该文件
    else {
      console.log(`⚠️  无 <script> 或 <script setup>，跳过: ${filePath}`);
      return;
    }

    const obfuscatedCode = obfuscate(scriptContent, {
      compact: false,
      controlFlowFlattening: false, // 建议关闭，避免破坏 Vue 响应式
      stringArray: true,
      identifierNamesGenerator: 'hexadecimal',
      renameGlobals: false, // 建议关闭，避免混淆全局变量
      selfDefending: false, // 建议关闭，避免格式错乱
      reservedNames: [
        'ref',
        'reactive',
        'computed',
        'watch',
        'watchEffect',
        'defineProps',
        'defineEmits',
        'defineExpose',
        'withDefaults',
        'onMounted',
        'onUpdated',
        'onUnmounted',
        'onBeforeMount',
        'onBeforeUpdate',
        'onBeforeUnmount',
        'nextTick',
        'getCurrentInstance',
        'inject',
        'provide',
        'shallowRef',
        'shallowReactive',
        'toRef',
        'toRefs',
        'isRef',
        'isReactive',
        'isReadonly',
        'isProxy',
        'unref',
        'toRaw',
        'markRaw',
        'readonly',
        'shallowReadonly',
      ], // 保护 Vue API 不被混淆
    }).getObfuscatedCode();

    // 构建新的 <script> 或 <script setup> 标签内容
    let newScriptTag;
    if (isScriptSetup) {
      newScriptTag = `<script setup>
${obfuscatedCode}
</script>`;
    } else {
      newScriptTag = `<script>
${obfuscatedCode}
</script>`;
    }

    // 替换原内容中的 <script> 或 <script setup> 部分
    let newContent = content;

    if (isScriptSetup) {
      newContent = newContent.replace(/<script\s+setup\b[^>]*>([\s\S]*?)<\/script>/i, newScriptTag);
    } else {
      newContent = newContent.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/i, newScriptTag);
    }

    // 写回文件（直接覆盖原 vue 文件）
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ 已混淆: ${filePath} (${isScriptSetup ? 'script-setup' : 'script'})`);
  } catch (err) {
    console.error(`❌ 混淆失败: ${filePath}`, err.message);
  }
}

// 主函数
function main() {
  const vueFiles = getVueFiles(VUE_SRC_DIR);
  console.log(`🔍 找到 ${vueFiles.length} 个 .vue 文件，开始混淆...\n`);

  vueFiles.forEach((file) => {
    obfuscateVueFile(file);
  });

  console.log('\n🎉 Vue 文件混淆完成！');
  console.log('📁 仅处理了 src/views 下第一层子目录中的 .vue 文件');
}

main();
