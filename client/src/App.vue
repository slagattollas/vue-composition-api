<template lang="pug">
  #app.todo-app
    todoList
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',
  setup() {
    // utilise todo-bitpanda-server to get data
    return {
      message: 'Todo list should be here',
    };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
.todo-app {
  background: #E5E5E5;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
