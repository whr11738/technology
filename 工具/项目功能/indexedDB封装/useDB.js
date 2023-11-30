// 数据库使用
import { save, read } from "./db";

// 存
await save("1", { name: "object" });

// 取
const { value } = await read("1");
console.log(value);
