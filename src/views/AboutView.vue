<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu default-active="2" class="el-menu-vertical-demo, menuclass" @open="handleOpen"  @close="handleClose">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location/></el-icon>
                  <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">first 1</el-menu-item>
                  <el-menu-item index="1-2">first 2</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-3">
                  <template #title>first 3</template>
                  <el-menu-item @click="goHome" index="1-3-1">second 3-1</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-menu-item index="2">
                <el-icon><icon-menu/></el-icon>
                <span>Navigator Two</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class="clock">
            {{ currentTime }}
          </div>
          <el-avatar class="avatartopright"> user </el-avatar>
          <!-- <div>
            <el-text class="mx-1" >{{user.username}}</el-text>
          </div> -->
          <!-- <el-text class="mx-1" style="position: fixed;top: 15px;right: 50px;width: 40px;height: 40px;" >
            {{user.username}}
          </el-text>
          <el-icon :size="20" style="position: fixed;top: 15px;right: 10px;">
            <ArrowDown />
          </el-icon> -->


          <!-- <el-dropdown split-button type="primary">
            {{user.username}}
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->

          <el-dropdown split-button type="primary" style="position: fixed;top: 10px;right: 10px;">
            <span>
              {{user.username?user.username:'username!'}}
              
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import router from "../router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from "vuex";
const store = useStore();
const user = sessionStorage.getItem('user');
console.log(user)


const currentTime = ref('');

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
};

const timer = setInterval(updateTime, 1000);

onMounted(() => {
  updateTime();
});

onUnmounted(() => {
  clearInterval(timer);
});

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const goHome = () => {
  router.push('/');
};
</script>
<style scoped>
.menuclass {
  width: 200px;
}
.clock {
  font-size: 24px;
  font-family: 'Arial', sans-serif;
}
.avatartopright {
  position: fixed; /* 设置元素为绝对定位 */
  top: 5px; /* 元素距离容器顶部的距离 */
  right: 115px; /* 元素距离容器右侧的距离 */
  width: 40px; /* 元素的宽度 */
  height: 40px; /* 元素的高度 */
  background-color: coral; /* 元素的背景颜色 */
}
.texttopright {
  position: fixed; /* 设置元素为绝对定位 */
  top: 15px; /* 元素距离容器顶部的距离 */
  right: 30px; /* 元素距离容器右侧的距离 */
  font-size: 16px; /* 元素的字体大小 */
}
.icontopright {
  position: fixed; /* 设置元素为绝对定位 */
  top: 15px; /* 元素距离容器顶部的距离 */
  right: 0px; /* 元素距离容器右侧的距离 */
  font-size: 20px; /* 元素的字体大小 */
}

</style>
