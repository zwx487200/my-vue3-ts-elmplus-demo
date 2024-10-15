<template>
  <el-upload 
    action="http://localhost:8080/file/upload"
    :list-type="listType"
    :limit='limit'
    :disabled="disabled"
    :data="paramData"
    v-model:file-list="fileList"
    :on-exceed="handleExceed"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
>
    <el-icon><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" style="max-width:100%; max-height:100%;" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref , onMounted} from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus';
const props = defineProps({
  // 允许上传文件件的最大数量
  limit:{
    type:Number,
    default:5
  },
  // 是否禁用上传
  disabled:{
    type:Boolean,
    default:false
  },
  // 文件列表类型
  listType:{
    type:String,
    default:'picture-card'
  },
  // 上传时携带的额外参数
  paramData: {
    type:String
  }
});
const fileList = ref<UploadUserFile[]>([
  {
    name:'默认头像',
    url: require('.././image/默认头像.jpeg'),
  }
]);
// 父节点传来的fileList
const fileListFather = defineModel({type:Array});

// 如果父节点传的是空，fileList不变，如果父节点传值，将fileList变更为fileListFather的值
onMounted(() => {
  if (fileListFather.value) {
    fileList.value = fileListFather.value;
  }
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter(f => f.uid!== file.uid);
}
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
// 文件上传数量限制 ok
const handleExceed = (files:UploadFile) => {
  if (props.limit) {
    ElMessage.error(`只能上传${props.limit}张头像，如需更换请先删除当前头像`);
  }
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // 上传头像成功后，将response里面返回的值添加到fileList里面
  // todo 这边使用后端返回的url，会获取不到，前端上传文件的时候会生成一个blob:http://localhost:8081/***** 
  // 这边不懂，但是又不能把前端这个blob的给后端
  // 将这个值返回给父组件，再调用父组件接口保存
  fileListFather.value.length= 0;
  fileListFather.value.push({
    name: response.name,
    url: response.url,
  })


  // 移除默认头像
  const defaultAvatar = fileList.value.find(f => f.name === '默认头像')
  if (defaultAvatar) {
    fileList.value = fileList.value.filter(f => f.name!== '默认头像')
  }
  //
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' ) {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>


