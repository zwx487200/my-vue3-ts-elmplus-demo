import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import HeadFileUpload from "@/components/HeadFileUpload.vue";
import BasicLineChart from "@/components/BasicLineChart.vue";
import BasicBarChart from "@/components/BasicBarChart.vue";
import BasicPieChart from "@/components/BasicPieChart.vue";
import BasicRingChart from "@/components/BasicRingChart.vue";
import ChildComponent from "@/components/ChildComponent.vue";


const app = createApp(App);
app.component("HeadFileUpload", HeadFileUpload);
app.component("BasicLineChart", BasicLineChart);
app.component("BasicBarChart", BasicBarChart);
app.component("BasicPieChart", BasicPieChart);
app.component("BasicRingChart", BasicRingChart);
app.component("ChildComponent", ChildComponent);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store).use(router).use(ElementPlus).mount("#app");
