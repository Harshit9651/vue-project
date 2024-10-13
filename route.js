import { createWebHistory, createRouter } from "vue-router";
import ImagePage from "@/components/ImagePage.vue";

const routes = [
  {
    name: "ImagePage",
    component: ImagePage,
    path: "/Image",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
