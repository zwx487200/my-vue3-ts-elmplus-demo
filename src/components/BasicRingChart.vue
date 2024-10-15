<template>
  <div ref="ringChartContainer" style="width: 400px; height: 300px;"></div>
</template>
 
<script lang="ts" setup>
import {onMounted, ref } from 'vue';
import * as echarts from 'echarts';
const ringChartContainer = ref<HTMLElement | null>(null);

const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      // name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};
onMounted(() => {
  if (ringChartContainer.value) {
    const chart = echarts.init(ringChartContainer.value);
    chart.setOption(option);
  }
});
</script>
 
<style scoped>
/* 你的样式 */
</style>