<template>
  <div ref="barChartContainer" style="width: 400px; height: 300px;"></div>
</template>
 
<script lang="ts" setup>
import {onMounted, ref } from 'vue';
import * as echarts from 'echarts';
const barChartContainer = ref<HTMLElement | null>(null);

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      // name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
};
onMounted(() => {
  if (barChartContainer.value) {
    const chart = echarts.init(barChartContainer.value);
    chart.setOption(option);
  }
});
</script>
 
<style scoped>
/* 你的样式 */
</style>