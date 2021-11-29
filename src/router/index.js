import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/views/home/HomePage";
import TopCategoryPage from "@/views/category/TopCategoryPage";
import SubCategoryPage from "@/views/category/SubCategoryPage";
import GoodsDetailPage from "@/views/goods/GoodsDetailPage";
// const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage");

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  { path: "/category/:id", component: TopCategoryPage },
  { path: "/category/sub/:id", component: SubCategoryPage },
  { path: "/goods/:id", component: GoodsDetailPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

export default router;
