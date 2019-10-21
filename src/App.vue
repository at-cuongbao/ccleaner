<template>
  <div id="app">
    <Header />
    <ToDoList />
  </div>
</template>

<script>
  import ToDoList from "./components/features/ToDoList";
  import Header from "./components/layouts/Header";
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
