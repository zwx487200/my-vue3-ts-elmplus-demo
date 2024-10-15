<template>
  <div ref="pieChartContainer" style="width: 400px; height: 300px;"></div>
</template>
 
<script lang="ts" setup>
import {onMounted, ref } from 'vue';
import * as echarts from 'echarts';
const pieChartContainer = ref<HTMLElement | null>(null);

const option = {
  title: {

  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    // orient: 'vertical',
    // left: 'buttom'
  },
  series: [
    {
      // name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
onMounted(() => {
  if (pieChartContainer.value) {
    const chart = echarts.init(pieChartContainer.value);
    chart.setOption(option);
  }
});
</script>
 
<style scoped>
/* 你的样式 */
</style>