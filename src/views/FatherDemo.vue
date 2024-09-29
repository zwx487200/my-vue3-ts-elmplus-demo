<template>
    <ChildDemo v-model="countModel"></ChildDemo>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const countModel = ref(5);
</script>