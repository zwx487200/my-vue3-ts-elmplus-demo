import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import HeadFileUpload from "@/components/HeadFileUpload.vue";
import ChildDemo from "@/components/ChildDemo.vue";


const app = createApp(App);
app.component("HeadFileUpload", HeadFileUpload);
app.component("ChildDemo", ChildDemo);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store).use(router).use(ElementPlus).mount("#app");
