<template>
  <div class="common-layout">
    <el-container>
      <el-header>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
          >
            <el-menu-item index="0">
              <img
                style="width: 100px"
                src="../image/element-plus-logo.svg"
                alt="Element logo"
              />
            </el-menu-item>
            <el-menu-item index="1">游客</el-menu-item>
          </el-menu>
        </el-header>
      <el-container>
        <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu default-active="2" class="el-menu-vertical-demo, menuclass" :router="true" >
              <el-menu-item index="1">
                <template #title>
                  <span>阴曹地府</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2">
                <span>城隍庙</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span>奈何桥</span>
              </el-menu-item>
              <el-menu-item index="4">
                <span>阎王殿</span>
              </el-menu-item>
              <el-menu-item index="5">
                <span>十大地狱</span>
              </el-menu-item>
              <el-menu-item index="6">
                <span>枉死城</span>
              </el-menu-item>
              <el-menu-item index="7">
                <span>黄泉路</span>
              </el-menu-item>
              <el-menu-item index="8">
                <span>轮回</span>
              </el-menu-item>
              <el-menu-item index="9">
                <span>破钱山</span>
              </el-menu-item>
              <el-menu-item index="10">
                <span>望乡台</span>
              </el-menu-item>
              <el-sub-menu index="11">
                <template #title>人物介绍</template>
                <el-sub-menu index="11-1">
                  <template #title>创始人</template>
                  <el-menu-item index="11-1-1">后土娘娘</el-menu-item>
                  <el-menu-item index="11-1-2">东岳大帝</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="11-2">
                  <template #title>董事长</template>
                  <el-menu-item index="11-2-1">东岳大帝</el-menu-item>
                  <el-menu-item index="11-2-2">酆都大帝</el-menu-item>
                  <el-menu-item index="11-2-3">地藏王菩萨</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="11-3">
                  <template #title>总监</template>
                  <el-menu-item index="11-3-1">东方鬼帝</el-menu-item>
                  <el-menu-item index="11-3-2">西方鬼帝</el-menu-item>
                  <el-menu-item index="11-3-3">北方鬼帝</el-menu-item>
                  <el-menu-item index="11-3-4">西方鬼帝</el-menu-item>
                  <el-menu-item index="11-3-5">中央鬼帝</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="11-4">
                  <template #title>总管</template>  
                  <el-menu-item index="11-4-1">秦广王</el-menu-item>
                  <el-menu-item index="11-4-2">楚江王</el-menu-item>
                  <el-menu-item index="11-4-3">宋帝王</el-menu-item>
                  <el-menu-item index="11-4-4">五官王</el-menu-item>
                  <el-menu-item index="11-4-5">阎罗王</el-menu-item>
                  <el-menu-item index="11-4-6">平等王</el-menu-item>
                  <el-menu-item index="11-4-7">泰山王</el-menu-item>
                  <el-menu-item index="11-4-8">都市王</el-menu-item>
                  <el-menu-item index="11-4-9">卞城王</el-menu-item>
                  <el-menu-item index="11-4-10">转轮王</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="11-5">
                  <template #title>三司</template>
                  <el-sub-menu index="11-5-1">
                    <template #title>轮回司</template>
                    <el-menu-item index="11-5-1-1">孟婆</el-menu-item>
                  </el-sub-menu>
                  <el-sub-menu index="11-5-2">
                    <template #title>阴曹司</template>
                    <el-menu-item index="11-5-2-1">城隍</el-menu-item>
                  </el-sub-menu>
                  <el-sub-menu index="11-5-3">
                    <template #title>判官司</template>
                    <el-menu-item index="11-5-3-1">赏善司魏征</el-menu-item>
                    <el-menu-item index="11-5-3-2">惩恶司钟馗</el-menu-item>
                    <el-menu-item index="11-5-3-3">查察司陆之道</el-menu-item>
                    <el-menu-item index="11-5-3-4">阴律司崔珏</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="11-6">
                  <template #title>十大鬼差</template>  
                  <el-menu-item index="11-6-1">鬼王</el-menu-item>
                  <el-menu-item index="11-6-2">日游神</el-menu-item>
                  <el-menu-item index="11-6-3">夜游神</el-menu-item>
                  <el-menu-item index="11-6-4">黑无常</el-menu-item>
                  <el-menu-item index="11-6-5">白无常</el-menu-item>
                  <el-menu-item index="11-6-6">牛头</el-menu-item>
                  <el-menu-item index="11-6-7">马面</el-menu-item>
                  <el-menu-item index="11-6-8">豹尾</el-menu-item>
                  <el-menu-item index="11-6-9">鸟嘴</el-menu-item>
                  <el-menu-item index="11-6-10">鱼鳃</el-menu-item>
                  <el-menu-item index="11-6-11">黄蜂</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
       </el-aside>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
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

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

</style>