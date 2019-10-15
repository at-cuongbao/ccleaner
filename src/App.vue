<template>
  <div id="app">
    <Header />
    <ToDoList />
  </div>
</template>

<script>
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    ToDoList,
    Header
  }
};
</script>
<style lang="scss">
@import "./assets/styles/styles.scss";
</style>
