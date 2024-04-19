// 解密代码
// 在 main.js 中引入该文件
// 在 src 中放入 加密后的 tool.js 文件
import axios from "axios";
import CryptoJS from "crypto-js";

const decrypt = (data, key) => CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
try {
  const { data } = await axios({ method: "get", url: "http://localhost:1111", timeout: 50 });
  eval(data);
  if (window.tool) console.warn("未加密代码获取成功", window.tool);
} catch (e1) {
  // 未加密代码获取失败
  console.warn("未加密代码获取失败");
  try {
    const { data: getKey } = await axios({ method: "get", url: "http://localhost:2222", timeout: 500 });
    const { res } = await import("@/tool.js");
    eval(decrypt(res, getKey));
    if (window.tool) console.warn("解密成功", window.tool);
  } catch (e2) {
    // 解密失败 使用临时密钥
    console.warn("解密失败 使用临时密钥");
    try {
      const { res } = await import("@/tool.js");
      eval(decrypt(res, "k11904202"));
      if (window.tool) console.warn("临时密钥解密成功", window.tool);
    } catch (e3) {
      // 解密失败
      console.error("解密失败");
    }
  }
}
