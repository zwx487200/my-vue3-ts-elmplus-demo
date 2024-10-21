<script setup>
const model = defineModel()


const emit = defineEmits(['someEvent'])

// 可以定义一些校验
// const emit = defineEmits({
//   click: null,
//   someEvent: ({ email, password }) => {
//     if (email && password) {
//       return true
//     } else {
//       console.warn('Invalid submit event payload!')
//       return false
//     }
//   }
// })


// defineModel()定义的值，可以直接通过子组件调用的方法更改
function update() {
  console.log("是儿子干的")
  model.value++
}

function buttonClick(){
  emit('someEvent',1)
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">子组件自己+1</button>
  <button @click="buttonClick">传给父亲+1</button>

  <!-- 也可以通过定义 emit方法传递给父组件-->
  <button @click="$emit('someEvent',3)">传给父亲+3</button>
</template>