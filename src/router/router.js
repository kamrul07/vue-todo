import { createRouter, createWebHistory } from "vue-router";
import dashboard from "../components/dashboard.vue";
import logins from "../components/login.vue";
import todo from "../components/todo.vue";
import { authData } from "../data/data";
const routes = [
  {
    path: "/",
    component: dashboard,
    name: "home",
    meta: { isProtected: true },
  },
  {
    path: "/todo",
    component: todo,
    name: "todo",
    meta: { isProtected: true },
  },
  { path: "/login", component: logins, name: "login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = authData();
  if (to.meta.isProtected && !auth.isauthenticate) {
    next("/login");
  } else {
    next();
  }
});

export default router;
