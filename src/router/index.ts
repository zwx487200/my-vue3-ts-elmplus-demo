import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserInfoView from "../views/UserInfoView.vue";


const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: HomeView, },
  { path: "/about", name: "about", component: AboutView, },
  { path: "/login", name: "login", component: LoginView, },
  { path: "/register", name: "register", component: RegisterView, },
  { path: "/userInfo", name: "userInfo", component: UserInfoView, },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
