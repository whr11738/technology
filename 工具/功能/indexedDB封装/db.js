// 数据库初始化
import IndexedBD from "./indexedDB";

// database:数据库名
// table:表名
// key:密钥(键路径)

// 创建数据库
const initDB = () => new IndexedBD("database", "table", { keyPath: "key", autoIncrement: true }, 1);
const avatarDB = initDB();

// 存数据
export const save = async (key, value) => {
  let result = "";
  if (key && avatarDB.request) {
    const { target } = await avatarDB.get("table", key);
    if (target && target.result) {
      result = target.result;
    } else {
      result = await avatarDB.add("table", { key, value });
    }
  }
  return result;
};

// 取数据
export const read = async (key) => {
  const { target } = await avatarDB.get("table", key);
  if (target && target.result);
  return target.result;
};
