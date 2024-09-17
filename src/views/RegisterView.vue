<template>
  <div class = "loginclass">
    <h2 class="">注册</h2>
    <form @submit.prevent>
      <div class="form-group">
        用户名:  <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        密码:  <el-input
          v-model="password"
          style="width: 200px"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </div>
      <div class="form-group2" >
        验证码:<input type="captcha" id="captcha" v-model="captcha" required>
        <button :disabled="countdown > 0" @click = "handleGetCaptcha">
          {{ countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码' }}
        </button>
      </div>
      <button  @click = "handleSubmit">注册</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import router from "../router";
import {RegistAPI,LogInAPI,GetGenerateAPI} from "../request/api";
import { useStore } from "vuex";

const store = useStore();
// 响应式变量，控制按钮是否可点击
const isDisabled = ref(false);
const countdown = ref(0);
const captcha=ref("000000");
const username=ref("");
const password=ref("");

// 获取验证码的函数
function handleGetCaptcha() {
  if (!isDisabled.value) {
    GetGenerateAPI(username.value).then((res: any)=>{
          console.log(res);
          console.log(res.code);
          if ('0'==res.code) {
              captcha.value = res.data;
          // 设置按钮为不可点击
              isDisabled.value = true;
              // 设置倒计时，这里以60秒为例
              let timer = setInterval(() => {
                if (countdown.value <= 0) {
                  clearInterval(timer);
                  isDisabled.value = false;
                  countdown.value = 0;
                } else {
                  countdown.value--;
                }
              }, 1000);
              // 初始倒计时设置为60秒
              countdown.value = 10;
          } else {
            console.log(res.data.message);
          }
        })
  }
}
function handleSubmit() {
  const user = ref({
  captcha: captcha.value,
  username: username.value,
  password: password.value
  });
  RegistAPI(user.value).then((res: any)=>{
    console.log(res.code);
    if ('0'==res.code) {
      router.push('/login')
    } else {
      console.log(res.message);
    }
  })  
}
</script>

<style scoped>
.loginclass {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group2 {
  margin-bottom: 15px;
}

.form-group2 label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 200px; 
  padding: 8px;
  box-sizing: border-box;
}
.form-group2 input {
  width: 115px;  
  padding: 8px;
  box-sizing: border-box;
}
</style>
