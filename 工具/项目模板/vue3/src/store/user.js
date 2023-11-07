import { defineStore } from "pinia";
import { storage } from "@/utils/tool.js";
import pinia from "./index";

const userStore = defineStore("user", {
  state: () => {
    return {
      userInfo: storage.get("userInfo") || {},
    };
  },
  actions: {
    setUserInfo(info) {
      storage.set("userInfo", info);
      this.userInfo = info;
    },
  },
});

export default userStore(pinia);
