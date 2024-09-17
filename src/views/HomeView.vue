<template>
  <div class="bg-image">
    <div class="home">
      <h1>这是你的主页</h1>
      <button @click="goTologin">登录</button>
      <button @click="goToRegister">还没有账号？去注册</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "../router";
const goTologin = () => {
  router.push('/login');
};
const goToRegister = () => {
  router.push('/register');
};
</script>
<style scoped>
.bg-image {
  background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url('../image/catandgirl.png');
  background-size: cover;
  background-position: center;
  height: 100vh; 
}
.home {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
