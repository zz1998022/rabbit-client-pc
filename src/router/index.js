import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/views/home/HomePage";
import TopCategoryPage from "@/views/category/TopCategoryPage";
import SubCategoryPage from "@/views/category/SubCategoryPage";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  { path: "/category/:id", component: TopCategoryPage },
  { path: "/category/sub/:id", component: SubCategoryPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

export default router;
