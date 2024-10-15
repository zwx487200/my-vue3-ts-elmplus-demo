<template>
  <div ref="lineChartContainer" style="width: 400px; height: 300px;"></div>
</template>
 
<script lang="ts" setup>
import {onMounted, ref } from 'vue';
import * as echarts from 'echarts';
const lineChartContainer = ref<HTMLElement | null>(null);

const option = {
  // 用于鼠标悬浮展示
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
onMounted(() => {
  if (lineChartContainer.value) {
    const chart = echarts.init(lineChartContainer.value);
    chart.setOption(option);
  }
});
</script>
 
<style scoped>
/* 你的样式 */
</style>