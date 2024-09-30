<template>
  <div class = "loginclass">
    <h2 class="">登入</h2>
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
      <button  @click = "signIn">登入</button>
      <button  @click = "updatePassword">忘记密码</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import router from "../router";
import {LogInAPI,ResetPasswordAPI} from "../request/api";
import { useStore } from "vuex";

const store = useStore();
const username=ref("");
const password=ref("");

function signIn() {
  const user = ref({
        username: username.value,
        password: password.value
      });
  LogInAPI(user.value).then((res: any)=>{
      if ('0'==res.code) {
        store.commit("updateLoginStatusAndToken" ,{
          isLoginStatus: true,
          user: res.data  
        });
        localStorage.setItem('user', JSON.stringify(res.data));
        router.push('/about');
      } else {
        alert(res.message);
      }
    })
}

function updatePassword() {
  alert("忘记密码功能还未实现");
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
.form-group input {
  width: 200px; 
  padding: 8px;
  box-sizing: border-box;
}
</style>
