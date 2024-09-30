<template>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 600px"
    @submit.native.prevent
  >
    <el-form-item label="头像" :label-position="itemLabelPosition">
      <HeadFileUpload limit=countModel v-model=fileList></HeadFileUpload>
    </el-form-item>
    <el-form-item label="序号" :label-position="itemLabelPosition" v-show="!isadd">
      <el-input v-model="character.characterId" />
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
import {GetCharacterAPI,AddCharacterAPI ,UpdateCharacterAPI} from "../request/api";
import { useRoute } from 'vue-router';
import type { UploadProps, UploadUserFile } from 'element-plus'

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

const isadd = ref(false);
const countModel = ref(5);
const fileList = ref<UploadUserFile[]>([
  {
    name: '默认头像',
    url: require('../image/默认头像.jpeg'),
  }
]);

const type = ref("query")

onMounted(() => {
  // 查询详情
  const route = useRoute();
  type.value = route.params.operate;
  if (type.value != 'add') {
    character.value.characterId = String(route.params.id);
    GetCharacterAPI(character.value).then(response => {
      character.value = response.data[0];
      // 如果用户没有头像，给用户赋值默认头像
      if (!character.value.profilePicture) {
        character.value.profilePicture = '../image/默认头像.jpeg';
      } else {
        // 如果存在头像，删除默认头像，添加用户头像
        fileList.value = [{
          name: '用户头像',
          url: require("../image/e5656579-2e08-4f26-ba03-69c49a75539b.jpg"),
        }];
      }
      //fileList.push(url: character.value.profilePicture);
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
  if (isadd.value){
    // 新增
    // TODO: 新增方法
    AddCharacterAPI(character.value).then(response => {
      character.value = response.data[0];
    }).catch(error => {
      console.error("Error fetching character: ", error);
    });
  } else{
    UpdateCharacterAPI(character.value).then(response => {
      character.value = response.data[0];
    }).catch(error => {
      console.error("Error fetching character: ", error);
    });
  }
}
</script>
