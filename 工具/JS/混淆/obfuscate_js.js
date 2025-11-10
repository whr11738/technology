// obfuscate-src.js
const { obfuscate } = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const obfuscatorOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  rotateStringArray: true,
  selfDefending: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  target: 'browser',
  transformObjectKeys: false,
  unicodeEscapeSequence: false,

  // 关键：保留所有路径别名和Vue相关标识符
  reservedNames: ['import', 'meta', 'env', 'require', 'exports', 'module', 'Vue', 'createApp', 'defineComponent', 'router', 'route', 'store'],
  reservedStrings: ['@/', '@/views/', '@/components/', '@/utils/', '@/assets/', '@/api/', 'home.vue', 'import.meta.env', '.vue'],
};

// 检查文件内容，决定混淆强度
function getObfuscationOptions(filePath, code) {
  // 如果文件包含路径引用或Vue组件，使用更宽松的配置
  const hasPathReferences = code.includes('@/') || code.includes('.vue') || code.includes('import.meta.env');

  if (hasPathReferences) {
    console.log(`检测到路径引用，对文件 ${filePath} 使用宽松混淆配置`);
    return {
      ...obfuscatorOptions,
      controlFlowFlattening: false, // 关闭控制流扁平化
      identifierNamesGenerator: 'mangled', // 使用温和的变量名混淆
      stringArray: false, // 关闭字符串数组
      transformObjectKeys: false,
      reservedNames: [...obfuscatorOptions.reservedNames, 'resolve', 'component', 'path', 'name'],
    };
  }

  return obfuscatorOptions;
}

function processDirectory(directoryPath) {
  const items = fs.readdirSync(directoryPath);

  items.forEach((item) => {
    const fullPath = path.join(directoryPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (path.extname(item) === '.js') {
      console.log(`处理文件: ${fullPath}`);
      try {
        const code = fs.readFileSync(fullPath, 'utf8');

        // 跳过路由文件和主入口文件（它们通常包含路径解析逻辑）
        if (fullPath.includes('router') || fullPath.includes('route') || item === 'main.js' || item === 'app.js') {
          console.log(`跳过重要配置文件: ${fullPath}`);
          return;
        }

        const fileSpecificOptions = getObfuscationOptions(fullPath, code);
        const obfuscatedResult = obfuscate(code, fileSpecificOptions);
        const obfuscatedCode = obfuscatedResult.getObfuscatedCode();
        fs.writeFileSync(fullPath, obfuscatedCode, 'utf8');
        console.log(`✓ 文件已混淆: ${fullPath}`);
      } catch (error) {
        console.error(`✗ 处理文件失败 [${fullPath}]: ${error.message}`);
      }
    }
  });
}

const srcDirectory = path.join(__dirname, 'src');
if (fs.existsSync(srcDirectory)) {
  console.log('开始混淆 src 目录下的 JS 文件...');
  processDirectory(srcDirectory);
  console.log('所有文件处理完成。');
} else {
  console.error('错误: 未找到 src 目录。');
}
