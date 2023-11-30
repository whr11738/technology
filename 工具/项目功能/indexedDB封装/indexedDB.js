// IndexedBD 类封装
class IndexedBD {
  constructor(name, store, config, version) {
    // 兼容处理
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    this.databaseName = name;
    this.databaseVersion = version || 1;
    this.openProm = this.open(name, store, config, version);
  }

  initRequest(name = this.databaseName, version = this.databaseVersion) {
    const request = this.indexedDB.open(name, version);
    this.request = request;
    return request;
  }
  // 打开数据库
  async open(name, store, config, version) {
    return new Promise((resolve, reject) => {
      const request = this.initRequest(name, version);

      // 数据仓库升级事件(第一次新建库是也会触发，因为数据仓库从无到有算是升级了一次)
      request.addEventListener("upgradeneeded", (e) => {
        const database = e.target.result;
        this.store = database.createObjectStore(store, config); // 创建数据仓库
      });
      // 打开数据库成功
      request.addEventListener("success", (e) => {
        this.db = e.target.result;
        resolve({ result: e.target.result, request });
      });
      // 打开数据库失败
      request.addEventListener("error", (e) => {
        reject(e);
      });
    });
  }

  // 新建事务
  transaction(name, auth = "readwrite") {
    return this.db.transaction([name], auth);
  }
  // 方法封装
  method(method, store, value) {
    return new Promise((resolve, reject) => {
      this.openProm.then(() => {
        const tx = this.transaction(store);
        const storeObject = tx.objectStore(store);
        const requestResult = storeObject[method](value);
        requestResult.addEventListener("success", (e) => {
          resolve(e);
        });
        requestResult.addEventListener("error", (e) => {
          reject(e);
        });
      });
    });
  }
  // 读取数据
  async get(store, value) {
    return this.method("get", store, value);
  }
  // 添加数据
  async add(store, value) {
    return this.method("add", store, value);
  }
  // 删除数据
  async del(store, value) {
    return this.method("delete", store, value);
  }
  // 更新数据
  async put(store, value) {
    return this.method("add", store, value);
  }
}

export default IndexedBD;
