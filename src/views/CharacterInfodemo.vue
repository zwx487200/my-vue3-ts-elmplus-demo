<template>
    <HeadFileUpload :limit=1 v-model="fileList" ></HeadFileUpload>
    <el-input  disabled v-model="character.characterId" />
    <el-input v-model="character.name"  placeholder="请输入"  clearable maxlength="60" show-word-limit/>
    <el-input v-model="character.introduction" placeholder="请输入" clearable maxlength="600" show-word-limit/>
    <el-button @click="sure">确定 </el-button>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted} from 'vue'
import { ElMessage} from 'element-plus'
import type { FormItemProps, FormProps, UploadUserFile } from 'element-plus'
import {GetCharacterAPI,AddCharacterAPI } from "../request/api";
import { useRoute } from 'vue-router';
import router from "../router";


const character = ref({
  characterId: "",
  name: "",
  nameEn: "",
  role: "",
  introduction: "",
  profilePicture: "",
  userId: "",
  pageSize: 10,
  pageNum: 1,
}) 

const fileList = ref<UploadUserFile[]>([
  {
    name:"默认头像",
    url: require('.././image/默认头像.jpeg'),
  }
]);

const isadd = ref<Boolean>(false);
const isupadte = ref<Boolean>(false);;
const type = ref<string>("query");
const limit = ref<number>(1);

onMounted(() => {
  // 查询详情
  console.log("我被触发了")
  const route = useRoute();
  type.value = 'update';
  if (type.value != 'add') {
    character.value.characterId = 'dd324a45-8de7-11ef-b781-0433c2ef0c6c';
    GetCharacterAPI(character.value).then(response => {
      character.value = response.data[0];
      if(character.value.profilePicture!="" || character.value.profilePicture !=null){
        fileList.value.length = 0;
        fileList.value.push({
          name: character.value.profilePicture,
          url: require(`.././image/9ea51bdf-d5bc-490c-a999-90e312ac731d.jpg`),
        })
      }
    }).catch(error => {
      console.error("Error fetching character: ", error);
    });
  } else{
     isadd.value= true;
  }
})

const sure = () => {
  if (isadd.value || type.value=="update"){
    //debugger;
    //character.value.profilePicture = fileList.value[0].url  || fileList.value[0].response.url;
    AddCharacterAPI(character.value).then(response => {
      character.value = response.data;
      if(0==response.code){
        router.push('/YinCaoDiFu');
      }
    }).catch(error => {
      console.error("Error fetching character: ", error);
    });
  } else{
    ElMessage({
    message: '修改页面,您的改动不会被保存',
    type: 'warning',
    })
    router.push('/YinCaoDiFu');
  }
}
</script>