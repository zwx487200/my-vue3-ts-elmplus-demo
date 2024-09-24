<template>
  <!-- <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 600px"
  >
    <el-form-item label="Name" :label-position="itemLabelPosition">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="Activity zone" :label-position="itemLabelPosition">
      <el-input v-model="formLabelAlign.region" />
    </el-form-item>
    <el-form-item label="Activity form" :label-position="itemLabelPosition">
      <el-input v-model="formLabelAlign.type" />
    </el-form-item>
  </el-form> -->
</template>

<script lang="ts" setup>
import { reactive, ref ,onMounted} from 'vue'
import type { FormItemProps, FormProps } from 'element-plus'


onMounted(() => {
  console.log("我是云南的云南庐江的");
})

// const labelPosition = ref<FormProps['labelPosition']>('right')
// const itemLabelPosition = ref<FormItemProps['labelPosition']>('')
// const formLabelAlign = reactive({
//   name: '',
//   region: '',
//   type: '',
// })
</script>
