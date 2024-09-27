<template>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 600px"
  >
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
import {GetCharacterAPI,AddCharacterAPI } from "../request/api";
import { useRoute } from 'vue-router';


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

const type = ref("query")

onMounted(() => {
  // 查询详情
  const route = useRoute();
  console.log("我是" + route.params);

  type.value = route.params.operate;
  console.log("我是" + route.params);
  if (type.value != 'add') {
    console.log("我是云南的云南庐江的" + route.params.id);
    character.value.characterId = String(route.params.id);
    GetCharacterAPI(character.value).then(response => {
      console.log("response.data: ", response.data);
      character.value = response.data[0];
      console.log("response.data: ", response.data);
    }).catch(error => {
      console.error("Error fetching character: ", error);
    });
  } else{
     console.log("我是添加的添加的");
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
  console.log(character.value);
  if (isadd.value){
    // 新增
    // TODO: 新增方法
    AddCharacterAPI(character.value).then(response => {
      console.log("response.data: ", response.data);
      character.value = response.data[0];
      console.log("response.data: ", response.data);
    }).catch(error => {
      console.error("Error fetching character: ", error);
    });
  }
}
</script>
