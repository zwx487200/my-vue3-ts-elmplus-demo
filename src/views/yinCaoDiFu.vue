<template>
  序号:
  <el-input
    v-model="character.characterId"
    style="width: 200px"
    placeholder="Please input"
    clearable
  />
  名字:
  <el-input
    class="input-group"
    v-model="character.name"
    style="width: 200px"
    placeholder="Please input"
    clearable
  />
  角色:
  <el-input
    v-model="character.role"
    style="width: 200px"
    placeholder="Please input"
    clearable
  />
  <el-button type="primary" :icon="Search" @click = "GetCharacter">查询</el-button>
  <el-button type="primary"  @click = "clearSelect">重置</el-button>
  <el-button type="primary"  @click = "addCharacter">新增</el-button>
  

  <el-table :data="characterList" style="width: 100%" height="450">
    <el-table-column fixed  prop="characterId" label="序号" width="180" />
    <el-table-column prop="name" label="人物" width="180" />
    <el-table-column prop="introduction" label="简介" />
    <el-table-column fixed="right" prop="characterId"  label="操作" min-width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="gotoCharacterInfo(scope.row) ">详情</el-button>
        <el-button link type="primary" size="small">修改</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="character.pageNum"
      v-model:page-size="character.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="characterSie"
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
import router from "../router";


const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const characterSie = ref(0)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  GetCharacter();
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  GetCharacter();
}

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

const characterList = ref([]);


onMounted(() => {
  console.log("表哥，我来咯");
  GetCharacter();
})

function GetCharacter() {
  GetCharacterAPI(character.value).then(response => {
    characterList.value = response.data;
    characterSie.value = response.count;
    console.log("response.data: ", response.data);
    console.log("characterList: ", characterList.value);
  }).catch(error => {
    console.error("Error fetching character: ", error);
  });
}

function clearSelect(){
  character.value = {
    characterId: "",
    name: "",
    nameEn: "",
    role: "",
    introduction: "",
    profilePicture: "",
    userId: "",
    pageSize: 10,
    pageNum: 1,
  }
  GetCharacter();
}

function addCharacter(){
  console.log("我要添加人物");
  // 跳转到添加人物的页面
}

const gotoCharacterInfo = (row:any) => { 
  console.log("我要跳转到人物详情页"+row.characterId);
  router.push({ path: "/characterInfo", query: { id: row.characterId } });
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