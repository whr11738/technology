import { defineStore } from "pinia";

const store = defineStore("user", {
  state: () => {
    return {
      userInfo: {
        token: "",
        activate: false,
      },
    };
  },
  getters: {
    noActivate: (state) => !state.userInfo.activate,
  },
  actions: {
    setToken(v) {
      this.userInfo.token = v;
    },
    setActivate(v) {
      this.userInfo.activate = v;
    },
  },
});

export default store();
