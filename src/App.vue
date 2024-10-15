<template>
  <nav>
  </nav>
  <router-view />
</template>

<script lang="ts" setup>
  import {defineComponent, onMounted, onUnmounted, ref } from 'vue';
  import router from "./router";
  import {RegistAPI,LogInAPI,GetGenerateAPI,LogOutAPI} from "./request/api";
  import { useStore, mapState } from "vuex";
  import { debounce } from "lodash";
  const _ = (window as any).ResizeObserver;
    (window as any).ResizeObserver = class ResizeObserver extends _ {
      constructor(callback: (...args: any[]) => void) {
        callback = debounce(callback, 100);
        super(callback);
      }
    };

  
  const store = useStore();
  

  const timer = ref<ReturnType<typeof setTimeout>>();
    const userActivity = () => {
      clearTimeout(timer.value);
      timer.value = setTimeout(logOutAndClearToken, 30 * 60 * 1000); // 30分钟无操作后清除token
    };
 
    onMounted(() => {
      // 监听用户活动
      window.addEventListener('mousemove', userActivity);
      window.addEventListener('keydown', userActivity);
      window.addEventListener('click', userActivity);
      userActivity(); // 初始化计时器
    });
 
    onUnmounted(() => {
      // 清理事件监听和计时器
      window.removeEventListener('mousemove', userActivity);
      window.removeEventListener('keydown', userActivity);
      window.removeEventListener('click', userActivity);
      clearTimeout(timer.value);
    });

    function logOutAndClearToken()  {
      const user = store.state.user;
      const isLoginStatus = store.state.isLoginStatus;
      if (!isLoginStatus) {
        return;
      } else {
        LogOutAPI(user).then(() => {
          // 登出并清除token
          store.commit('clearToken', {
              isLoginStatus: false,
              token: '',
              username: '',
              userId: ''
          });
          router.push({ path: '/login' });
      }).catch(() => {
          router.push({ path: '/login' });
      });
    }
    };
    
</script>

