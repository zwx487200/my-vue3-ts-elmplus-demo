<template>
  username:<el-input v-model="user.username" style="width: 240px"/><br/>
  email:<el-input v-model="user.email" style="width: 240px"/><br/>
  phone:<el-input v-model="user.phone" style="width: 240px"/><br/>
  <el-button type="primary" @click="submitForm">Submit</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import router from "../router";
import {UpdateUserAPI} from "../request/api";
import { useStore } from "vuex";
const localuser = JSON.parse(localStorage.getItem("user"));
const user = ref(localuser);
const submitForm = () =>{
  UpdateUserAPI(user.value).then((res: any)=>{
    if(res.code == '0'){
      localStorage.setItem('user', JSON.stringify(res.data));
      alert("Update success");
      router.push('/about');
    }else{
      alert("Update failed");
    }
  });
}
</script>

