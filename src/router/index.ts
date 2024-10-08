import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserInfoView from "../views/UserInfoView.vue";
import TouristView from "../views/TouristView.vue";
import YinCaoDiFu from "../views/yinCaoDiFu.vue";
import ChengHuangMiao from "../views/chengHuangMiao.vue";
import huangquanlu from "../views/huangquanlu.vue";
import lunhui from "../views/lunhui.vue";
import naiheqiao from "../views/naiheqiao.vue";
import poqianshan from "../views/poqianshan.vue";
import shibacengdiyu from "../views/shibacengdiyu.vue";
import wangsicheng from "../views/wangsicheng.vue";
import wangxiangtai from "../views/wangxiangtai.vue";
import yanwangdian from "../views/yanwangdian.vue";
import characterInfo from "../views/CharacterInfo.vue";
import HeadFileUpload from "../views/HeadFileUpload.vue";
import FatherDemo from "../views/FatherDemo.vue";


const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: HomeView, },
  { path: "/about", name: "about", component: AboutView, },
  { path: "/login", name: "login", component: LoginView, },
  { path: "/register", name: "register", component: RegisterView, },
  { path: "/userInfo", name: "userInfo", component: UserInfoView, },
  { path: "/characterInfo/:id/:operate", name: "characterInfo", component: characterInfo, },
  { path: "/characterInfo/:operate", name: "addCharacterInfo", component: characterInfo, },
  { path: "/headFileUpload", name: "headFileUpload", component: HeadFileUpload, },
  { path: "/FatherDemo", name: "fatherDemo", component: FatherDemo },
  {
    path: "/tourist",
    name: "tourist",
    component: TouristView,
    children:
      [
        {
          path: "/1",
          name: "YinCaoDiFu",
          component: YinCaoDiFu,
          meta: {
            title: "YinCaoDiFu"
          }
        },
        {
          path: "/2",
          name: "ChengHuangMiao",
          component: ChengHuangMiao,
          meta: {
            title: "ChengHuangMiao"
          }
        },
        {
          path: "/3",
          name: "naiheqiao",
          component: naiheqiao,
          meta: {
            title: "naiheqiao"
          }
        },
        {
          path: "/4",
          name: "yanwangdian",
          component: yanwangdian,
          meta: {
            title: "yanwangdian"
          }
        },
        {
          path: "/5",
          name: "shibacengdiyu",
          component: shibacengdiyu,
          meta: {
            title: "shibacengdiyu"
          }
        },
        {
          path: "/6",
          name: "wangsicheng",
          component: wangsicheng,
          meta: {
            title: "wangsicheng"
          }
        },
        {
          path: "/7",
          name: "huangquanlu",
          component: huangquanlu,
          meta: {
            title: "huangquanlu"
          }
        },
        {
          path: "/8",
          name: "lunhui",
          component: lunhui,
          meta: {
            title: "lunhui"
          }
        },
        {
          path: "/9",
          name: "poqianshan",
          component: poqianshan,
          meta: {
            title: "poqianshan"
          }
        },
        {
          path: "/10",
          name: "wangxiangtai",
          component: wangxiangtai,
          meta: {
            title: "wangxiangtai"
          }
        },


      ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
