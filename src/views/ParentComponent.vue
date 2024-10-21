<template>
  <div>
    <!-- <ChildComponent v-model="countModel" /> -->
    <!-- 加了.once后自会触发一次-->
    <!-- <ChildComponent @some-event.once="callback"  v-model="countModel"/> -->

    <HeadFileUpload :limit=1 v-model="fileList" ></HeadFileUpload>
    <ChildComponent @some-event="callback"  v-model="countModel"/>

    <p>父组件的值：{{ countModel }}</p>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref ,onMounted,onBeforeMount} from 'vue'
import type { FormItemProps, FormProps, UploadUserFile } from 'element-plus'


const countModel = ref(1);

const fileList = ref<UploadUserFile[]>([
  {
    name:"默认头像",
    url: require('.././image/默认头像.jpeg'),
  }
]);

function callback(n) {
  console.log("是父亲改的")
  countModel.value += n as number
}

onMounted(() => {
  console.log(countModel.value);
});

</script>
