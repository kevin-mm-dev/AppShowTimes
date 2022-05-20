import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    alias: "/movies",
    name: "movies",
    component: () => import("../components/MovieList.vue"),
  },
  {
    path: "/movies/new",
    alias: "/movies/new",
    name: "movie-new",
    component: () => import("../components/MovieForm.vue"),
  },
  {
    path: "/movies/:id",
    alias: "/movies/:id",
    name: "movie-details",
    component: () => import("../components/MovieDetail.vue"),
  },
];

// console.log(process.env.BASE_URL);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;