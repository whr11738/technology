import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/(*)",
    redirect: "/",
  },
  {
    path: "",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 切换路由页面到最上面
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
