// 轻量级模糊搜索

/* 安装
npm i fuse.js
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"></script>
*/

/*
// includeScore-包含匹配分数
// keys-进行搜索的对象key
// threshold-设置匹配的阈值（0-1，越低越精确）
// */

// 过滤对象数组，将对象中的key属性的值与str模糊匹配以过滤对象
export const fuseFilerArr = (arr, str, key) => new Fuse(arr, { includeScore: true, keys: [key], threshold: 0.4 }).search(str);

// 参考资料：http://fusejs.io
