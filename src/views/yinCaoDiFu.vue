<template>
  序号:
  <el-input
    v-model="character.characterId"
    style="width: 240px"
    placeholder="Please input"
    clearable
  />
  名字:
  <el-input
    class="input-group"
    v-model="character.name"
    style="width: 240px"
    placeholder="Please input"
    clearable
  />
  角色:
  <el-input
    v-model="character.role"
    style="width: 240px"
    placeholder="Please input"
    clearable
  />
  <el-button type="primary" :icon="Search" @click = "GetCharacter">Search</el-button>

  <el-table :data="characterList" style="width: 100%" height="450">
    <el-table-column fixed  prop="characterId" label="序号" width="180" />
    <el-table-column prop="name" label="人物" width="180" />
    <el-table-column prop="introduction" label="简介" />
  </el-table>

  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>


<script lang="ts" setup>
import {GetCharacterAPI } from "../request/api";
import { ref , onMounted} from 'vue';
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import type { ComponentSize } from 'element-plus'
const currentPage = ref(4)
const pageSize = ref(5)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const character = ref({
  characterId: "",
  name: "",
  nameEn: "",
  role: "",
  introduction: "",
  profilePicture: "",
  userId: ""
})

const characterList = ref([]);


onMounted(() => {
  console.log("表哥，我来咯");
  GetCharacter();
})

function GetCharacter() {
  GetCharacterAPI(character.value).then(response => {
    characterList.value = response.data;
    console.log("response.data: ", response.data);
    console.log("characterList: ", characterList.value);
  }).catch(error => {
    console.error("Error fetching character: ", error);
  });
}

</script>

<style scoped>
.input-group {}

.input-group input {
  margin-bottom: 10px;
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

</style>