<template>
  <div>
    <ChildComponent v-model="countModel" />
    <p>父组件的值：{{ countModel }}</p>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref ,onMounted,onBeforeMount} from 'vue'

const countModel = ref(1);

onMounted(() => {
  console.log(countModel.value);
});

</script>
