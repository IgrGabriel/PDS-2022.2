import { createRouter, createWebHistory } from "vue-router";

function lazyLoad(view) {
  return () => import(`./views/${view}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: lazyLoad("Home"),
  },
  {
    path: "/historico",
    name: "Historico",
    component: lazyLoad("Historico"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: lazyLoad("NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
