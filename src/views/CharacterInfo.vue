<template>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 600px"
    @submit.native.prevent
  >
    <el-form-item label="头像" :label-position="itemLabelPosition">
      <HeadFileUpload limit="1" v-model="fileList" ></HeadFileUpload>
    </el-form-item>
    <el-form-item label="序号" :label-position="itemLabelPosition" v-show="!isadd" >
      <el-input disabled='type.value=="update"' v-model="character.characterId" />
    </el-form-item>
    <el-form-item label="名字" :label-position="itemLabelPosition">
      <el-input v-model="character.name" />
    </el-form-item>
    <el-form-item label="描述" :label-position="itemLabelPosition">
      <el-input v-model="character.introduction" />
    </el-form-item>
     <el-button @click="sure">确定 </el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref ,onMounted} from 'vue'
import type { FormItemProps, FormProps } from 'element-plus'
import {GetCharacterAPI,AddCharacterAPI } from "../request/api";
import { useRoute } from 'vue-router';
import type {UploadUserFile } from 'element-plus';
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

const isadd = ref(false);
const type = ref("query")

onMounted(() => {
  // 查询详情
  const route = useRoute();
  type.value = route.params.operate;
  if (type.value != 'add') {
    character.value.characterId = String(route.params.id);
    GetCharacterAPI(character.value).then(response => {
      character.value = response.data[0];
      if(character.value.profilePicture!="" || character.value.profilePicture !=null){
        fileList.value.length = 0;
        fileList.value.push({
          name: character.value.profilePicture,
          url: require('.././image/'+`${character.value.profilePicture}`),
        })
      }
    }).catch(error => {
      console.error("Error fetching character: ", error);
    });
  } else{
     isadd.value= true;
  }
})

const labelPosition = ref<FormProps['labelPosition']>('right')
const itemLabelPosition = ref<FormItemProps['labelPosition']>('')
const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})

const sure = () => {
  if (isadd.value || type.value=="update"){
    // 新增
    // TODO: 新增方法
    character.value.profilePicture = fileList.value[0].url;
    AddCharacterAPI(character.value).then(response => {
      character.value = response.data;
      if(0==response.code){
        router.push('/YinCaoDiFu');
      }
    }).catch(error => {
      console.error("Error fetching character: ", error);
    });
  } 
}
</script>
