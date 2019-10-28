<template>
  <div id="app">
    <ToDoList />
  </div>
</template>

<script>
  import ToDoList from "./components/features/ToDoList";
  import Header from "./components/layouts/Header";
  import Footer from "./components/layouts/Footer";
import { log } from 'util';
  export default {
    name: "App",
    components: {
      ToDoList
    }
  };
</script>

<style lang="scss">
  @import "./assets/styles/styles.scss";
</style>
