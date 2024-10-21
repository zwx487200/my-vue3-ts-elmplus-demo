<template>
  <el-upload 
    ref="upload"
    action="http://localhost:8080/file/upload"
    :file-list="fileList"
    :list-type="listType"
    :limit='limit'
    :disabled="disabled"
    :data="paramData"
    :before-upload="beforeAvatarUpload"
    :on-exceed="handleExceed"
    :on-success="handleAvatarSuccess">
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
import { ref, onMounted } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { genFileId, ElMessage} from 'element-plus'
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile,UploadUserFile,UploadFiles } from 'element-plus'



const props = defineProps({
  // 允许上传文件件的最大数量
  limit:{
    type:Number,
    default:3
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

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const upload = ref<UploadInstance>()

// fileList的意义不大，单纯为了使有初始头像展示，
const fileList = ref<UploadUserFile[]>([
  {
    name:"默认头像",
    url: require('.././image/默认头像.jpeg'),
  }
]);

// 定义一个父节点传来的值，如果这个值不为空，将fileList里面的值替换为父节点传来的值
const fatherFileList = defineModel({type:Array})

onMounted(() => {
  if (fatherFileList.value) {
    fileList.value = fatherFileList.value;
  }
})

const handleRemove = (file: UploadFile) => {
  debugger;
  console.log(fileList)
  fileList.value = fileList.value.filter(f => f.uid!== file.uid);
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

// 图片上传前的校验
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' ) {
    ElMessage.error('文件格式需为JPEG/PNG!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error('图片多大,不应该超过1M!')
    return false
  }
  return true
}

// 超过limit的时候会触发的方法
const handleExceed: UploadProps['onExceed'] = (files) => {
  console.log(files)
  //upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file);
  upload.value!.submit();
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(response)
  console.log(uploadFile)
  console.log(uploadFiles)
  // 当有图片上传成功后会删除默认头像
  const defaultAvatar = fileList.value.find(f => f.name === '默认头像')
  if (defaultAvatar) {
    fileList.value = fileList.value.filter(f => f.name!== '默认头像')
  }
  // 需要将uploadFile的值赋值到fileList里面
  fileList.value.push(uploadFile as UploadUserFile);
  if (fileList.value.length > props.limit) {
    uploadFiles.shift();
    fileList.value.shift();
    console.log(fileList.value)
    }
}
</script> 


