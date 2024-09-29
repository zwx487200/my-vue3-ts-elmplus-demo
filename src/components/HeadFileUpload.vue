<template>
  <div>
    <el-upload
      action="http://localhost:8080/file/upload"
      :headers="headers"
      :list-type="listType"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-progress="uploadProgress"
      :file-list="fileListCopy.data"
      ref="upload"
      :multiple="true"
      :limit='limit'
      :disabled="disabled"
      :data="paramData"
    >
    <el-icon><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img :src="file.url" alt="" class="el-upload-list__item-thumbnail" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
    </el-upload>
    <el-dialog v-model="previewVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image"  style="max-width: 100%; max-height: 100%; width: auto; height: auto;"/>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'uploadImg'
}
</script>
<script setup>
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue';
import { reactive, ref, defineProps, defineEmits, computed, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';



const props = defineProps({
  // 允许上传文件件的最大数量
  limit:{
    type:Number,
    default:1
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

const emits = defineEmits([]);
const cns = getCurrentInstance();
const globObj = cns.appContext.config.globalProperties;
const previewVisible = ref(false);
const dialogImageUrl = ref('');
const fileListCopy = reactive({
  data: []
});
const onece = ref(false);
const myChangeFile = ref('');
const changeFileIndex = ref(-1);
const uploadImgArr = reactive({
  data: []
});
const headers = reactive({});
// 预览大图 有展示bug
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  previewVisible.value = true;
};
// 移除图片 有bug
const handleRemove = (file, fileList) => {
  console.log('handleRemove', handleRemove);
  console.log('file', file);
  console.log('fileList', fileList);
  console.log('fileListCopy', fileListCopy.data);
  fileListCopy.data = fileListCopy.data.filter(v => v.uid !== file.uid);
};
// 文件上传数量限制 ok
const handleExceed = (files, fileList) => {
  if (props.limit) {
    ElMessage.error(`只能上传${props.limit}张头像，如需更换请先删除当前头像`);
  }
  console.log('handleExceed', handleExceed);
  console.log('files', files);
  console.log('fileList', fileList);
};
// 上传请求
// const uploadAction = (option) => {
//   let formData = new FormData();
//   const url = '';
//   globObj.$axios({
//     url: url,
//     method: 'post',
//     transformRequest: [function(data, headers) {
//       // 去除post请求默认的Content-Type
//       delete headers['Content-Type']
//       return data
//     }],
//     data: formData,
//     timeout: 300000
//   }).then(res => {
//     ElMessage.success('资产添加成功');
//   }).catch((err) => {
//     console.log(err);
//   });
// }
// 格式大小的限制 ok
const beforeUpload = (file) => {
  let isJPG = false,
  fileType = file.type.split('/')[0];
  if(file.type === "image/jpeg" || file.type === "image/png") {
    isJPG = true;
  } else {
    isJPG = false;
  }
  const isLt2M = file.size / 1024 / 1024;
  if (fileType != 'image' || isLt2M > 2) {
    ElMessage.error("请上传2M以内的图片文件!");
    return false
  }
  return true;
};
// 文件上传成功时的钩子
const uploadSuccess = (response, file, fileList) => {
  // 上传成功之后后台返回的数据
  console.log('uploadSuccess', response);
};
const uploadProgress = (e, file, fileList) => {
  console.log('uploadProgress', uploadProgress)
};
const uploadError = (err, file, fileList) => {
  console.log('uploadError', uploadError);
};
</script>


<!-- <template>
  <el-upload action="#" 
             list-type="picture-card" 
             :auto-upload="false"
             :before-upload="beforeUpload">
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="Preview Image" style="max-width: 100%; max-height: 100%; width: auto; height: auto;"/>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}
const beforeUpload = (file) => {
  let isJPG = false,ElMessage
  fileType = file.type.split('/')[0];
  if(file.type === "image/jpeg" || file.type === "image/png") {
    isJPG = true;
  } else {
    isJPG = false;
  }
  const isLt2M = file.size / 1024 / 1024;
  if (fileType != 'image' || isLt2M > 2) {
    .error("请上传2M以内的图片文件!");
    return false
  }
  return true;
};
</script> -->

